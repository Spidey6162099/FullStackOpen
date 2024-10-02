const bcrypt=require('bcrypt')
const User=require('../modules/user')
const {beforeEach,test,describe,after}=require('node:test')
const assert=require('node:assert')

const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const config=require('../utils/config')
const helper=require('./test_helper')


const api=supertest(app)

describe('when there is initially one user in database',()=>{

    beforeEach(async()=>{
        await User.deleteMany({})
        const passwordHash=await bcrypt.hash('secret',10)
        const user=new User({username:"root",passwordHash})
        await user.save()

    })
    test('creation with fresh username succesful',async ()=>{
        const usersInDb=await helper.usersInDb()
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
          }
        const result=await api.post('/api/users')
                            .send(newUser)
                            .expect(201)
                            .expect('Content-Type', /application\/json/)
        const usersAtEnd=await helper.usersInDb()
        assert.strictEqual(usersInDb.length+1,usersAtEnd.length)

        const usernames=usersAtEnd.map(user=>user.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation of a new user with old username fails with correct status code',async()=>{
        const usersBefore=await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Matti Luukkainen',
            password: 'salainen',
          }
        const result=await api.post('/api/users')
             .send(newUser)
             .expect(400)
             .expect('Content-Type', /application\/json/)
        const usersAfter=await helper.usersInDb()
        assert.strictEqual(usersBefore.length,usersAfter.length)
        assert(result.body.error.includes('expected `username` to be unique'))

    })

})
after(()=>{
    mongoose.connection.close()
})
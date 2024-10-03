const User=require('../models/user')
const testHelper=require('./test_helper')
const mongoose=require('mongoose')
const {after,beforeEach,test,describe}=require('node:test')
const assert=require('node:assert')
const supertest=require('supertest')
const app=require('../app')
const bcrypt=require('bcrypt')

const api=supertest(app)

describe('with one saved user',()=>{
    beforeEach(async()=>{
        await User.deleteMany({})
        const password=await bcrypt.hash('1234',10)
        const newUser=new User({
            username:"example",
            passwordHash:password
        })
        await newUser.save()

    })
    test('check that a valid user can be added succesfully',async()=>{
        const usersBefore=await testHelper.usersInDb()
        const newUser={
            username:'test',
            password:"1234"
        }
        const result=await api.post('/api/users')
                              .send(newUser)
                              .expect(201)
                              .expect('Content-Type', /application\/json/)
        const usersAfter=await testHelper.usersInDb()
        assert.strictEqual(usersAfter.length,usersBefore.length+1)
    })

    test('only unique usernames should be allowed',async ()=>{
        const newUser={
            username:"example",
            password:"1234"
        }
        const usersBefore=await testHelper.usersInDb()
        const result = await api.post('/api/users')
                                .send(newUser)
                                .expect(400)
                                
        const usersAfter=await testHelper.usersInDb()
        assert.strictEqual(usersAfter.length,usersBefore.length)
    })
})
after(async()=>{
    mongoose.connection.close()
})

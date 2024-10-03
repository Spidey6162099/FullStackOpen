const {test,after,beforeEach,describe} = require('node:test')
const mongoose=require('mongoose')
const assert=require('node:assert')
const supertest=require('supertest')
const app=require('../app')


const api=supertest(app)

const testHelper=require('./test_helper')
const Blog=require('../models/blog')
const config=require('../utils/config')
const { first } = require('lodash')
describe('with some initial blogs',()=>{



beforeEach(async()=>{

    await Blog.deleteMany({})
    // for(let blog of testHelper.blogs){
    //     let newBlog=new Blog(blog)
    //     await newBlog.save()
    // }
    await Blog.insertMany(testHelper.blogs)
})
describe('fetching and format tests',()=>{


test('fetches all records properly',async()=>{
 
    const result=await api.get('/api/blogs')
                    .expect(200)
                    .expect('Content-type',/application\/json/)
    const titles=result.body.map(m=>m.title)                
    
    assert.strictEqual(result.body.length,testHelper.blogs.length)
    assert(titles.includes('Go To Statement Considered Harmful'))
    
})

test('the _id is removed in favour of id',async()=>{
        const result=await api.get('/api/blogs')
        const actualBody=result.body[0]
        // console.log(actualBody)
        
        assert(actualBody.id)
        assert(!actualBody['_id'])
})

test('get with specific id functional',async ()=>{
    const blogs=await testHelper.blogsInDb()

    const firstBlog=blogs[0]
    const fetchedBlog=await api.get(`/api/blogs/${firstBlog.id}`)
    assert.deepStrictEqual(firstBlog,fetchedBlog.body)
})
})

describe('saving a blog',()=>{


test('valid object is saved succesfully',async ()=>{
    const newBlog={
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
    }
    let result=await api.post('/api/blogs')
                        .send(newBlog)
                        .expect(201)
                        .expect('Content-type',/application\/json/)
    

                        delete result.body.id
    const blogsInDb=await testHelper.blogsInDb()
    assert.strictEqual(testHelper.blogs.length+1,blogsInDb.length)
    assert.deepStrictEqual(result.body,newBlog)
})

test('missing likes sets likes to zero',async()=>{
    const newBlog={
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
}
    const result = await api.post('/api/blogs')
                            .send(newBlog)
                            .expect(201)
                            .expect('Content-type',/application\/json/)
    assert.strictEqual(result.body.likes,0)
})

test('missing url or title means cannot be done',async()=>{
    const newBlog={
        author: "Robert C. Martin",
}
    const result = await api.post('/api/blogs')
                            .send(newBlog)
                            .expect(400)
                            .expect('Content-type',/application\/json/)
    const blogsInDb=await testHelper.blogsInDb()
    assert.strictEqual(testHelper.blogs.length,blogsInDb.length)
})
})

describe('tests to validate delete operation',()=>{
    test('delete happens succesfully',async ()=>{
        // const blogObject=new Blog(
        //     {"title":"well",
        //         "author":"well",
        //         "url": "well",
        //         "likes": 90}
        // )

        // await blogObject.save()
        // const id=blogObject._id.toString();
        const blogsBefore=await testHelper.blogsInDb()
        const firstBlog=blogsBefore[0]
        

        await api.delete(`/api/blogs/${firstBlog.id}`)
                .expect(204)
        const blogsAfter=await testHelper.blogsInDb()
        assert.strictEqual(blogsBefore.length-1,blogsAfter.length)

    })
    test('with invalid id',async ()=>{
        const nonExistingId=await testHelper.nonExistingId()
        const blogsBefore=await testHelper.blogsInDb()
        await api.delete(`/api/blogs/${nonExistingId}`)
                .expect(404)
        const blogsAfter=await testHelper.blogsInDb()
        assert.strictEqual(blogsBefore.length,blogsAfter.length)
    })
})
describe('tests to validate',()=>{
    test('to verify a succesful update',async ()=>{
        const blogsInDb=await testHelper.blogsInDb()
        const firstBlog=blogsInDb[0];
        const id=firstBlog.id
        const updatedBlog={"title":"hell",
    "author":"well",
    "url": "well",
    "likes": 90}
        const result =await api.put(`/api/blogs/${id}`)
                                .send(updatedBlog)
                                .expect(200)
        delete result.body.id;
        assert.deepStrictEqual(result.body,updatedBlog)

    })

    test('updating an invaid id',async ()=>{
            const nonExistingId=await testHelper.nonExistingId()
            const newObj={
                "title":"well",
    "author":"well",
    "url": "well",
    "likes": 90
            }
            const result=await api.put(`/api/blogs/${nonExistingId}`)
                                    .send(newObj)
                                    .expect(404)
                    
    })
})
})


after(async ()=>{
    await mongoose.connection.close()
})
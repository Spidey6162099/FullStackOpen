const {test,after,beforeEach,describe}=require('node:test')
const assert=require('node:assert')
const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Note=require('../modules/note')
const config=require('../utils/config')
const helper=require('./test_helper')

const api=supertest(app)


describe('with some pre existing data',()=>{
    beforeEach(async()=>{
        await Note.deleteMany({})
        // for(let note of helper.initialNotes){
        //     let newNoteObject=new Note(note)
        //     await newNoteObject.save()
        // }
        await Note.insertMany(helper.initialNotes)
        
    })
    
    test('notes are returned as json',async()=>{
        await api.get('/api/notes')
        .expect(200)
        .expect('Content-type',/application\/json/)
    })
    
    test('there are only two entries',async()=>{
        const response = await api.get('/api/notes')
        assert.strictEqual(response.body.length,helper.initialNotes.length)
        
    })
    
    test('includes hello',async()=>{
        const response=await api.get('/api/notes')
        const content=response.body.map(e=>e.content)
        assert(content.includes('HTML is easy'))
    } )
    

describe('saving of a mote',()=>{
    test('a valid object can be saved',async()=>{
   
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true,
          }
        await api.post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response=await helper.notesInDb()
        const contents=response.map(r=>r.content)
        assert.strictEqual(contents.length,helper.initialNotes.length+1)
        assert(contents.includes('async/await simplifies making async calls'))
    }
    
    )
    test("an object without content won't be allowed",async()=>{
        const newNote={
            important:true
        }
       await api.post('/api/notes')
                .send(newNote)
                .expect(400)
    
        const result=await helper.notesInDb()
        assert.strictEqual(result.length,helper.initialNotes.length)        
    
    })
})

describe('single note operation',()=>{


test(' a single object can be accessed ',async()=>{
    const notes=await helper.notesInDb()
    const noteAtStart=notes[0]
    // console.log(noteAtStart)

    const returned=await api.get(`/api/notes/${noteAtStart.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(noteAtStart,returned.body)    

})

test('single object can be deleted ',async()=>{
    const notes=await helper.notesInDb()
    const firstObject=notes[0]

    await api.delete(`/api/notes/${firstObject.id}`)
            .expect(204)
    const notesAfter=await helper.notesInDb()
    const contents=notesAfter.map(note=>note.content)
    assert(!contents.includes(firstObject))
    assert.strictEqual(notesAfter.length,notes.length-1)
})
})
})
after(async()=>{
    await mongoose.connection.close()
})
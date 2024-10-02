const Note = require('../modules/note')
const User = require('../modules/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId=async()=>{
    const newNote=new Note({content:"hello world"})
    await newNote.save()
    await newNote.deleteOne()
    return newNote._id.toString()
}

const notesInDb=async()=>{
    const notes= await Note.find({})
    return notes.map(note=>note.toJSON())
    
}

const usersInDb=async()=>{
  const users=await User.find({})
  return users.map(user=>user.toJSON())
}
module.exports={notesInDb,nonExistingId,initialNotes,usersInDb}
// import mongoose from 'mongoose'
const mongoose=require('mongoose')

if(process.argv.length<3){
    console.log('the password mate')
    process.exit()
}


const password=process.argv[2];

const url=`mongodb+srv://cosmicspidey79:${password}@cluster0.bqrel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema=new mongoose.Schema({
    // id:Number,
    name:String,
    number:String

})

const Person=mongoose.model('Person',PersonSchema)

// basically means only password provided
if(process.argv.length==3){
    Person.find({}).then(result=>{
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name}  :${person.number}`)
        });
        mongoose.connection.close()
    })
   

}

else if(process.argv.length==5){
    const person = new Person({
        name:process.argv[3],
        number:process.argv[4]
    })

    person.save().then(result=>{
        console.log(result)
        mongoose.connection.close()
    })
}



// const newPerson=new Person({
//     id:324,
//     name:"Hello World",
//     number:"39393993"
// })

// newPerson.save().then(result=>{
//     console.log("save succesful")
//     mongoose.connection.close()
// })
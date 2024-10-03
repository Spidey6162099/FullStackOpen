const Blogs=require('../models/blog')
const User=require('../models/user')
const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }
]

const blogsInDb=async ()=>{
    const result =await Blogs.find({})
    return result.map(e=>e.toJSON())
}
const usersInDb=async()=>{
  const result=await User.find({})
  return result.map(r=>r.toJSON())
}
const nonExistingId=async()=>{
  const newBlog=new Blogs(    {"title":"well",
    "author":"well",
    "url": "well",
    "likes": 90})
    await newBlog.save()
    await newBlog.deleteOne()
    return newBlog._id.toString()
}
module.exports={blogs,blogsInDb,nonExistingId,usersInDb}
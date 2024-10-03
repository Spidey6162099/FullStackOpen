var _ =require('lodash');
// const { all } = require('../app');

const dummy=(blogs)=>{
    // return blogs.length===0?{}:blogs[0]
    return 1;
}

const totalLike=(blogs=>{
    const ans=blogs.reduce((sum,curr)=>sum+curr.likes,0)
    // console.log(ans)
    return blogs.length===0?0:ans
})

const fanFavourite=(blogs=>{
    if(blogs.length===0){
        return {}
    }
    const ans=blogs.reduce((prev,curr)=>{
        return prev.likes>curr.likes?prev:curr
    })
    delete ans._id;
    delete ans.__v
    delete ans.url
    return ans
})

const authorWithMostBlogs=(blogs)=>{
    if(blogs.length===0){
        return {}
    }
    const allUniqueAuthors=Array.from(new Set(blogs.map(blog=>{
        return blog.author
    }

    )))
 
    const blogCount =allUniqueAuthors.map(allUniqueAuthor=>{
        const blogNumber=blogs.reduce((cumulative,curr)=>{
            return curr.author===allUniqueAuthor?cumulative+1:cumulative
        },0)

        return {
            "author":allUniqueAuthor,
            "blogs":blogNumber
        }
    })

    return blogCount.reduce((prev,curr)=>{
        return curr.blogs>prev.blogs?curr:prev
    })
}

const authorWithMostLike=(blogs)=>{
    if(blogs.length===0){
        return {}
    }
    const allUniqueAuthors=Array.from(new Set(blogs.map(blog=>{
        return blog.author
    }

    )))
 
    const LikeCount =allUniqueAuthors.map(allUniqueAuthor=>{
        const likeNumber=blogs.reduce((cumulative,curr)=>{
            return curr.author===allUniqueAuthor?cumulative+curr.likes:cumulative
        },0)

        return {
            "author":allUniqueAuthor,
            "likes":likeNumber
        }
    })

    return LikeCount.reduce((prev,curr)=>{
        return curr.likes>prev.likes?curr:prev
    })
}
module.exports= {dummy,totalLike,fanFavourite,authorWithMostLike,authorWithMostBlogs}



// const blogs = [
//     {
//       _id: "5a422a851b54a676234d17f7",
//       title: "React patterns",
//       author: "Michael Chan",
//       url: "https://reactpatterns.com/",
//       likes: 7,
//       __v: 0
//     },
//     {
//       _id: "5a422aa71b54a676234d17f8",
//       title: "Go To Statement Considered Harmful",
//       author: "Edsger W. Dijkstra",
//       url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//       likes: 5,
//       __v: 0
//     }
//   ]
//   console.log(authorWithMostLike(blogs))
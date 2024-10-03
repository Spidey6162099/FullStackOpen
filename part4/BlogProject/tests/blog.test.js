const {test,describe}=require('node:test')
const assert=require('node:assert')
const listHelper=require('../utils/list_helper')

test('dummy returns one',()=>{
    const blogs=[]
    assert.strictEqual(listHelper.dummy(blogs),1)
})

describe('total like check',()=>{
    test("a single blog means the like remains same",()=>{
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
        ]
        const ans=listHelper.totalLike(blogs);
        assert.strictEqual(ans,7)

    })
    test('multiple also calculated correctly',()=>{
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
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            }
          ]

          const ans=listHelper.totalLike(blogs)
          assert.strictEqual(ans,24)
    })

    test('empty array means 0',()=>{
        const blogs=[]
        const ans=listHelper.totalLike(blogs)
        assert.strictEqual(ans,0)
    })

})
describe('most liked check',()=>{
    test('in case of single value self returned ',()=>{
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
        ]
        const actObj={
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        const ans=listHelper.fanFavourite(blogs)
        assert.deepStrictEqual(ans,actObj)
    })

    test('works in multiple case also',()=>{
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
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            }
          ]
          const maxObj={

            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",

            likes: 12,

          }
          const ans=listHelper.fanFavourite(blogs)
          assert.deepStrictEqual(ans,maxObj)
    })
    test('in case empty blog return null set',()=>{
        const blogs=[]
        const ans=listHelper.fanFavourite(blogs)
        assert.deepStrictEqual(ans,{})
    })
})

describe('authors with most blogs',()=>{
    test('works with single entry',()=>{
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
        ]

        const ans=listHelper.authorWithMostBlogs(blogs)
        const obj={
            "author":"Michael Chan",
            "blogs":1
        }
        assert.deepStrictEqual(ans,obj)
    })

    test('works with multiple entries',()=>{
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
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            }
          ]

          const ans=listHelper.authorWithMostBlogs(blogs)
          console.log(ans)
          const obj={
            "author":"Edsger W. Dijkstra",
            "blogs":2
          }
        assert.deepStrictEqual(ans,obj)
    })

    test('works with empty blog',()=>{
        const blogs=[]
        const ans=listHelper.authorWithMostBlogs(blogs)
        assert.deepStrictEqual(ans,{})
    })
})

describe('author with most likes',()=>{
    test('works with single entry',()=>{
        const blogs = [
            {
              _id: "5a422a851b54a676234d17f7",
              title: "React patterns",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
              likes: 7,
              __v: 0
            }
        ]

        const ans=listHelper.authorWithMostLike(blogs)
        const obj={
            "author":"Michael Chan",
            "likes":7
        }
        assert.deepStrictEqual(ans,obj)
    })

    test('works with multiple entries',()=>{
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
            },
            {
              _id: "5a422b3a1b54a676234d17f9",
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
              likes: 12,
              __v: 0
            }
          ]

          const ans=listHelper.authorWithMostLike(blogs)
          console.log(ans)
          const obj={
            "author":"Edsger W. Dijkstra",
            "likes":17
          }
        assert.deepStrictEqual(ans,obj)
    })

    test('works with empty blog',()=>{
        const blogs=[]
        const ans=listHelper.authorWithMostLike(blogs)
        assert.deepStrictEqual(ans,{})
    })
})


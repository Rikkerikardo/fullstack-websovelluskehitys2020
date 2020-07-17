const _ = require("lodash")
const blog = require("../models/blog")
const blogsRouter = require("../controllers/blogs")
const { result } = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {
  const reducer = (sum, blogs) => sum + blogs.likes

  return array.reduce(reducer, 0)
}

const favouriteBlog = (array) => {
  const reducer = (biggest, blogs) => {
    return biggest.likes > blogs.likes ? biggest : blogs
  }
  return array.reduce(reducer, array[0])
}

const mostBlogs = (blogs) => {
  const authorArray = blogs.map((x) => x.author)

  const authorsBlogCount = _.values(_.groupBy(authorArray)).map((x) => ({
    author: x[0],
    blogs: x.length,
  }))

  return authorsBlogCount[authorsBlogCount.length - 1]
}

const mostLikes = (blogs) => {
  const authorLikesArray = blogs.map((x) => ({
    author: x.author,
    likes: x.likes,
  }))

  const authorsGrouped = _.chain(authorLikesArray)
    .groupBy("author")
    .map((x, key) => ({
      author: key,
      likes: x,
    }))
    .value()

  const result = _(authorLikesArray)
    .groupBy("author")
    .map((x, key) => {
      var author = {
        author: key,
        likes: x.reduce((likes, x) => likes + x.likes, 0),
      }
      return author
    })
    .value()

  return result.reduce(
    (mostLikes, author) =>
      mostLikes.likes > author.likes ? mostLikes : author,
    result[0]
  )
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}

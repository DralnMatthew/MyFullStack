const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    response.json(blogs);
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body;

    const user = request.user;

    const blog = new Blog({
        author: body.author,
        title: body.title,
        likes: body.likes,
        url: body.url,
        user: user._id
    })

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user;
    const blog = await Blog.findById(request.params.id)
    // console.log(blog.user.toString() === user._id.toString())
    if ( blog.user.toString() === user._id.toString() ) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter
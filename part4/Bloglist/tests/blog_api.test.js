const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    })
    console.log('done')
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog)=> expect(blog.id).toBeDefined())
})

test('a valid blog can be added with token', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Zhanghu',
        url: "https://react.com/",
        likes: 7,
    }

    const rootUser = {
        username: "root",
        password: "sekret"
    }

    const response = await api.post('/api/login').send(rootUser)

    await api
        .post('/api/blogs')
        .set('authorization', 'bearer ' + response.body.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
        'async/await simplifies making async calls'
    )
})

test('blog without likes sets likes to zero', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Zhanghu',
        url: "https://react.com/",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: "Zhanghu"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog cannot be added without token', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Zhanghu',
        url: "https://react.com/",
        likes: 7,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})


afterAll(() => {
    mongoose.connection.close()
})
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    // const [newBlog, setNewBlog] = useState('')
    const [operationMessage, setOperationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => {
        return (
            <div>
                <h2>log in to application</h2>

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            id="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            id="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit" id="login-button">login</button>
                </form>
            </div>
        )
    }

    const updateBlog = async (blogId, blogObject) => {
        const updatedBlog = await blogService.update(blogId, blogObject)
        const updatedBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    }

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
    }

    const removeBlog = async (blogId) => {
        await blogService.remove(blogId)
        setBlogs(blogs.filter((blog) => blog.id !== blogId))
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} setErrorMessage={setErrorMessage} setOperationMessage={setOperationMessage}/>
        </Togglable>
    )

    const handleLogoutClick = () => {
        blogService.setToken('')
        setUser(null)
        window.localStorage.clear()
    }


    return (
        <div>
            <Notification message={operationMessage} />
            <ErrorNotification errormessage={errorMessage} />

            {user === null ?
                loginForm() :
                <div>
                    <h2>blogs</h2>
                    <p>{user.username} logged in <Button handleClick={handleLogoutClick} text="logout"/></p>
                    {blogForm()}
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App

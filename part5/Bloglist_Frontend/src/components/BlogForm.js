import { useState } from 'react'

const BlogForm = ( { createBlog, setOperationMessage, setErrorMessage } ) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            createBlog({
                title: title,
                author: author,
                url: url
            })
            setOperationMessage(`a new blog ${title} by ${author} added`)
            setTimeout(() => {
                setOperationMessage(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            setErrorMessage('fail to create a new blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        id="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        id="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        id="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit" id="create-button">create</button>
            </form>

        </div>
    )
}

export default BlogForm
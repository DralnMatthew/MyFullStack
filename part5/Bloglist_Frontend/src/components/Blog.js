import Button from './Button'
import { useState } from 'react'

const Blog = ( { blog, updateBlog, user, removeBlog } ) => {
    const [detailsVisible, setDetailsVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }


    const handleLikeClick = () => {
        const returnedBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(blog.id, returnedBlog)
    }

    const handleRemoveClick = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            removeBlog(blog.id)
        }
    }

    const handleVisibleClick = () => setDetailsVisible(!detailsVisible)

    return (
        <div style={blogStyle} className='blog'>
            <div className="titleAndAuthor">
                {blog.title} {detailsVisible === true ? null : `By ${blog.author}`} <Button handleClick={handleVisibleClick} text={ detailsVisible === true ? 'hide' : 'view' }/>
                <div>
                    {detailsVisible === true ? <div className="blogUrl">{blog.url}</div> : null}

                    {detailsVisible === true ? <div className="blogLikes">likes {blog.likes}<Button handleClick={handleLikeClick} text='like' id='like-button'/> </div> : null}
                    {detailsVisible === true ? <div className="blogAuthor">{blog.author}</div>: null}
                    <div>{detailsVisible === true && user !== undefined && blog.user !== undefined && (user.username === blog.user.username ) ? <Button handleClick={handleRemoveClick} text="remove" id='remove-button'/> : null}</div>
                </div>
            </div>
        </div>
    )}

export default Blog
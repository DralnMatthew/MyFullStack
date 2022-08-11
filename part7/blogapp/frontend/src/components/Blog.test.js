import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('the component displaying a blog renders the blog\'s title and author, but does not render its url or number of likes by default', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Zhanghu Zhao',
        url: 'www.react.com',
        likes: 3
    }

    let container = render(<Blog blog={blog} />).container

    const titleAndAuthor = container.querySelector('.titleAndAuthor')
    expect(titleAndAuthor).toBeDefined()

    const blogUrl = container.querySelector('.blogUrl')
    const blogLikes = container.querySelector('.blogLikes')
    const blogAuthor = container.querySelector('.blogAuthor')
    expect(blogLikes).toBe(null)
    expect(blogUrl).toBe(null)
    expect(blogAuthor).toBe(null)
})

test('the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Zhanghu Zhao',
        url: 'www.react.com',
        likes: 3
    }

    let container = render(<Blog blog={blog} />).container

    const blogUrl = container.querySelector('.blogUrl')
    const blogLikes = container.querySelector('.blogLikes')

    expect(blogUrl).toBeDefined()
    expect(blogLikes).toBeDefined()
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Zhanghu Zhao',
        url: 'www.react.com',
        likes: 3
    }

    const mockUpdateHandler = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateHandler}/>)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
})
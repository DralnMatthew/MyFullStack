import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const setOperationMessage = jest.fn()
    const setErrorMessage = jest.fn()
    const user = userEvent.setup()

    let container = render(<BlogForm createBlog={createBlog} setOperationMessage={setOperationMessage} setErrorMessage={setErrorMessage}/>).container

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const button = screen.getByText('create')

    await user.type(title, 'Component testing is done with react-testing-library')
    await user.type(author, 'Zhanghu Zhao')
    await user.type(url, 'www.react.com')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
    expect(createBlog.mock.calls[0][0].author).toBe('Zhanghu Zhao')
    expect(createBlog.mock.calls[0][0].url).toBe('www.react.com')
})
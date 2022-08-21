import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleLogoutClick = () => {
    logout()
    setPage('login')
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ? <div>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommend</button>
              <button onClick={() => handleLogoutClick()}>logout</button>
            </div>
          : <div>
              <button onClick={() => setPage('login')}>login</button>
            </div>
        }
      </div>

      <Authors show={page === 'authors'} setError={notify}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify}/>

      <Recommendations show={page === 'recommendations'} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage}/>

    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App

import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Select from 'react-select';

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState(null)
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result.data])

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const options = authors.map(a => ({value: a.name, label: a.name}) )

  const submit = (event) => {
    event.preventDefault()
    editAuthor({  variables: { name: name.value, setBornTo: born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          defaultValue={name}
          onChange={setName}
          options={options}
        />
        <div>
          born <input
          type="number"
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors

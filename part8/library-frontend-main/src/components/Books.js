// import { useQuery } from "@apollo/client";
// import { ALL_BOOKS } from "../queries";
// import { useEffect, useState } from "react";
//
// const Books = (props) => {
//   const [books, setBooks] = useState([])
//   const [bookGenres, setBookGenres] = useState([])
//   const [show, setShow] = useState('all genres')
//   const [bookList, setBookList] = useState([])
//   const result = useQuery(ALL_BOOKS)
//   // console.log(result)
//   useEffect(() => {
//     if (result.data) {
//       setBooks(result.data.allBooks)
//     }
//   }, [result.data])
//
//   useEffect(() => {
//     setBookGenres(
//       [...new Set(books.reduce(
//         (previousValue, currentValue) => previousValue.concat(currentValue.genres),
//         bookGenres
//       ))]
//     )
//   },[books])
//
//   useEffect(() => {
//     if (show === 'all genres') setBookList(books)
//     else setBookList(books.filter(b => b.genres.includes(show)))
//   }, [show])
//
//   if (result.loading)  {
//     return <div>loading...</div>
//   }
//
//   if (!props.show) {
//     return null
//   }
//
//   // console.log(1, bookGenres)
//
//   return (
//     <div>
//       <h2>books</h2>
//       <table>
//         <tbody>
//           <tr>
//             <th></th>
//             <th>author</th>
//             <th>published</th>
//           </tr>
//           {bookList.map((b) => (
//             <tr key={b.title}>
//               <td>{b.title}</td>
//               <td>{b.author.name}</td>
//               <td>{b.published}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {bookGenres.map((g) => <button onClick={() => setShow(g)}>{g}</button>)}
//       <button onClick={() => setShow('all genres')}>all genres</button>
//     </div>
//   )
// }
//
// export default Books


import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [show, setShow] = useState('all genres')
  const [allBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS)
  // console.log(result)

  useEffect(() => {
    if (show === 'all genres') allBooks()
    else allBooks({variables: { genre: show }})
  }, [show])

  if (called && loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = data.allBooks
  const bookGenres = [...new Set(books.reduce(
    (previousValue, currentValue) => previousValue.concat(currentValue.genres),
    []
  ))]

  // console.log(1, bookGenres)

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((b) => (
          <tr key={b.title}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
      {bookGenres.map((g) => <button onClick={() => setShow(g)}>{g}</button>)}
      <button onClick={() => setShow('all genres')}>all genres</button>
    </div>
  )
}

export default Books

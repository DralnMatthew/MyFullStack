// import { useQuery } from "@apollo/client";
// import { ALL_BOOKS, ME } from "../queries";
// import { useEffect, useState } from "react";
//
// const Recommendations = (props) => {
//   const [books, setBooks] = useState([])
//   const [bookList, setBookList] = useState([])
//   const result = useQuery(ALL_BOOKS)
//   const me = useQuery(ME)
//   console.log(me)
//   useEffect(() => {
//     if (result.data) {
//       setBooks(result.data.allBooks)
//     }
//   }, [result.data])
//
//   useEffect(() => {
//     if (me.data) {
//       setBookList(books.filter(b => b.genres.includes(me.data.me.favouriteGenre)))
//     }
//   }, [books])
//
//   if (result.loading)  {
//     return <div>loading...</div>
//   }
//
//   if (!props.show) {
//     return null
//   }
//
//   return (
//     <div>
//       <h2>recommendations</h2>
//       <table>
//         <tbody>
//         <tr>
//           <th></th>
//           <th>author</th>
//           <th>published</th>
//         </tr>
//         {bookList.map((b) => (
//           <tr key={b.title}>
//             <td>{b.title}</td>
//             <td>{b.author.name}</td>
//             <td>{b.published}</td>
//           </tr>
//         ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
//
// export default Recommendations

import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import { useEffect, useState } from "react";

const Recommendations = (props) => {
  const me = useQuery(ME)
  const [allBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (me.data && me.data.me) {
      allBooks({ variables: { genre: me.data.me.favouriteGenre }})
    }
  }, [me.data])

  if (called && loading) return <p>Loading ...</p>

  if (!props.show) {
    return null
  }

  const books = data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
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
    </div>
  )
}

export default Recommendations
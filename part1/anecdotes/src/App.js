import { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))


  const handleNextAnecdoteClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const argmax = (points)=>{
    let ans = 0
    for(let i = 0; i < points.length; i++){
      if(points[i] > points[ans]) ans = i
    }
    return ans
  }

  return (
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <div>has {points[selected]} votes</div>
        <Button text='vote' handleClick={handleVoteClick}/>
        <Button text='next anecdote' handleClick={handleNextAnecdoteClick}/>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[argmax(points)]}</div>
        <div>has {points[argmax(points)]} votes</div>

      </div>
  )
}

export default App
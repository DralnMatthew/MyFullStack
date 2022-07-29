import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <li onClick={handleClick}>
            {anecdote.content} <br />
            has {anecdote.votes} <button type="submit"> vote </button>
        </li>
    )
}

const Anecdotes = (props) => {
    return(
        <ul>
            {props.anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>{
                        props.addVote(anecdote.id)
                        props.setNotification(`you voted ${anecdote.content}`, 5)
                    }
                    }
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    if ( state.filter === '' ) {
        return {
            anecdotes: state.anecdotes
        }
    }

    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
}

const mapDispatchToProps = {
    addVote, setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)
const Button = ( { handleClick, text, id } ) => (
    <button onClick={ handleClick } id={ id }>
        { text }
    </button>
)

export default Button
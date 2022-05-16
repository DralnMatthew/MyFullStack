const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className='operation'>
            {message}
        </div>
    )
}

export default Notification
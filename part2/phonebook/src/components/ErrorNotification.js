const ErrorNotification = ({ errormessage }) => {
    if (errormessage === null) {
        return null
    }

    return (
        <div className='error'>
            {errormessage}
        </div>
    )
}

export default ErrorNotification
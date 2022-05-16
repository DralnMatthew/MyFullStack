const Filter = ({handleShowInput, filter}) => (
    <div>
        filter shown with <input onChange={handleShowInput} value={filter}/>
    </div>
)

export default Filter
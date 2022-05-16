const Persons = ({personsToShow, handleRemove}) => {
    return (
        <div>
            {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}
                <button onClick={()=>handleRemove(person.id)}>delete</button></div>)}
        </div>
    )

}

export default Persons
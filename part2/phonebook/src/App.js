import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import personService from './services/Persons'
import Notification from './components/Notification'
import './index.css'
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [operationMessage, setOperationMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const handleNameInput = (event) => {
        setNewName(event.target.value)
    };
    const handleNumberInput = (event) => {
        setNewNumber(event.target.value)
    };

    const handleShowInput = (event) => {
        setFilter(event.target.value)
    };

    const handleRemove = (id) => {
        const person = persons.find(p => p.id === id)
        if(window.confirm(`Delete ${person.name}?`)){
            personService
                .remove(id)
            setOperationMessage(`Deleted ${person.name}`)
            setTimeout(() => {
                setOperationMessage(null)
            }, 3000)
            setPersons(persons.filter((person) => person.id !== id))
        }
    }

  
    const addPerson = (event) => {
        event.preventDefault()
        const nObject = {
            name: newName,
            number: newNumber
        }
        const person = persons.find(p => p.name === newName)
        if(person){
            window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
            personService
                .update(person.id, nObject)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setOperationMessage(`Updated ${person.name}`)
                    setTimeout(() => {
                        setOperationMessage(null)
                    }, 3000)
                })
                .catch(error => {
                    console.log(`Infomation of ${person.name} has already been deleted from server`)
                    setErrorMessage(`Infomation of ${person.name} has already been deleted from server`)
                    setPersons(persons)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 3000)
                })
            return
        }
        personService
            .create(nObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                setOperationMessage(`Added ${nObject.name}`)
                setTimeout(() => {
                    setOperationMessage(null)
                }, 3000)
            })
    };

    const personsToShow = filter==='' ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    useEffect(() => {
        personService
            .getAll()
            .then(initPersons => setPersons(initPersons))
    }, [])

    return (
      <div>
        <h2>Phonebook</h2>
          <Notification message={operationMessage} />
          <ErrorNotification errormessage={errorMessage} />
          <Filter filter={filter} handleShowInput={handleShowInput}/>
        <h3>add a new</h3>
          <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput}/>
        <h3>Numbers</h3>
          <Persons personsToShow={personsToShow} handleRemove={handleRemove}/>

      </div>
    );
}

export default App
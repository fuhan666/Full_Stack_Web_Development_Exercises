import { useState } from "react"
import server from '../services/Server'


const PersonForm = ({ persons, setPersons, setNotification }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = e => setNewName(e.target.value)
    const handleNumberChange = e => setNewNumber(e.target.value)

    const checkDuplicate = () => persons.some(person => person.name === newName)

    const handleSubmit = e => {
        e.preventDefault()

        if (!checkDuplicate()) {
            const newPerson = { name: newName, number: newNumber }
            server
                .addContact(newPerson)
                .then(res => {
                    setPersons(persons.concat(res))
                    setNotification({ msg: `Added ${newName}`, isError: false })
                    setTimeout(() => setNotification({ msg: '', isError: false }), 5000)
                })
        } else if (window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const oldInfo = persons.find(person => person.name === newName)
            const newInfo = { ...oldInfo, number: newNumber }
            server
                .updateInfo(newInfo)
                .then(res => {
                    setPersons(persons.map(person =>
                        person.id !== newInfo.id
                            ? person
                            : res))
                    setNotification({ msg: 'Updated!', isError: false })
                    setTimeout(() => setNotification({ msg: '', isError: false }), 5000)
                })
                .catch(() => {
                    setNotification({
                        msg: `Infomation of ${newName} has already been removed from server`,
                        isError: true
                    })
                    setTimeout(() => setNotification({ msg: '', isError: false }), 5000)
                })
        }
        setNewName('')
        setNewNumber('')
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
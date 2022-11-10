import { useEffect, useState } from 'react'
import server from './services/Server'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [notification, setNotification] = useState({ msg: '', isError: false })
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        server
            .getAll()
            .then(res => setPersons(res))
    }, [])

    const handleSearchChange = e => setSearchText(e.target.value)

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification notification={notification} />

            <Filter value={searchText} onChange={handleSearchChange} />

            <h3>Add a new</h3>

            <PersonForm
                persons={persons}
                setPersons={setPersons}
                setNotification={setNotification} />

            <h3>Numbers</h3>

            <Persons
                searchText={searchText}
                persons={persons}
                setPersons={setPersons} />
        </div>
    )
}

export default App
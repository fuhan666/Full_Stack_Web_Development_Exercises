import server from '../services/Server'


const DeleteButton = ({ person, setPersons }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            server
                .deleteContact(person.id)
                .then(() =>
                    server
                        .getAll()
                        .then(res => setPersons(res)))
        }
    }

    return (
        <button onClick={handleDelete}>
            delete
        </button>
    )
}

const ShowContact = ({ person, setPersons }) => (
    <div>
        {person.name} {person.number}&nbsp;
        <DeleteButton
            person={person}
            setPersons={setPersons} />
    </div>
)

const Persons = ({ searchText, persons, setPersons }) => {
    const filterPerson = searchText
        ? persons.filter(person =>
            person.name.toLowerCase().includes(searchText.toLowerCase()))
        : persons
    return (
        <>
            {filterPerson.map(person =>
                <ShowContact key={person.id} person={person} setPersons={setPersons} />
            )}
        </>
    )
}

export default Persons
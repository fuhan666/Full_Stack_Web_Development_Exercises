import axios from "axios"


const resourcesUrl = 'http://localhost:13464/persons'

const getAll = () => axios.get(resourcesUrl).then(res => res.data)

const addContact = newContact => axios.post(resourcesUrl, newContact).then(res => res.data)

const deleteContact = id => axios.delete(`${resourcesUrl}/${id}`)

const updateInfo = newInfo => (
    axios
        .put(`${resourcesUrl}/${newInfo.id}`, newInfo)
        .then(res => res.data)
)

export default { getAll, addContact, deleteContact, updateInfo }
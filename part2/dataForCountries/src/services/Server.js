import axios from 'axios'

const resourcesUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => axios.get(resourcesUrl).then(res => res.data)

export default { getAll }

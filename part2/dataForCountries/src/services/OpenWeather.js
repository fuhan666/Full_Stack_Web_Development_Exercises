import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getWeather = capital =>
    axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${capital}&appid=${api_key}`
        )
        .then(res => res.data)

export default { getWeather }

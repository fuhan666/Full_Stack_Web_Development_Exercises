import { useEffect, useState } from 'react'
import server from './services/Server'
import SearchInput from './components/SearchInput'
import ShowResult from './components/ShowResult'
import CountryDetail from './components/CountryDetail'
import OpenWeather from './services/OpenWeather'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchText, setSearchText] = useState('')
    const [matchCountries, setMatchCountries] = useState([])
    const [countryDetail, setCountryDetail] = useState({})
    const [weather, setWeather] = useState({})

    useEffect(() => {
        server.getAll().then(res => setCountries(res))
    }, [])

    const handleSearchChange = e => setSearchText(() => e.target.value)

    const getWeather = city =>
        OpenWeather.getWeather(city)
            .then(res => ({
                city: city,
                temperature: res.main.temp,
                icon: res.weather[0].icon,
                wind: res.wind.speed,
            }))
            .then(res => setWeather(res))

    useEffect(() => {
        const matchCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
        setMatchCountries(matchCountries)
        if (matchCountries.length === 1) {
            getWeather(matchCountries[0].capital[0]).then(
                setCountryDetail(matchCountries[0])
            )
        } else {
            setCountryDetail({})
        }
    }, [searchText])

    const clickShowButton = country => {
        getWeather(country.capital[0]).then(setCountryDetail(country))
    }

    return (
        <div>
            <SearchInput
                value={searchText}
                onChange={handleSearchChange}
            />
            <ShowResult
                searchText={searchText}
                matchCountries={matchCountries}
                clickShowButton={clickShowButton}
            />
            <CountryDetail
                country={countryDetail}
                weather={weather}
            />
        </div>
    )
}

export default App

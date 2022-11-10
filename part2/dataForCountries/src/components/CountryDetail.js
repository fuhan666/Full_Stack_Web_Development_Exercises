const BasicInfo = ({ capital, area }) => (
    <p>
        capital {capital}
        <br />
        area {area}
    </p>
)

const Languages = ({ langObj }) => (
    <>
        <h3>languages:</h3>
        <ul>
            {Object.values(langObj).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
    </>
)

const Weather = ({ weather }) => {
    const { city, temperature, icon, wind } = weather
    return (
        <>
            <h2>Weather in {city}</h2>
            <p>temperature {temperature} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@4x.png`} />
            <p>wind {wind} m/s</p>
        </>
    )
}

const CountryDetail = ({ country, weather }) => {
    if (Object.keys(country).length === 0) return
    const { name, capital, area, languages, flags } = country

    return (
        <div>
            <h1>{name.common}</h1>
            <BasicInfo
                capital={capital[0]}
                area={area}
            />
            <Languages langObj={languages} />
            <img
                src={flags.png}
                style={{ width: 250 }}
            />
            <Weather weather={weather} />
        </div>
    )
}

export default CountryDetail

const ShowResult = ({ searchText, matchCountries, clickShowButton }) => {
    if (!searchText || matchCountries.length === 1) return

    if (matchCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else {
        return (
            <>
                {matchCountries.map(country => (
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => clickShowButton(country)}>
                            show
                        </button>
                    </div>
                ))}
            </>
        )
    }
}

export default ShowResult

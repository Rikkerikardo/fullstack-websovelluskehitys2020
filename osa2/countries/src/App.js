import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

function App() {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState("")
  const [weather, setWeather] = useState("")
  const [fullName, setFullName] = useState("")

  const api_key = process.env.REACT_APP_API_KEY

  const params = {
    access_key: api_key,
    query: fullName,
  }

  useEffect(() => {
    if (fullName !== "") {
      axios
        .get("http://api.weatherstack.com/current", { params })
        .then((response) => {
          setWeather(response.data)
        })
    }
  }, [fullName])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setShowAll(event.target.value)
  }

  const handleClick = (country) => {
    setFullName(country)
    setShowAll(country.name)
  }

  return (
    <div>
      <SearchForm search={handleSearch} />

      <CountriesToShow
        countries={countries}
        filter={showAll}
        showCountry={handleClick}
        weather={weather}
        updateFullName={setFullName}
      />
    </div>
  )
}

const CountriesToShow = ({
  countries,
  filter,
  showCountry,
  weather,
  updateFullName,
}) => {
  if (
    countries.filter((country) => country.name.includes(filter)).length > 10
  ) {
    return <p>Too many matches, specify another filter</p>
  } else if (
    countries.filter((country) => country.name.includes(filter)).length == 1
  ) {
    const only = countries.filter((country) => country.name.includes(filter))
    updateFullName(only[0].name)
    return (
      <div>
        <OneCountryView
          countries={countries}
          filter={filter}
          weather={weather}
        />
      </div>
    )
  } else {
    /* const personsToShow = persons.filter((person) => person.name.includes(filter)) */
    return countries
      .filter((country) => country.name.includes(filter))
      .map((country) => (
        <div key={country.name.toString()}>
          {country.name}{" "}
          <button onClick={() => showCountry(country)}>show</button>
        </div>
      ))
  }
}

const OneCountryView = ({ countries, filter, weather }) => {
  return countries
    .filter((country) => country.name.includes(filter))
    .map((country) => (
      <div key={country.name.toString()}>
        <img src={country.flag} width={75} height={50} />
        <p>{country.name}</p>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <p>
          languages{" "}
          {country.languages.map((language) => (
            <li key={language.name.toString()}>{language.name}</li>
          ))}
        </p>
        <CapitalWeather capital={country.capital} weather={weather} />
      </div>
    ))
}

const CapitalWeather = ({ capital, weather }) => {
  if (weather === "") return <h3>Weather in {capital}</h3>

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.current.temperature}</p>
      <img src={weather.current.weather_icons} />
      <p>
        Wind: {weather.current.wind_speed}km/h from {weather.current.wind_dir}
      </p>
    </div>
  )
}

const SearchForm = (props) => {
  return (
    <div>
      Find countries
      <form>
        filter: <input onChange={props.search} />
      </form>
    </div>
  )
}

export default App

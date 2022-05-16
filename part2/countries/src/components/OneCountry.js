import {useEffect, useState} from "react";
import axios from "axios";

const OneCountry = ({country}) => {
    const [weather, setWeather] = useState('')
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    },[])
    if (weather === '') {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <br/>
            <b>languages:</b>
            <ul>
                {
                    Object.keys(country.languages).map((key_, i) => (
                        <li key={i}>{country.languages[key_]}</li>
                    ))
                }
            </ul>
            <img src={country.flags.png} alt={country.name} />
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weather.current.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={country.name} />
            <p>wind {weather.current.wind_speed} m/s</p>
        </>
    )
}

export default OneCountry;
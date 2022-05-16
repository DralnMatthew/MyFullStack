import {useState, useEffect} from "react";
import axios from "axios";
import OneCountry from "./components/OneCountry";
import SeveralCountry from "./components/SeveralCountry";

const Display = ({countriesToShow}) => {
    if (countriesToShow.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countriesToShow.length === 1){
        return (
            <div>
                <OneCountry country={countriesToShow[0]}/>
            </div>
        )
    }
    else{
        return (
            <div>
                <SeveralCountry countries={countriesToShow}/>
            </div>
        )
    }
}
const App = () => {
    const [filter, setFilter] = useState('');
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    },[])

    const handleFilterInput = (event) => {
        setFilter(event.target.value)
    }
    const countriesToShow = filter === "" ? [] : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            find countries <input onChange={handleFilterInput} />
            <Display countriesToShow={countriesToShow}/>
        </div>
    )
}

export default App;

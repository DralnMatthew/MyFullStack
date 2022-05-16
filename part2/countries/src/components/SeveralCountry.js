import OneCountry from "./OneCountry";
import {useState} from "react";
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const SeveralCountry = ({countries}) => {
    const [country, setCountry] = useState(-1)
    if(country === -1){
        return (
            <>
                {countries.map((country, i)=><div key={i}>{country.name.common} <Button text='show' handleClick={()=>setCountry(i)}/></div>)}
            </>
        )
    }
    return (
        <>
            <OneCountry country={countries[country]}/>
        </>
    )
}

export default SeveralCountry;
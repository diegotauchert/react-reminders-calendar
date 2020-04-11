import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Temperature from './Temperature';

const App = ({latitude, longitude}) =>{

    const api = {
      key: "9c7c32c2efdcd580d8c2beb730fe2c1d",
      base: "https://api.openweathermap.org/data/2.5/"
    }

    const [temp, setTemp] = useState([]);
    const [feels_like, setFeelsLike] = useState([]);
    const [weather, setWeather] = useState([]);
    const [city, setCity] = useState();
    const [country, setCountry] = useState([]);

    useEffect(() => {
      getForecasts();
    }, []);

    const getForecasts = async () => {
      const response = await fetch(
        `${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`
      );
      const data = await response.json();

      setTemp(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setWeather(data.weather[0].main);
      setCity(data.name);
      setCountry(data.sys.country);
      //console.log(data);
    }

    return(
      <Temperature 
          temp={temp} 
          feelslike={feels_like} 
          sky={weather} 
          city={city} 
          country={country} 
        />
    );
};

export default App;

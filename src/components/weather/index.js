import React, { useEffect, useState } from 'react';
import Temperature from './Temperature';
import { GeolocationService } from '../../Services/GeolocationService';

function App({ latitude, longitude }) {

  const [temp, setTemp] = useState([]);
  const [feels_like, setFeelsLike] = useState([]);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    GeolocationService.getForecasts(latitude, longitude)
      .then(res => {
        setTemp(res.data.main.temp);
        setFeelsLike(res.data.main.feels_like);
        setWeather(res.data.weather[0].main);
        setCity(res.data.name);
        setCountry(res.data.sys.country);
      })
      .catch(err => console.error(err))
      .finally(() => console.log('Voltou o Request'));
  }, []);

  return (
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

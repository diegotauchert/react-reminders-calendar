import React, { useEffect, useState } from 'react';
import Temperature from './Temperature';
import { GeolocationService } from '../../Services/GeolocationService';

function App({ latitude, longitude }) {

  const [temp, setTemp] = useState([]);
  const [feels_like, setFeelsLike] = useState([]);
  const [weather, setWeather] = useState([]);
  const [classWeather, setClassWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const [city, setCity] = useState();
  const [country, setCountry] = useState([]);

  /*getWeatherIcon = (rangeId) => {
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        setWeatherIcon('wi-thunderstorm');
        break;
      case rangeId >= 300 && rangeId <= 321:
        setWeatherIcon(this.weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setWeatherIcon(this.weatherIcon.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setWeatherIcon(this.weatherIcon.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setWeatherIcon(this.weatherIcon.Atmosphere);
        break;
      case rangeId === 800:
        setWeatherIcon(this.weatherIcon.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setWeatherIcon('wi-day-fog');
        break;
      default:
        setWeatherIcon(this.weatherIcon.Clouds);
        break;
    }
  };*/

  useEffect(() => {
    GeolocationService.getForecasts(latitude, longitude)
      .then(res => {
        setTemp(res.data.main.temp);
        setFeelsLike(res.data.main.feels_like);
        setWeather(res.data.weather[0].description);
        setWeatherIcon(res.data.weather[0].id);
        setClassWeather(res.data.weather[0].main);
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
      icon={weatherIcon}
      className={classWeather}
    />
  );
};

export default App;

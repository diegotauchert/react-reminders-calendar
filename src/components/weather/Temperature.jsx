import React from "react";
import "weathericons/css/weather-icons.min.css";

const Temperature = ({
  temp,
  feelslike,
  sky,
  city,
  country,
  className,
  icon,
}) => {
  let iconWeather = null;

  switch (true) {
    case icon >= 200 && icon <= 232:
      iconWeather = "wi-thunderstorm";
      break;
    case icon >= 300 && icon <= 321:
      iconWeather = "wi-sleet";
      break;
    case icon >= 500 && icon <= 531:
      iconWeather = "wi-storm.showers";
      break;
    case icon >= 600 && icon <= 622:
      iconWeather = "wi-snow";
      break;
    case icon >= 701 && icon <= 781:
      iconWeather = "wi-fog";
      break;
    case icon === 800:
      iconWeather = "wi-day-sunny";
      break;
    case icon >= 801 && icon <= 804:
      iconWeather = "wi-day-fog";
      break;
    default:
      iconWeather = "wi-day-fog";
      break;
  }

  return (
    <div className={`temperature-widget ${className.toString().toLowerCase()}`}>
      <i className={`wi ${iconWeather} wi-flip-vertical`} />
      <span>
        <small>{sky}</small>
      </span>
      <br />
      <span>
        {city} / {country}
      </span>
      <br />
      <span>
        <small>Temperature:</small> <strong>{Math.round(temp)}°c</strong>
      </span>
      {" | "}
      <span>
        <small>Feels Like:</small> <strong>{Math.round(feelslike)}°c</strong>
      </span>
    </div>
  );
};

export default Temperature;

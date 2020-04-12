import React from 'react';
import "weathericons/css/weather-icons.min.css";

const Temperature = ({temp, feelslike, sky, city, country, className, icon}) => {
  return(
    <div className={`temperature-widget ${className.toString().toLowerCase()}`}>
      <span>{city} / {country}</span><br />
      <span><small>{sky}</small></span><br />
      <i className={`wi wi-${icon} wi-flip-vertical`} />
      <span><small>Temperature:</small> {Math.round(temp)}°c</span><br />
      <span><small>Feels Like:</small> {Math.round(feelslike)}°c</span>
    </div>
  )
}

export default Temperature;
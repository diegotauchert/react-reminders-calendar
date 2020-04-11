import React from 'react';

const Temperature = ({temp, feelslike, sky, city, country}) => {
  return(
    <div>
      <span>{city} / {country}</span><br />
      <span>Temperature: {Math.round(temp)}°c</span><br />
      <span>Feels Like: {Math.round(feelslike)}°c</span><br />
      <span>{sky}</span>
    </div>
  )
}

export default Temperature;
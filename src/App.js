import React from 'react';

import Geolocation from './components/geolocation';
import Calendar from './components/calendar';
import Clock from './components/clock';

function App() {
  return (
    <>
      <Geolocation />
      <Clock />
      <Calendar />
    </>
  );
}

export default App;

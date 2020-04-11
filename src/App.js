import React, { Fragment } from "react";
import ReactDOM from 'react-dom';

import Geolocation from "./components/geolocation";
import Calendar from "./components/calendar";

function App() {
  return (
    <Fragment>
      <Geolocation />
      <Calendar />
    </Fragment>
  )
}

export default App;
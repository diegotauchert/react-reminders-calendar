import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});
const key = '9c7c32c2efdcd580d8c2beb730fe2c1d';

export class GeolocationService {
  static getForecasts(lat, long) {
    return instance.get(`weather?lat=${lat}&lon=${long}&units=metric&APPID=${key}`);
  }
}

import axios from 'axios';

const HttpClient = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export default HttpClient;

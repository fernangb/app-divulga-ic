import axios from 'axios';

const api = axios.create({
  baseURL: 'http://1eb6beabd65e.ngrok.io',
});

export default api;

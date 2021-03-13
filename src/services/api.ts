import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.13:3333',
  baseURL: 'http://eec69f047017.ngrok.io',
});

export default api;

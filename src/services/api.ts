import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.13:3333',
  baseURL: 'http://7c3a391778d8.ngrok.io',
});

export default api;

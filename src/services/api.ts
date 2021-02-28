import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.13:3333',
  baseURL: 'http://4d5c66e6e1f2.ngrok.io',
});

export default api;

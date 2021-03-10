import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.13:3333',
  baseURL: 'http://044f5f4a2f2f.ngrok.io',
});

export default api;

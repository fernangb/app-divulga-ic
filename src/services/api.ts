import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.0.13:3333',
  baseURL: 'http://33259004446c.ngrok.io',
});

export default api;

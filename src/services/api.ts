import axios from 'axios';

const api = axios.create({
  baseURL: 'http://1ef7d12d34a8.ngrok.io',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://b6a9a6ab0534.ngrok.io',
});

export default api;

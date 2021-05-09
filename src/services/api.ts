import axios from 'axios';

const api = axios.create({
  baseURL: 'http://e2743673a9b7.ngrok.io',
});

export default api;

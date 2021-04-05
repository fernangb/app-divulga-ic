import axios from 'axios';

const api = axios.create({
  baseURL: 'http://068971288a5a.ngrok.io',
});

export default api;

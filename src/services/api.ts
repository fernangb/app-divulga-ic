import axios from 'axios';

const api = axios.create({
  baseURL: 'http://8141e0c58b8f.ngrok.io',
});

export default api;

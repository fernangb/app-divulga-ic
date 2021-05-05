import axios from 'axios';

const api = axios.create({
  baseURL: 'http://55165840f96c.ngrok.io',
});

export default api;

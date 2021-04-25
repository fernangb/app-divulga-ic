import axios from 'axios';

const api = axios.create({
  baseURL: 'http://20e2988e1d83.ngrok.io',
});

export default api;

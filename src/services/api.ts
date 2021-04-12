import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ca6afac47e20.ngrok.io',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://9065adcbf41d.ngrok.io',
});

export default api;

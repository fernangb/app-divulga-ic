import axios from 'axios';

const api = axios.create({
  baseURL: 'http://2ed59af1771b.ngrok.io',
});

export default api;

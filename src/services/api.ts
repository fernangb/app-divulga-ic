import axios from 'axios';

const api = axios.create({
  baseURL: 'http://9da7554f0af2.ngrok.io',
});

export default api;

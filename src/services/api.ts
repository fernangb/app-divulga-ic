import axios from 'axios';

const api = axios.create({
  baseURL: 'http://4018e660f969.ngrok.io',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://49ef81862433.ngrok.io',
});

export default api;

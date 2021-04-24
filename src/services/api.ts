import axios from 'axios';

const api = axios.create({
  baseURL: 'http://e5f649f393fd.ngrok.io',
});

export default api;

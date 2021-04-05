import axios from 'axios';

const api = axios.create({
  baseURL: 'http://46b80702f318.ngrok.io',
});

export default api;

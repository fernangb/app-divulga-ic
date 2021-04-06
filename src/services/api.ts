import axios from 'axios';

const api = axios.create({
  baseURL: 'http://9261582b53bc.ngrok.io',
});

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://divulgaic.com',
});

export default api;

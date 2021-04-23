import axios from 'axios';

const api = axios.create({
  baseURL: 'http://95c228aaa39c.ngrok.io',
});

export default api;

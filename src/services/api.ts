import axios from 'axios';

const api = axios.create({
  baseURL: 'http://966ccc0e33b2.ngrok.io',
});

export default api;

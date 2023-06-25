import axios from 'axios';

const axiosDf = axios.create({
  // baseURL: 'https://3502-37-17-54-18.ngrok-free.app/',
  baseURL: 'http://localhost:5001/',
  withCredentials: true,
});

export default axiosDf;

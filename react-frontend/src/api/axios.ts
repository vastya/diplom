import axios from 'axios';

const axiosDf = axios.create({
  baseURL: 'https://3502-37-17-54-18.ngrok-free.app/',
  withCredentials: true,
});

export default axiosDf;

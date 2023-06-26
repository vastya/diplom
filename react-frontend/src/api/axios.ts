import axios from 'axios';

const axiosDf = axios.create({
  baseURL: 'https://e741-46-56-187-68.ngrok-free.app/',
  withCredentials: true,
});

export default axiosDf;

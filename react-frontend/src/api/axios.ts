import axios from 'axios';

const axiosDf = axios.create({
  baseURL: 'https://f467-37-215-177-245.ngrok-free.app/',
  withCredentials: true,
});

export default axiosDf;

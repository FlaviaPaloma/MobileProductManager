import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.182:3000', // Altere para o IP do seu servidor
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

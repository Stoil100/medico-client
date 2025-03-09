import axios from 'axios';

export const medicoApiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true
});
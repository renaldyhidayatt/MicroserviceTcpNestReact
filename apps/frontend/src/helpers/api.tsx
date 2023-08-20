import axios, { AxiosInstance } from 'axios';

export const myApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3030/api',
});

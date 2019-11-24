import axios from 'axios';

// const baseURL = `${window.location.href}api`;
const baseURL = `http://localhost:3333/api`; // mock api

console.log({ baseURL });

const api = axios.create({ baseURL });
export default api;

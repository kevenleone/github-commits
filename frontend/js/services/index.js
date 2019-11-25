import axios from 'axios';

const baseURL = `${window.location.href}api`;
// const baseURL = `http://localhost:3333/api`; // mock api

const api = axios.create({ baseURL });
export default api;

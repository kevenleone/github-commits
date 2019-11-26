import axios from 'axios';

const baseURL = window.location.href;
// const baseURL = `http://localhost:3333/`; // mock api

const api = axios.create({ baseURL: `${baseURL}api` });
export { baseURL };
export default api;

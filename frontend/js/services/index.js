import axios from 'axios';

const { protocol, host } = window.location;
const baseURL = `${protocol}//${host}/api`;

const api = axios.create({ baseURL });
export { baseURL };
export default api;

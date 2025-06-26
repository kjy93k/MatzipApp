import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true,
});

export default $axios;

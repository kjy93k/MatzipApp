import axios from 'axios';
import { Platform } from 'react-native';

export const baseUrl = {
  ios: 'http://localhost:3030',
  android: 'http://10.0.2.2:3030',
};

const $axios = axios.create({
  baseURL: Platform.OS === 'ios' ? baseUrl.ios : baseUrl.android,
  withCredentials: true,
});

export default $axios;

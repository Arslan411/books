import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AppInfo} from './URL';

const API = axios.create({
  baseURL: AppInfo.BaseUrl,
});

API.interceptors.request.use(async req => {
  try {
    const userdata = await AsyncStorage.getItem('token');
    const data = userdata;
    if (data) {
      req.headers.authorization = `Bearer ${data}`;
    }
    req.headers.common = 'Accept: application/json';
    req.headers.post = `Content-Type: 'application/json`;
  } catch (error) {
    console.log('in api erro' + error.response);
  }
  return req;
});

export default API;

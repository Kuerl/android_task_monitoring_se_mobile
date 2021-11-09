import axios from 'axios';
import { servurl, servport } from '../constants/Constant';

const __axios = axios.create({
  baseURL: servurl + servport,
});

export default __axios;

import Axios from "axios";
// import { servurl, servport } from '../constants/Constant';

// const __axios = axios.create({
//   baseURL: servurl + ':' + servport,
// });

export const __axios = Axios.create({
  baseURL: "http://128.199.66.87:3000",
  timeout: 3000,
});

export default __axios;

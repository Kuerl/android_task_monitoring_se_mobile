import __axios from "../AxiosBase";
import RegisterDto from '../../constants/dtos/RegisterDto';

export const testfunc = (registerDto: RegisterDto) => {
  console.log(registerDto);
  return;
}

// mod any to the dto
export const register = (data: any) => {
  __axios.post('register', data)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => error(e));
  return;
}

export const error = (e: any) => {
  return;
}

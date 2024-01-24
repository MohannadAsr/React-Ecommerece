import {
  GoogleLoginDto,
  LoginDto,
  SignupDto,
  UserDto,
} from '@src/Api/Auth/Dto';
import { Domain } from '@src/enums/Domain';
import axios from 'axios';

export const useAuth = () => {
  const Login = async (payload: LoginDto) => {
    try {
      const response = await axios.post(
        `${Domain.API_URL}/user/auth/login`,
        payload
      );
      SetuserData(response.data.data);
      return response.data as UserDto;
    } catch (error) {
      throw error;
    }
  };

  const LoginGoogle = async (payload: GoogleLoginDto) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    try {
      const response = await axios.post(
        `${Domain.API_URL}/user/auth/social/login`,
        payload,
        { headers }
      );
      SetuserData({
        ...response.data.data,
        token: response.data.data.access_token,
      });
      return response.data as UserDto;
    } catch (error) {
      throw error;
    }
  };

  const SignUp = async (payload: SignupDto) => {
    try {
      const response = await axios.post(
        `${Domain.API_URL}/user/auth/signup`,
        payload
      );
      SetuserData(response.data.data);
      return response.data as UserDto;
    } catch (error) {
      throw error;
    }
  };

  const LogOut = () => {
    localStorage.removeItem(Domain.localStorageName);
    window.location.assign('/signin');
  };

  const SetuserData = (userData: UserDto) => {
    localStorage.setItem(Domain.localStorageName, JSON.stringify(userData));
  };

  const GetUserData = (): UserDto | undefined => {
    const userData = localStorage.getItem(Domain.localStorageName);
    return userData ? JSON.parse(userData) : undefined;
  };

  const isAuth = (SuccessFn: () => void, FailFn?: () => void) => {
    isLoggedIn() ? SuccessFn() : FailFn ? FailFn() : null;
  };

  const GetAccessToken = () => {
    const userData = GetUserData();
    return userData ? userData.token : '';
  };

  const isLoggedIn = () => {
    const userData = localStorage.getItem(Domain.localStorageName);
    return userData ? true : false;
  };

  return {
    Login,
    SignUp,
    LogOut,
    GetUserData,
    isLoggedIn,
    GetAccessToken,
    isAuth,
    LoginGoogle,
  };
};

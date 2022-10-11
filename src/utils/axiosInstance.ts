import axios, {AxiosRequestConfig} from 'axios';
import {navigate} from '../utils/rootNavigator';
import authStorage from '../storages/authStorage';
import {store} from '../../App';
import {authorize, logout} from '../slices/auth';
import {NaverLogin} from '@react-native-seoul/naver-login';
import { ApiUrl } from './key';

const axiosInstance = axios.create({
  baseURL: ApiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // 'User-Agent': 'Web',
  },
});
axiosInstance.defaults.headers;

export const axiosInstance2 = axios.create({
  baseURL: ApiUrl,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
  return axiosInterceptor(request);
});

const axiosInterceptor = async (request: AxiosRequestConfig) => {
  // console.log('request - check :', request);
  const getAuthStorage = await authStorage.get();
  // console.log('current- token :', getAuthStorage?.accessToken);
  // console.log('QBQB :', JSON.stringify(request));
  // request.headers['access_token'] = process.env.REACT_APP_ACCESS_TOKEN;
  // async-storage로 대체
  // App 버전 CLO
  if (
    request.headers &&
    !request.url?.includes('sns/naverlogin') &&
    !request.url?.includes('sns/applelogin') &&
    !request.url?.includes('join/user') &&
    !request.url?.includes('token/refresh') &&
    !request.url?.includes('versions')
  ) {
    request.headers.Authorization = 'Bearer ' + getAuthStorage?.accessToken;
  } else {
    request.headers.Authorization = 'clo';
  }

  if (request.url?.includes('user/image/view')) {
    request.responseType = 'arraybuffer';
  }
 

  return request;
};

axiosInstance.interceptors.response.use(
  async response => {
    /**
     * const getUserState = store.getState().auth.user;
        authStorage.clear();
        logout();
        if (getUserState?.snsType === 'naver') {
          NaverLogin.logout();
        }
        store.dispatch(
          authorize({
            userName: getUserState.userName,
            userEmail: getUserState.userEmail,
            userPhone: getUserState.userPhone,
            isUnAuthorized: 'empty',
            snsType: getUserState.snsType,
            userSnsId: getUserState.userSnsId,
          }),
        );
     */
    return response;
  },
  error => {
    console.log('res-error :', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

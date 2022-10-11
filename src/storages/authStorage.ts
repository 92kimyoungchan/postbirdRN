import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshToken} from '../apis/refreshTokenApi';

const key = 'auth';
const key2 = 'storedEmail';
interface TokenInfo {
  accessToken: string;
  refreshToken: string;
}

const authStorage = {
  async get(located?: string) {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    try {
      const data: AuthResult = JSON.parse(rawData);
      if (located === 'isUnAuthorized') {
        console.log('located :', data.isUnAuthorized);
        return data.isUnAuthorized;
      } else if (located === 'accessToken') {
        const mutateTokenSet = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        return mutateTokenSet;
      } else if (located === 'viewAccessToken') {
        console.log('AuthStorage-info accessToken :', data.accessToken);
      }
      return data;
    } catch (e) {
      return null;
    }
  },
  async getEmail() {
    const rawData = await AsyncStorage.getItem(key2);
    if (!rawData) {
      return null;
    }
    try {
      const data: AuthResult = JSON.parse(rawData);
      console.log('auth-in-getEmail :', data.userEmail);
      return data.userEmail;
    } catch (e) {
      return null;
    }
  },
  set(authResult: AuthResult) {
    return AsyncStorage.setItem(key, JSON.stringify(authResult));
  },
  clear() {
    const callClearFunction = async () => {
      const rawData = await AsyncStorage.getItem(key);
      if (!rawData) {
        return null;
      }
      const authResult: AuthResult = JSON.parse(rawData);

      const DummyArr: AuthResult = {
        accessToken: '',
        refreshToken: '',
        externalStoragePermissions: authResult.externalStoragePermissions,
        cameraPermissions: authResult.cameraPermissions,
        userName: '',
        userEmail: '',
        userPhone: '',
        snsType: '',
        isUnAuthorized: 'empty',
        userSnsId: '',
      };
      return AsyncStorage.setItem(key, JSON.stringify(DummyArr));
    };
    callClearFunction();
  },
  async setUnAuth() {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    const authResult: AuthResult = JSON.parse(rawData);
    const authResultArr = {
      ...authResult,
      isUnAuthorized: 'unAuthorized',
    };
    AsyncStorage.setItem(key, JSON.stringify(authResultArr));

    return authResult;
  },
  async setToken(tokenInfo: TokenInfo) {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    const authResult: AuthResult = JSON.parse(rawData);
    const authResultArr = {
      ...authResult,
      accessToken: tokenInfo.accessToken,
      refreshToken: tokenInfo.refreshToken,
    };
    return AsyncStorage.setItem(key, JSON.stringify(authResultArr));
  },
  async clearToken() {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    try {
      const prevData = JSON.parse(rawData);
      const mutateArr = {...prevData, accessToken: '', refreshToken: ''};
      AsyncStorage.setItem(key, JSON.stringify(mutateArr));
    } catch (e) {
      return null;
    }
  },
};

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  externalStoragePermissions: boolean;
  cameraPermissions: boolean;
  userName: string;
  userEmail: string;
  userPhone: string;
  isUnAuthorized: string;
  snsType: string;
  userSnsId: string;
}

export default authStorage;

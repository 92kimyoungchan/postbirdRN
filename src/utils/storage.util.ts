import AsyncStorage from "@react-native-async-storage/async-storage";

// 로컬 스토리지 항목
interface LOCAL_STORAGE_PROPS {
  key:
    | "LANGUAGE"
    | "SETTING"
    | "TOKEN"
}

export const setData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // error
  }
};

export const getData = async (key: LOCAL_STORAGE_PROPS["key"]) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (e) {
    // error
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error
  }
};

const LOCAL_STORAGE = [
  "LANGUAGE",
  "TOKEN",
  "SETTING",
];

export const removeAllData = async () => {
  try {
    for (const i of LOCAL_STORAGE) {
      AsyncStorage.removeItem(i);
    }
  } catch (e) {
    // error
  }
};

export const PAYPAL_KEY = __DEV__ ? "d64aa1c6-f691-4f00-a31e-bedf12173c8f" : "e3e418b5-6ad7-4762-afc9-3e719f96b775";

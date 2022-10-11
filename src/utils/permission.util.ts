import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";

interface Permission {
  type: "alarm" | "camera" | "location" | "picture";
}

const requestPermission = async (
  data: {
    alarm?: boolean;
    camera?: boolean;
    location?: boolean;
    picture?: boolean;
  },
  type: "request" | "check" = "request",
) => {
  const formatData: string[] = [];
  (Object.keys(data) as Permission["type"][]).forEach((el) => {
    if (data[el]) {
      formatData.push(el);
    }
  });

  if (Platform.OS === "android") {
    // 위치 권한 검사
    if (formatData.indexOf("location") !== -1) {
      let location = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (location === RESULTS.DENIED) {
        location = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }
    }

    // 갤러리 권한 검사
    if (formatData.indexOf("picture") !== -1) {
      let gallery = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (gallery === RESULTS.DENIED) {
        gallery = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
    }

    // 카메라 권한 검사
    if (formatData.indexOf("camera") !== -1) {
      let camera = await check(PERMISSIONS.ANDROID.CAMERA);
      if (camera === RESULTS.DENIED) {
        camera = await request(PERMISSIONS.ANDROID.CAMERA);
      } else if (type === "check" && camera === RESULTS.BLOCKED) {
        return false;
      }
    }
  } else {
    // 위치 권한 검사
    if (formatData.indexOf("location") !== -1) {
      let location = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (location === RESULTS.DENIED) {
        location = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      }
    }

    // 갤러리 권한 검사
    if (formatData.indexOf("picture") !== -1) {
      let gallery = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (gallery === RESULTS.DENIED) {
        gallery = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
    }

    // 카메라 권한 검사
    if (formatData.indexOf("camera") !== -1) {
      let camera = await check(PERMISSIONS.IOS.CAMERA);
      if (camera === RESULTS.DENIED) {
        camera = await request(PERMISSIONS.IOS.CAMERA);
      } else if (type === "check" && camera === RESULTS.BLOCKED) {
        return false;
      }
    }
  }



export const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();

  return deviceId;
};



export default requestPermission;

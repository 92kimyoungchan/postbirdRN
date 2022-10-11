import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Button, StatusBar} from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    } from '@react-native-google-signin/google-signin';

const title = '리폼 상점선택'

export default function Auth() {
    useEffect(() => {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          webClientId:
            '352955301087-16dfmgshibbf3e0si0o2o7403ud0o662.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
          offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
      }, []);
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfoFata, setUserInfoData] = useState([]);
    /**
    const [userGoogleInfo, setUserGoogleInfo] = useState<authUser>(Object);
    const [loaded, setLoaded] = useState(false);
     */
      const getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          setUserInfoData({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // user has not signed in yet
          } else {
            // some other error
          }
        }
      };
      const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setUserInfoData({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };
      const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
          } catch (error) {
            console.error(error);
          }
      }
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>

        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />
          </View>
          <View style={styles.buttonContainer}>
            {!loggedIn && <Text>You are currently logged out</Text>}
            {loggedIn && (
              <Button
                onPress={signOut}
                title="LogOut"
                color="red"></Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  )
}
const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  text: {fontSize: 20},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  buttonContainer: {

  },
  sectionContainer: {

  },
  body: {

  },
  scrollView: {

  }
})
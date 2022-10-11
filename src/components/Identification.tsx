import React, {useCallback, useEffect, useState} from 'react'
import type {FC} from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, Button, StatusBar, TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    } from '@react-native-google-signin/google-signin';
import * as D from '../data'


 
export type IdentificationProps = {
  onNavigate: any
};

const Identification: FC<IdentificationProps> = ({
    onNavigate,
    ...props
}) => {

useEffect(() => {
  auth().onAuthStateChanged(onAuthStateChanged);
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId:
      '352955301087-16dfmgshibbf3e0si0o2o7403ud0o662.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
}, []);


  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfoData, setUserInfoData] = useState<D.IUser>({
    user: {
        id: '',
        name: null,
        email: '',
        photo: null,
        familyName: null,
        givenName: null,
    },
    idToken: null,
    serverAuthCode: null,
  });

    // Handle user state changes
    const onAuthStateChanged = (user: any) => {
      setUserInfoData(user);
      if (loggedIn) {
        setLoggedIn(false);
      }
    }
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      setUserInfoData(userInfo);
      setLoggedIn(true);
      
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      auth().signInWithCredential(googleCredential);
       onNavigate(await auth().currentUser.getIdTokenResult());
    } catch (error) {
      console.error('error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress alreadydfdd
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
        setLoggedIn(false);
        setUserInfoData({
            user: {
                id: '',
                name: null,
                email: '',
                photo: null,
                familyName: null,
                givenName: null,
            },
            idToken: null,
            serverAuthCode: null
        });
      } catch (error) {
        console.error(error);
      }
  }
 
  return (
    <>
    <TouchableOpacity activeOpacity={0.8} style={[styles.signButton, {marginBottom: 20}]} onPress={signIn}>
          <Image
            style={{width: 30, height: 30, position: 'absolute', left: 14}}
            source={require('../assets/images/google.png')}
          />
          <Text style={[styles.btnText]}>Google로 로그인</Text>
        </TouchableOpacity>
  </>
  )
}

const styles = StyleSheet.create({
    view: {flex: 1, padding: 5},
    text: {fontSize: 20},
    content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    buttonContainer: {
  
    },
    signButton: {
      borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ffffff',
    width: '100%',
    height: 54,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12, 
    },
    btnText: {
      fontFamily: 'applesdgothicneosb',
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: -0.18,
      textAlign: 'center',
      color: '#ffffff',
    },
    sectionContainer: {
  
    },
    body: {
  
    },
    scrollView: {
  
    }
})

export default Identification;

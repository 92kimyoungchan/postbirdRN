import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components/native';
import * as D from '../../data'
import Identification from '../../components/Identification';




export default function Login() {
  // navigation
  useEffect(() => {
  }, [])
  const [isUser, setUser] = useState<D.IUser>({
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
  const onNavigate = () => {
      
  }
  /**
  const goBack = useCallback(() => {
    navigation.navigate('')
  }, []);
   */
  return (
    <View style={[styles.view]}>
      <Identification onNavigate={undefined} />
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1, 
    backgroundColor: 'rgb(236,243,249)',
    paddingBottom: 48
  }
  
})

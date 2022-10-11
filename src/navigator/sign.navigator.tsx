import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import GateWay from './sign/GateWay'
import Nickname from './sign/Nickname'
import Notice from './sign/Notice'
import Bird from './sign/Bird'
import Post from '../sign/Post'

const Stack = createStackNavigator()

export default function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GateWay" component={GateWay} />
      <Stack.Screen name="Nickname" component={Nickname} />
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="Bird" component={Bird} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  )
}

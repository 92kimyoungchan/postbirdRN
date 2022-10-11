import React, {useCallback, useEffect, useRef} from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation, DrawerActions} from '@react-navigation/native'
// prettier-ignore
import {View, NavigationHeader, Text} from '../theme';
import type {LeftRightNavigationMethods} from '../components'
import {SvgXml} from 'react-native-svg';

const xml_bird = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <g data-name="그룹 9701">
        <path data-name="패스 21215" d="M22.815 13.2a29.484 29.484 0 0 0-3.773-2.5 32.43 32.43 0 0 0 .943-1.736l1.4-1.411a.755.755 0 0 0-.528-1.29h-1.929a2.483 2.483 0 0 0-1.472-.672c-1.245-.143-2.671.528-4.256 1.992a47.255 47.255 0 0 0-7.946-3.546.755.755 0 0 0-.8.2c-.128.128-3.064 3.32-2.415 6.958a7.4 7.4 0 0 0 3.773 4.935c-1.012.69-2.542 1.717-3.493 2.313a.755.755 0 0 0-.34.755c0 .1.521 2.437 4.158 4.309a.807.807 0 0 0 .377.113.755.755 0 0 0 .611-.317l3.575-4.966a6.2 6.2 0 0 0 1.509-.475 9.682 9.682 0 0 0 3.63.755c4.8 0 7.139-4.407 7.169-4.467a.755.755 0 0 0-.193-.95zm-12.527 3.63a.755.755 0 0 0-.634.317l-3.373 4.737a6.6 6.6 0 0 1-2.611-2.5c1.584-1.017 3.916-2.617 4.03-2.684a.756.756 0 0 0-.091-1.3c-2.4-1.215-3.773-2.709-4.113-4.46-.407-2.262 1.064-4.451 1.721-5.281a42.531 42.531 0 0 1 7.667 3.532.755.755 0 0 0 .928-.106c1.849-1.841 2.943-2.068 3.441-2a.989.989 0 0 1 .709.347.755.755 0 0 0 .626.34h.43l-.2.211a.528.528 0 0 0-.143.2c-4.282 8.532-8.334 8.645-8.387 8.645zm3.622 0a17.734 17.734 0 0 0 4.3-4.83 27.431 27.431 0 0 1 3.124 2.015 6.588 6.588 0 0 1-7.4 2.815z" transform="translate(-.523 -1.806)" style="fill:#8d8f91;stroke:#8d8f91"/>
    </g>
</svg>
`;
const xml_setting = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
    <g data-name="Icon Setting">
        <path data-name="패스 108" d="m16.94 6.623 1.4-2.675-1.782-1.783-2.675 1.4a4.563 4.563 0 0 0-1.4-.509L11.463 0H8.916L7.9 2.929a5.323 5.323 0 0 0-1.274.509l-2.675-1.4-1.913 1.91 1.4 2.675A5.323 5.323 0 0 0 2.929 7.9L0 8.916v2.547l2.929 1.019c.127.509.382.892.509 1.4l-1.4 2.675 1.783 1.783 2.679-1.4a4.563 4.563 0 0 0 1.4.509l1.019 2.929h2.547l1.019-2.929c.509-.127.892-.382 1.4-.509l2.675 1.4 1.783-1.783-1.4-2.675a4.563 4.563 0 0 0 .509-1.4l2.929-1.019V8.916L17.449 7.9a5.323 5.323 0 0 0-.509-1.277zm-6.751 7.387a3.753 3.753 0 0 1-3.821-3.821 3.753 3.753 0 0 1 3.821-3.821 3.753 3.753 0 0 1 3.821 3.821 3.753 3.753 0 0 1-3.821 3.821z" transform="translate(1.811 1.811)" style="fill:#8d8f91"/>
    </g>
</svg>
`;

export default function Setting() {
  // navigation
  const navigation = useNavigation()
  const goLeft = useCallback(() => navigation.navigate('Setting'), [])
  const goRight = useCallback(() => navigation.navigate('Bird'), []);
  const open = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [])


  const leftRef = useRef<LeftRightNavigationMethods | null>(null)
  useEffect(() => {}, []);
  return (
    <View style={[styles.view]}>
      <NavigationHeader
        title="설정"
        Left={() => (
          <TouchableOpacity onPress={open}>
            <SvgXml style={[styles.menuIcon]} xml={xml_setting} />
          </TouchableOpacity>
        )}
        Right={() => (
          <TouchableOpacity onPress={goRight}>
            <SvgXml style={[styles.menuIcon]} xml={xml_bird} />
          </TouchableOpacity>
        )}
      />
      <Text>Setting</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  view: {flex: 1},
  menuIcon: {
    width: 24,
    height: 24,
  }
})

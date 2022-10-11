import React, {useCallback} from 'react';
import type {FC, ComponentProps, ReactNode} from 'react';
import {View as RNView, StyleSheet, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableView} from './TouchableView';

export type TextWrapProps = ComponentProps<typeof RNView> & {
  isSelected?: boolean;
  routeUrl: string;
  children?: ReactNode;
};

export const TextWrap: FC<TextWrapProps> = ({
  style,
  isSelected,
  routeUrl,
  children,
  ...props
}) => {
  const navigation = useNavigation();
  const backgroundColor = isSelected ? 'rgb(236, 243, 249)' : 'transparent';
  const borderRadius = isSelected ? 24 : 0;
  const onPress = useCallback(() => {
    if (isSelected) {
      navigation.navigate(routeUrl);
    } else if (routeUrl === 'Reform') {
      navigation.navigate('ReformNavigator', {screen: 'Reform'});
    } else if (routeUrl === 'Mending') {
      // navigation.navigate('MendingNavigator', {screen: 'Mending'});
      Alert.alert('알림', '준비중입니다.');
    }
  }, []);
  return (
    <>
      <RNView
        style={[{backgroundColor, borderRadius}, style, styles.view]}
        {...props}>
        <TouchableView onPress={onPress} style={[styles.touchable]}>
          {children}
        </TouchableView>
      </RNView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  touchable: {
    padding: 0,
  },
});

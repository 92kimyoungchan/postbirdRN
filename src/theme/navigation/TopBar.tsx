import React, {useEffect} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Switch} from './Switch';
import {View} from './View';
import styled from 'styled-components/native';
import type {ViewProps} from './View';

const Section = styled.View`
  margin-top: 32px;
  padding: 24px;
  background-color: ${(props: theme) => props.theme.colors.secondaryColorBlue};
  background: ${props => (props.theme === 'DefaultTheme' ? 'yellow' : 'black')};
`;
export type TopBarProps = ViewProps & {
  noSwitch?: boolean;
};

export const TopBar: FC<TopBarProps> = ({
  noSwitch,
  children,
  style,
  ...props
}) => {
  const {colors, dark} = useTheme();
  console.log('dark in TopBar :', dark);
  return (
    <View
      card={!dark}
      primary={dark}
      style={[styles.topBar, style, {backgroundColor: colors.anaki}]}
      {...props}>
      {children}
      <View style={[styles.flex]} />
      {!noSwitch && <Switch />}
    </View>
  );
};
const styles = StyleSheet.create({
  topBar: {flexDirection: 'row', padding: 5, alignItems: 'center'},
  flex: {flex: 1},
});

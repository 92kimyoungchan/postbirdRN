import React, {useEffect, useState} from 'react';
import type {FC, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from './navigation';
import type {StyleProp, ViewStyle, TextStyle} from 'react-native';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {wp} from '../utils/ui';

const wrapperHeight = Dimensions.get('window').height + 'px';

const calculatedWidth = Dimensions.get('window').width - 100 + 'px';
export type NavigationHeaderProps = {
  title?: string;
  Left?: () => ReactNode;
  Right?: () => ReactNode;
  isParentTitle?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isColorful?: boolean;
};
const HeaderComponent = styled.View`
  width: 100%;
  height: ${wp(56)}px;
  padding-horizontal: ${wp(25)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.isColorful ? 'rgba(16,16,16, 0.6)' : '#ecf3f9'};
`;
const Title = styled.View`
  font-size: ${wp(16)}px;
  text-align: center;
  font-family: Pretendard-Bold;
  line-height: ${wp(20)}px;
  color: #101010;
  background-color: transparent;
  width: ${props => props.calculatedWidth};
  left: ${wp(50)}px;
  position: absolute;
`;
export const NavigationHeader: FC<NavigationHeaderProps> = ({
  title,
  Left,
  Right,
  isParentTitle,
  viewStyle,
  titleStyle,
  isColorful,
}) => {
  return (
    <HeaderComponent isColorful={isColorful}>
      {Left && Left()}
      {title !== '' && (
        <Title calculatedWidth={calculatedWidth}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </Title>
      )}
      {Right && Right()}
    </HeaderComponent>
  );
};
const styles = StyleSheet.create({
  view: {},
  title: {
    fontSize: wp(20),
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    lineHeight: wp(24),
    color: '#101010',
  },
  flex: {
    backgroundColor: 'transparent',
    width: 'calc(100% - 50)',
    position: 'absolute',
    left: wp(25),
  },
});

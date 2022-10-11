import React from 'react';
import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {Dimensions} from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width) + 'px';
const screenHeight = Math.round(Dimensions.get('window').width) + 30 + 'px';
interface IPage {
  item: {id: string; source: string};
  style: ViewStyle;
}

const PageItem = styled.View`
  background-color: red;
  max-width: ${screenWidth};
    max-height: ${screenWidth};
`;

const CarouseImage = styled.Image`
    max-width: ${screenWidth};
    max-height: ${screenWidth};
    background-color: purple;
`;

export default function Page({item, style}: IPage) {
  return (
    <PageItem style={style}>
      <CarouseImage source={item.source}></CarouseImage>
    </PageItem>
  );
}
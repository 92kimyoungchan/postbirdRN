import {DefaultTheme} from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  colors: {
    background: 'rgb(28, 28, 30)',
    border: 'rgb(28, 28, 30)',
    card: 'rgb(28, 28, 30)',
    notification: 'rgb(255, 59, 48)',
    primary: 'rgb(0, 122, 255)',
    text: 'rgb(255, 255, 255)',
    youndo: 'rgb(141,255,255)',
    anaki: 'rgb(101,135,262)',
  },
  dark: true,
};

const lightTheme = {
  ...DefaultTheme,
  colors: {
    background: 'rgb(242, 242, 242)',
    border: 'rgb(216, 216, 216)',
    card: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 59, 48)',
    primary: 'rgb(0, 122, 255)',
    text: 'rgb(28, 28, 30)',
    youndo: 'rgb(141,255,141)',
    anaki: 'rgb(244,28,281)',
  },
  dark: false,
};

export {darkTheme, lightTheme};

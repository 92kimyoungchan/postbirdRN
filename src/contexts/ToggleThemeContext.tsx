import React, {createContext, useContext} from 'react';
import type {FC} from 'react';

export type ToggleThemeContextType = {
  toggleTheme: () => void;
  theme: {
    colors: {
      background: string;
      border: string;
      card: string;
      notification: string;
      primary: string;
      text: string;
      youndo: string;
      anaki: string;
    };
    dark: boolean;
  };
};

const defaultToggleThemeContext = {
  toggleTheme: () => {},
  theme: {
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
  },
};
const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext,
);

type ToggleThemeContextProps = {
  toggleTheme: () => void;
  theme: {
    colors: {
      background: string;
      border: string;
      card: string;
      notification: string;
      primary: string;
      text: string;
      youndo: string;
      anaki: string;
    };
    dark: boolean;
  };
};
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme,
  theme,
}) => {
  const value = {
    toggleTheme,
    theme,
  };
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};

export const useToggleTheme = (currentTheme: boolean) => {
  console.log('현재 테마 :', currentTheme);
  console.log('토글테마 실행');
  const {toggleTheme} = useContext(ToggleThemeContext);
  return toggleTheme;
};

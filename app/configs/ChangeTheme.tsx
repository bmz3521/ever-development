import {Colors} from 'app/configs';
import React, {useContext} from 'react';
import {ColorValue} from 'react-native';

export type TMode = 'dark' | 'light';

export interface ITheme {
  background: ColorValue | string;
  backgroundItem: ColorValue | string;
  text: ColorValue | string;
  text_placeholder: ColorValue | string;
  placeholder: ColorValue | string;
  borderColor: ColorValue | string;
  activeBackgroundColor: ColorValue | string;
  inactiveBackgroundColor: ColorValue | string;
  activeTincolor: ColorValue | string;
}
export interface IThemeContext {
  theme: ITheme;
  toggleTheme: () => void;
}

export const themes = {
  dark: {
    background: Colors.Dark,
    backgroundItem: Colors.Beluga,
    text: '#000',
    text_placeholder: '#5f5f5f',
    activeBackgroundColor: Colors.TealBlue,
    activeTincolor: Colors.WhiteSmoke,
    inactiveBackgroundColor: Colors.Platinum,
    borderColor: Colors.BorderColor,
  },
  light: {
    background: Colors.Snow,
    backgroundItem: Colors.White,
    text: Colors.DarkJungleGreen,
    text_placeholder: Colors.Platinum,
    activeTincolor: Colors.Dark,
    inactiveBackgroundColor: Colors.DarkJungleGreen,
    activeBackgroundColor: Colors.TealBlue,
    borderColor: Colors.Platinum,
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = (): IThemeContext => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return {
    theme,
    toggleTheme,
  };
};

/* eslint-disable react-hooks/rules-of-hooks */
import React, {createContext, useContext, useState} from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {darkTheme, lightTheme, IAccentColor} from '../../lib/colors';

const defaultTheme = {
  $theme: lightTheme(),
  $mode: 'green',
  $bg: () => ({}),
  $color: () => ({}),
  $scheme: 'light' as ColorSchemeName,
  $toggleColorScheme: (_: ColorSchemeName) => {},
  $toggleTheme: (_: IAccentColor) => {},
};

export type ThemeContextValue = typeof defaultTheme;
export const ThemeContext = createContext(defaultTheme);

export const ThemeProvider: React.FC<{children: JSX.Element}> = ({
  children,
}) => {
  const [$scheme, setScheme] = useState(useColorScheme());
  const [$mode, setMode] = useState<IAccentColor>('green');

  const [$theme, setTheme] = useState(() =>
    $scheme === 'light' ? lightTheme() : darkTheme(),
  );

  function $toggleTheme(mode: IAccentColor) {
    setTheme(() => ($scheme === 'light' ? lightTheme(mode) : darkTheme(mode)));
    setMode(() => mode);
  }

  function $toggleColorScheme(scheme: ColorSchemeName) {
    setTheme(() => (scheme === 'light' ? lightTheme($mode) : darkTheme($mode)));
    setScheme(() => scheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        $mode,
        $theme,
        $scheme,
        $bg: () => ({backgroundColor: $theme.bgColor}),
        $color: () => ({color: $theme.color}),
        $toggleColorScheme,
        $toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function ThemeInjector<P>(Component: React.FC<P & ThemeContextValue>) {
  return (props => {
    const context = useContext(ThemeContext);
    return <Component {...context} {...props} />;
  }) as React.FC<P>;
}

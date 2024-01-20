export const accents = {
  yellow: '#FBBF24',
  green: '#0DD138',
  blue: '#2E43FF',
  red: '#FD0D0D',
};

export const pyColors = {
  RUBBISH_BLUE: '#C2BDFD',
};

export type Content = 'dark-content' | 'light-content';
export type IAccentColor = keyof typeof accents;

export const darkTheme = (color: IAccentColor = 'green') => ({
  status: 'light-content' as Content,
  accent: accents[color],
  textColor: '#E5E5E5',
  bgColor: '#12121F',
  color: '#FFFFFF',
  colorV2: '#E5E5E5',
  grey50: '#5A6274',
  grey70: '#8B8989',
  grey100: '#1D2429',
  grey200: '#12121F',
  grey300: '#1C1D2439',
  grey400: '#1E1F3A',
  grey500: '#000000',
  accentOrange: '#FBF0D9',
});

export const lightTheme = (color: IAccentColor = 'green') => ({
  status: 'dark-content' as Content,
  accent: accents[color],
  color: '#000000',
  colorV2: '#12121F',
  textColor: '#12121F',
  grey50: '#5A6274',
  bgColor: '#FFFFFF',
  grey70: '#8B8989',
  grey100: '#B8BABF',
  grey200: '#E5E5E5',
  grey300: '#E0E4F5',
  grey400: '#F4F5FA',
  grey500: '#ffffff',
  accentOrange: '#FBF0D9',
});

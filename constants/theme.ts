type ThemeColors = {
   success: any;
   error: any;
   primary: string;
   primaryDark: string;
   dark: string;
   darkLight: string;
   gray: string;
   text: string;
   textLight: string;
   textDark: string;
   rose: string;
   roseLight: string;
   disabled: string;
}

export const theme = {
   colors: {
      primary: '#FFFF01',
      primaryDark: '#00AC62',
      dark: '#3E3E3E',
      darkLight: '#E1E1E1',
      gray: '#E3E3E3',
      text: '#494949',
      textLight: '#7C7C7C',
      textDark: '#1D1D1D',
      rose: '#ef4444',
      roseLight: '#f87171',
      disabled: '#CCCCCC',
   } as ThemeColors,
   fonts: {
      medium: '500',
      semibold: '600',
      bold: '700',
      extraBold: '800',
   },
   radius: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 22,
   },
};
export const lightTheme = {
   colors: {
      primary: '#FFE600',
      primaryDark: '#E6CF00',
      background: '#FFFFFF',
      text: '#333333',
      textDark: '#000000',
      textLight: '#666666',
      gray: '#E5E5E5',
      error: '#FF3B30',
      success: '#34C759',
      card: 'rgba(255, 255, 255, 0.95)',
      cardBorder: 'rgba(255, 255, 255, 0.2)',
   },
   fonts: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
   },
   radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      xxl: 24,
   },
};

export const darkTheme = {
   ...lightTheme,
   colors: {
      ...lightTheme.colors,
      primary: '#FFE600',
      primaryDark: '#FFED4D',
      background: '#000000',
      text: '#DDDDDD',
      textDark: '#FFFFFF',
      textLight: '#999999',
      gray: '#333333',
      card: 'rgba(30, 30, 30, 0.95)',
      cardBorder: 'rgba(255, 255, 255, 0.1)',
   },
};

export const getTheme = (isDark: boolean) => isDark ? darkTheme : lightTheme;
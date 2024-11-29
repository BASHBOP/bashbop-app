import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import React, { ReactNode } from 'react';

interface ScreenWrapperProps {
  children?: ReactNode;
  bg?: string;
}

const ScreenWrapper = ({ children, bg }: ScreenWrapperProps) => {

  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top+5 : 30;
  return (
    <View style={{ flex: 1, paddingTop, backgroundColor: bg }}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Camera, BarcodeScanningResult, CameraView } from 'expo-camera';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useTheme } from '@/context/ThemeContext';
import { getTheme } from '@/constants/theme';

function Scanner(): JSX.Element {
  const router = useRouter();
  const { isDark } = useTheme();
  const theme = getTheme(isDark);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push({
      pathname: '/scanner/result',
      params: { code: data }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scanner: {
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    permission: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    permissionText: {
      color: theme.colors.text,
      textAlign: 'center',
      fontSize: 16,
    }
  });

  if (hasPermission === null) {
    return (
      <ScreenWrapper>
        <View style={styles.permission}>
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (hasPermission === false) {
    return (
      <ScreenWrapper>
        <View style={styles.permission}>
          <Text style={styles.permissionText}>No access to camera</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CameraView
          style={styles.scanner}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'aztec'],
          }}
        />
        {scanned && (
          <View style={styles.overlay}>
            <Text style={[styles.permissionText, { color: theme.colors.textLight }]}>
              Tap to scan again
            </Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}

export default Scanner; 
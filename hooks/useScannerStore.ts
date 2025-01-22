import { create } from 'zustand';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface ScannerStore {
   hasPermission: boolean | null;
   scanned: boolean;
   handleScan: (data: string) => void;
   resetScanner: () => void;
   requestPermissions: () => Promise<void>;
}

export const useScannerStore = create<ScannerStore>((set) => ({
   hasPermission: null,
   scanned: false,
   handleScan: (data: string) => {
      set({ scanned: true });
      // Handle the scan data here
      console.log('Scanned:', data);
   },
   resetScanner: () => {
      set({ scanned: false });
   },
   requestPermissions: async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      set({ hasPermission: status === 'granted' });
   },
})); 
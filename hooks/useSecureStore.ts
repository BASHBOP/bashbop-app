import * as SecureStore from 'expo-secure-store';

const useSecureStore = {
   async setItem(key: string, value: string) {
      try {
         await SecureStore.setItemAsync(key, value);
      } catch (error) {
         console.error('Error saving to secure store:', error);
      }
   },

   async getItem(key: string): Promise<string | null> {
      try {
         return await SecureStore.getItemAsync(key);
      } catch (error) {
         console.error('Error reading from secure store:', error);
         return null;
      }
   },

   async removeItem(key: string) {
      try {
         await SecureStore.deleteItemAsync(key);
      } catch (error) {
         console.error('Error removing from secure store:', error);
      }
   },
};

export default useSecureStore; 
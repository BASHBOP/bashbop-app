import { Platform } from 'react-native';
import SecureStore from '@/hooks/useSecureStore';
import { mockGet, mockPost, mockPut, mockDelete } from './mockClient';
import Constants from 'expo-constants';

const API_URL = 'https://api.bashbop.com';
const IS_DEVELOPMENT = Constants.expoConfig?.extra?.isDevelopment || __DEV__;

export interface ApiResponse<T> {
   data?: T;
   error?: {
      message: string;
      code: string;
   };
}

export class ApiError extends Error {
   code: string;
   constructor(message: string, code: string) {
      super(message);
      this.code = code;
      this.name = 'ApiError';
   }
}

async function getHeaders(): Promise<HeadersInit> {
   const token = await SecureStore.getItem('token');
   return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': `BashbopApp/${Platform.OS}`,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
   };
}

async function handleResponse<T>(response: Response): Promise<T> {
   const contentType = response.headers.get('content-type');
   const isJson = contentType?.includes('application/json');
   const data = isJson ? await response.json() : await response.text();

   if (!response.ok) {
      const error = isJson ? data.error : { message: data, code: 'UNKNOWN_ERROR' };
      throw new ApiError(error.message, error.code);
   }

   return data as T;
}

export async function get<T>(endpoint: string): Promise<T> {
   if (IS_DEVELOPMENT) {
      return mockGet<T>(endpoint);
   }

   const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: await getHeaders(),
   });
   return handleResponse<T>(response);
}

export async function post<T>(endpoint: string, body: any): Promise<T> {
   if (IS_DEVELOPMENT) {
      return mockPost<T>(endpoint, body);
   }

   const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(body),
   });
   return handleResponse<T>(response);
}

export async function put<T>(endpoint: string, body: any): Promise<T> {
   if (IS_DEVELOPMENT) {
      return mockPut<T>(endpoint, body);
   }

   const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(body),
   });
   return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<T> {
   if (IS_DEVELOPMENT) {
      return mockDelete<T>(endpoint);
   }

   const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: await getHeaders(),
   });
   return handleResponse<T>(response);
} 
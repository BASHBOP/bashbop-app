import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:9999'; // Use environment variable or fallback to localhost
const URL = `${BASE_URL}/api/v1`;

interface LoginResponse {
   token: string;
   user: {
      id: string;
      email: string;
      name: string;
   };
}

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

const handleResponse = (response: any) => ({ data: response.data, error: null });

const handleError = (error: any) => {
   console.error('API error:', error);
   return axios.isAxiosError(error) ? { data: null, error: error.response ? error.response.data : error.message } : { data: null, error };
};

export const login = async (email: string, password: string) => {
   try {
      const response = await axiosInstance.post<LoginResponse>(`${URL}/auth/login`, { email, password });
      console.table([response.data]);
      return handleResponse(response);
   } catch (error) {
      return handleError(error);
   }
};

export const signUp = async (name: string, email: string, password: string) => {
   try {
      const response = await axiosInstance.post(`${URL}/auth/register`, { email, password, name });
      console.table([response.data]);
      return handleResponse(response);
   } catch (error) {
      return handleError(error);
   }
};
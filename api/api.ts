import axios from 'axios';

const BASE_URL = 'http://192.168.0.245:9999'; // Replace with your API base URL
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

export const login = async (email: string, password: string) => {
   try {
      const response = await axiosInstance.post<LoginResponse>(`/api/v1/auth/login`, { email, password });

      console.table([response.data]);
      return { data: response.data, error: null };
   } catch (error) {
      console.error('Login error:', error);
      return axios.isAxiosError(error) ? { data: null, error: error.response ? error.response.data : error.message } : { data: null, error };
   }
};

export const signUp = async (name: string, email: string, password: string) => {
   try {
      const response = await axiosInstance.post(`${URL}/auth/register`, { email, password, name });
      console.table([response.data]);
      return { data: response.data, error: null };
   } catch (error) {
      return axios.isAxiosError(error) ? { data: null, error: error.response ? error.response.data : error.message } : { data: null, error };
   }
};

import { axiosInstance } from './api';

export interface Event {
   id: string;
   title: string;
   description: string;
   date: string;
   location: string;
   capacity: number;
   ticketsSold: number;
   status: 'upcoming' | 'ongoing' | 'completed';
   imageUrl?: string;
}

export const getEvents = async () => {
   try {
      const response = await axiosInstance.get('/events');
      return { data: response.data, error: null };
   } catch (error) {
      return { data: null, error };
   }
};

export const getEventById = async (id: string) => {
   try {
      const response = await axiosInstance.get(`/events/${id}`);
      return { data: response.data, error: null };
   } catch (error) {
      return { data: null, error };
   }
}; 
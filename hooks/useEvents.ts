import { useState, useEffect, useCallback } from 'react';
import { Event, getEvents } from '@/api/api';
import { ApiError } from '@/api/client';

export const useEvents = () => {
   const [events, setEvents] = useState<Event[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const fetchEvents = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);
         const data = await getEvents();
         setEvents(data);
      } catch (err) {
         const message = err instanceof ApiError
            ? err.message
            : 'An error occurred while fetching events';
         setError(message);
         console.error('Error fetching events:', err);
      } finally {
         setLoading(false);
      }
   }, []);

   const refetch = useCallback(() => {
      return fetchEvents();
   }, [fetchEvents]);

   useEffect(() => {
      fetchEvents();
   }, [fetchEvents]);

   return {
      events,
      loading,
      error,
      refetch,
   };
}; 
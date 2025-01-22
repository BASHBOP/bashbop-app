import * as client from './client';

// Auth Types
export interface LoginCredentials {
   email: string;
   password: string;
}

export interface SignUpCredentials extends LoginCredentials {
   name: string;
}

export interface User {
   id: string;
   name: string;
   email: string;
   avatar_url?: string;
   created_at: string;
}

export interface AuthResponse {
   token: string;
   user: User;
}

// Event Types
export interface Event {
   id: string;
   name: string;
   description: string;
   date: string;
   location: string;
   price: number;
   category: 'music' | 'sports' | 'arts' | 'tech';
   tickets_available: boolean;
   image_url: string;
   organizer_id: string;
   created_at: string;
   updated_at: string;
}

export interface Ticket {
   id: string;
   event_id: string;
   user_id: string;
   qr_code: string;
   status: 'valid' | 'used' | 'cancelled';
   created_at: string;
}

// Auth Endpoints
export const login = (credentials: LoginCredentials) =>
   client.post<AuthResponse>('/auth/login', credentials);

export const signUp = (credentials: SignUpCredentials) =>
   client.post<AuthResponse>('/auth/signup', credentials);

export const logout = () =>
   client.post<void>('/auth/logout', {});

// Event Endpoints
export const getEvents = () =>
   client.get<Event[]>('/events');

export const getEvent = (id: string) =>
   client.get<Event>(`/events/${id}`);

export const createEvent = (event: Omit<Event, 'id' | 'organizer_id' | 'created_at' | 'updated_at'>) =>
   client.post<Event>('/events', event);

export const updateEvent = (id: string, event: Partial<Event>) =>
   client.put<Event>(`/events/${id}`, event);

export const deleteEvent = (id: string) =>
   client.del<void>(`/events/${id}`);

// Ticket Endpoints
export const getTickets = (eventId: string) =>
   client.get<Ticket[]>(`/events/${eventId}/tickets`);

export const purchaseTicket = (eventId: string) =>
   client.post<Ticket>(`/events/${eventId}/tickets`, {});

export const validateTicket = (eventId: string, ticketId: string) =>
   client.post<{ valid: boolean, message: string }>(`/events/${eventId}/tickets/${ticketId}/validate`, {});

// User Endpoints
export const getCurrentUser = () =>
   client.get<User>('/user');

export const updateUser = (data: Partial<User>) =>
   client.put<User>('/user', data);

export const getUserEvents = () =>
   client.get<Event[]>('/user/events');

export const getUserTickets = () =>
   client.get<(Ticket & { event: Event })[]>('/user/tickets'); 
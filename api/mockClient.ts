import { Event, User, Ticket } from './api';

// Mock Data
const mockUsers: User[] = [
   {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      created_at: new Date().toISOString(),
   },
];

const mockEvents: Event[] = [
   {
      id: '1',
      name: 'Summer Music Festival',
      description: 'A fantastic summer music festival with top artists',
      date: '2024-07-15T18:00:00Z',
      location: 'Central Park, NY',
      price: 99.99,
      category: 'music',
      tickets_available: true,
      image_url: 'https://picsum.photos/400/300',
      organizer_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
   },
   {
      id: '2',
      name: 'Tech Conference 2024',
      description: 'Annual technology conference with industry leaders',
      date: '2024-08-20T09:00:00Z',
      location: 'Convention Center, SF',
      price: 299.99,
      category: 'tech',
      tickets_available: true,
      image_url: 'https://picsum.photos/400/300',
      organizer_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
   },
   {
      id: '3',
      name: 'Basketball Championship',
      description: 'Final game of the season',
      date: '2024-06-30T20:00:00Z',
      location: 'Sports Arena, LA',
      price: 149.99,
      category: 'sports',
      tickets_available: false,
      image_url: 'https://picsum.photos/400/300',
      organizer_id: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
   },
];

const mockTickets: Ticket[] = [
   {
      id: '1',
      event_id: '1',
      user_id: '1',
      qr_code: 'mock-qr-code-1',
      status: 'valid',
      created_at: new Date().toISOString(),
   },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export async function mockGet<T>(endpoint: string): Promise<T> {
   await delay(500); // Simulate network delay

   switch (endpoint) {
      case '/events':
         return mockEvents as T;
      case '/user':
         return mockUsers[0] as T;
      case '/user/tickets':
         return mockTickets as T;
      default:
         if (endpoint.startsWith('/events/')) {
            const eventId = endpoint.split('/')[2];
            const event = mockEvents.find(e => e.id === eventId);
            if (!event) throw new Error('Event not found');
            return event as T;
         }
         throw new Error('Not implemented');
   }
}

export async function mockPost<T>(endpoint: string, body: any): Promise<T> {
   await delay(500);

   switch (endpoint) {
      case '/auth/login':
         if (body.email === 'test@example.com' && body.password === 'password') {
            return {
               token: 'mock-token',
               user: mockUsers[0],
            } as T;
         }
         throw new Error('Invalid credentials');

      case '/auth/signup':
         return {
            token: 'mock-token',
            user: {
               id: '2',
               name: body.name,
               email: body.email,
               created_at: new Date().toISOString(),
            },
         } as T;

      default:
         throw new Error('Not implemented');
   }
}

export async function mockPut<T>(endpoint: string, body: any): Promise<T> {
   await delay(500);
   throw new Error('Not implemented');
}

export async function mockDelete<T>(endpoint: string): Promise<T> {
   await delay(500);
   throw new Error('Not implemented');
} 
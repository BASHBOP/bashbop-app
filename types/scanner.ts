export interface ScanResult {
   data: string;
   type: string;
   timestamp: string;
   status?: 'valid' | 'invalid' | 'used';
   message?: string;
}

export interface TicketValidationResponse {
   isValid: boolean;
   message: string;
   ticket?: {
      id: string;
      eventId: string;
      status: string;
      holderName: string;
   };
} 
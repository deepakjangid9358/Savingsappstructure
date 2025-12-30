import { apiRequest } from './apiClient';
import { ENDPOINTS } from './apiConfig';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  subject: string;
  description: string;
  category: string;
  priority?: 'low' | 'medium' | 'high';
}

// Get frequently asked questions
export const getFAQs = async (category?: string): Promise<FAQ[]> => {
  const result = await apiRequest<{ faqs: FAQ[] }>({
    method: 'GET',
    url: ENDPOINTS.SUPPORT.GET_FAQ,
    params: category ? { category } : undefined,
  });

  if (result.error) {
    // Return mock FAQs for development
    return getMockFAQs();
  }

  return result.data?.faqs || [];
};

// Create a support ticket
export const createSupportTicket = async (ticket: CreateTicketRequest): Promise<SupportTicket | null> => {
  const result = await apiRequest<SupportTicket>({
    method: 'POST',
    url: ENDPOINTS.SUPPORT.CREATE_TICKET,
    data: ticket,
  });

  if (result.error) {
    // Return mock ticket for development
    return {
      id: `TICK${Date.now()}`,
      subject: ticket.subject,
      description: ticket.description,
      category: ticket.category,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  return result.data;
};

// Get user's support tickets
export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  const result = await apiRequest<{ tickets: SupportTicket[] }>({
    method: 'GET',
    url: ENDPOINTS.SUPPORT.GET_TICKETS,
  });

  if (result.error) {
    // Return empty array for development
    return [];
  }

  return result.data?.tickets || [];
};

// Mock FAQs for development
const getMockFAQs = (): FAQ[] => {
  return [
    {
      id: '1',
      question: 'How do I add money to my wallet?',
      answer: 'You can add money to your wallet using UPI, Net Banking, Debit Card, or Credit Card. Go to the Wallet section and click on "Add Money".',
      category: 'Wallet',
    },
    {
      id: '2',
      question: 'How long does it take to withdraw money?',
      answer: 'Withdrawals are typically processed within 1-3 business days. The exact time may vary depending on your bank.',
      category: 'Wallet',
    },
    {
      id: '3',
      question: 'What documents are required for KYC verification?',
      answer: 'You need to provide your PAN card and Aadhaar card for KYC verification. The verification process is usually completed within 24 hours.',
      category: 'KYC',
    },
    {
      id: '4',
      question: 'How does auto-save work?',
      answer: 'Auto-save automatically transfers a set amount from your wallet to your savings goals at regular intervals (daily, weekly, or monthly).',
      category: 'Savings',
    },
    {
      id: '5',
      question: 'Can I withdraw locked savings before the lock period ends?',
      answer: 'No, locked savings cannot be withdrawn before the lock period ends. However, you will earn higher interest on locked savings.',
      category: 'Savings',
    },
  ];
};

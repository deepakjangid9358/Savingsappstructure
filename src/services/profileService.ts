import { apiRequest } from './apiClient';
import { ENDPOINTS } from './apiConfig';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  kycStatus: {
    pan: boolean;
    aadhaar: boolean;
  };
}

export interface BankAccount {
  id: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  bankName: string;
  branch?: string;
  isPrimary: boolean;
}

// Get user profile
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const result = await apiRequest<UserProfile>({
    method: 'GET',
    url: ENDPOINTS.PROFILE.GET_PROFILE,
  });

  if (result.error) {
    // Return mock profile for development
    return {
      id: 'mock-user-id',
      name: 'Rahul Kumar',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      dateOfBirth: '1995-05-15',
      address: {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
      kycStatus: {
        pan: true,
        aadhaar: true,
      },
    };
  }

  return result.data;
};

// Update user profile
export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  const result = await apiRequest<UserProfile>({
    method: 'PUT',
    url: ENDPOINTS.PROFILE.UPDATE_PROFILE,
    data: updates,
  });

  if (result.error) {
    return null;
  }

  return result.data;
};

// Get bank details
export const getBankDetails = async (): Promise<BankAccount[]> => {
  const result = await apiRequest<{ accounts: BankAccount[] }>({
    method: 'GET',
    url: ENDPOINTS.PROFILE.GET_BANK_DETAILS,
  });

  if (result.error) {
    // Return mock bank accounts for development
    return [
      {
        id: '1',
        accountNumber: '****1234',
        ifscCode: 'HDFC0001234',
        accountHolderName: 'Rahul Kumar',
        bankName: 'HDFC Bank',
        branch: 'Mumbai Branch',
        isPrimary: true,
      },
    ];
  }

  return result.data?.accounts || [];
};

// Add or update bank details
export const updateBankDetails = async (bankAccount: Omit<BankAccount, 'id'>): Promise<BankAccount | null> => {
  const result = await apiRequest<BankAccount>({
    method: 'POST',
    url: ENDPOINTS.PROFILE.UPDATE_BANK_DETAILS,
    data: bankAccount,
  });

  if (result.error) {
    // Return mock bank account for development
    return {
      ...bankAccount,
      id: `bank-${Date.now()}`,
    };
  }

  return result.data;
};

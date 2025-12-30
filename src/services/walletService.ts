import { apiRequest } from './apiClient';
import { ENDPOINTS } from './apiConfig';

export interface WalletBalance {
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  balance?: number;
}

export interface AddMoneyRequest {
  amount: number;
  paymentMethod: string;
  upiId?: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
  };
}

export interface WithdrawRequest {
  amount: number;
  bankAccountId: string;
}

// Get wallet balance
export const getWalletBalance = async (): Promise<number> => {
  const result = await apiRequest<WalletBalance>({
    method: 'GET',
    url: ENDPOINTS.WALLET.GET_BALANCE,
  });

  if (result.error) {
    // Return mock balance for development
    return 25000;
  }

  return result.data?.balance || 0;
};

// Add money to wallet
export const addMoneyToWallet = async (request: AddMoneyRequest): Promise<{ success: boolean; message: string; transactionId?: string }> => {
  const result = await apiRequest<{ success: boolean; message: string; transactionId: string }>({
    method: 'POST',
    url: ENDPOINTS.WALLET.ADD_MONEY,
    data: request,
  });

  if (result.error) {
    // Return mock success for development
    return {
      success: true,
      message: 'Money added successfully (mock)',
      transactionId: `TXN${Date.now()}`,
    };
  }

  return result.data || { success: false, message: 'Failed to add money' };
};

// Withdraw money from wallet
export const withdrawFromWallet = async (request: WithdrawRequest): Promise<{ success: boolean; message: string; transactionId?: string }> => {
  const result = await apiRequest<{ success: boolean; message: string; transactionId: string }>({
    method: 'POST',
    url: ENDPOINTS.WALLET.WITHDRAW,
    data: request,
  });

  if (result.error) {
    // Return mock success for development
    return {
      success: true,
      message: 'Withdrawal initiated successfully (mock)',
      transactionId: `TXN${Date.now()}`,
    };
  }

  return result.data || { success: false, message: 'Failed to withdraw' };
};

// Get transaction history
export const getTransactions = async (
  filters?: {
    type?: 'credit' | 'debit';
    category?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }
): Promise<Transaction[]> => {
  const result = await apiRequest<{ transactions: Transaction[] }>({
    method: 'GET',
    url: ENDPOINTS.WALLET.GET_TRANSACTIONS,
    params: filters,
  });

  if (result.error) {
    // Return mock transactions for development
    return getMockTransactions();
  }

  return result.data?.transactions || [];
};

// Mock transactions for development
const getMockTransactions = (): Transaction[] => {
  return [
    {
      id: '1',
      type: 'credit',
      amount: 5000,
      description: 'Added to wallet',
      category: 'Add Money',
      date: new Date().toISOString(),
      status: 'completed',
    },
    {
      id: '2',
      type: 'debit',
      amount: 1200,
      description: 'Grocery Shopping',
      category: 'Shopping',
      date: new Date(Date.now() - 86400000).toISOString(),
      status: 'completed',
    },
    {
      id: '3',
      type: 'credit',
      amount: 3000,
      description: 'Salary Credit',
      category: 'Income',
      date: new Date(Date.now() - 172800000).toISOString(),
      status: 'completed',
    },
    {
      id: '4',
      type: 'debit',
      amount: 500,
      description: 'Mobile Recharge',
      category: 'Bills',
      date: new Date(Date.now() - 259200000).toISOString(),
      status: 'completed',
    },
  ];
};

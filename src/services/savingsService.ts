import { apiRequest } from './apiClient';
import { ENDPOINTS } from './apiConfig';
import { SavingsGoal } from '../app/components/savings/CreateGoal';

export interface AutoSaveConfig {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  amount: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
}

export interface LockSavingsRequest {
  amount: number;
  lockPeriod: string;
  reason?: string;
}

// Get all savings goals
export const getSavingsGoals = async (): Promise<SavingsGoal[]> => {
  const result = await apiRequest<{ goals: SavingsGoal[] }>({
    method: 'GET',
    url: ENDPOINTS.SAVINGS.GET_GOALS,
  });

  if (result.error) {
    // Return mock goals for development
    return getMockGoals();
  }

  return result.data?.goals || [];
};

// Create a new savings goal
export const createSavingsGoal = async (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>): Promise<SavingsGoal | null> => {
  const result = await apiRequest<SavingsGoal>({
    method: 'POST',
    url: ENDPOINTS.SAVINGS.CREATE_GOAL,
    data: goal,
  });

  if (result.error) {
    // Return mock goal for development
    return {
      ...goal,
      id: `goal-${Date.now()}`,
      currentAmount: 0,
    };
  }

  return result.data;
};

// Update a savings goal
export const updateSavingsGoal = async (goalId: string, updates: Partial<SavingsGoal>): Promise<SavingsGoal | null> => {
  const result = await apiRequest<SavingsGoal>({
    method: 'PUT',
    url: ENDPOINTS.SAVINGS.UPDATE_GOAL.replace(':id', goalId),
    data: updates,
  });

  if (result.error) {
    return null;
  }

  return result.data;
};

// Delete a savings goal
export const deleteSavingsGoal = async (goalId: string): Promise<boolean> => {
  const result = await apiRequest({
    method: 'DELETE',
    url: ENDPOINTS.SAVINGS.DELETE_GOAL.replace(':id', goalId),
  });

  return !result.error;
};

// Add money to a specific goal
export const addToSavingsGoal = async (goalId: string, amount: number): Promise<boolean> => {
  const result = await apiRequest({
    method: 'POST',
    url: ENDPOINTS.SAVINGS.ADD_TO_GOAL.replace(':id', goalId),
    data: { amount },
  });

  return !result.error;
};

// Lock savings
export const lockSavings = async (request: LockSavingsRequest): Promise<{ success: boolean; message: string; lockId?: string }> => {
  const result = await apiRequest<{ success: boolean; message: string; lockId: string }>({
    method: 'POST',
    url: ENDPOINTS.SAVINGS.LOCK_SAVINGS,
    data: request,
  });

  if (result.error) {
    // Return mock success for development
    return {
      success: true,
      message: 'Savings locked successfully (mock)',
      lockId: `LOCK${Date.now()}`,
    };
  }

  return result.data || { success: false, message: 'Failed to lock savings' };
};

// Get auto-save configuration
export const getAutoSaveConfig = async (): Promise<AutoSaveConfig> => {
  const result = await apiRequest<AutoSaveConfig>({
    method: 'GET',
    url: ENDPOINTS.SAVINGS.GET_AUTO_SAVE_CONFIG,
  });

  if (result.error) {
    // Return mock config for development
    return {
      enabled: false,
      frequency: 'daily',
      amount: 100,
    };
  }

  return result.data || { enabled: false, frequency: 'daily', amount: 0 };
};

// Update auto-save configuration
export const updateAutoSaveConfig = async (config: AutoSaveConfig): Promise<boolean> => {
  const result = await apiRequest({
    method: 'PUT',
    url: ENDPOINTS.SAVINGS.UPDATE_AUTO_SAVE,
    data: config,
  });

  return !result.error;
};

// Mock goals for development
const getMockGoals = (): SavingsGoal[] => {
  return [
    {
      id: '1',
      name: 'New Laptop',
      targetAmount: 80000,
      currentAmount: 45000,
      targetDate: '2025-03-31',
      emoji: '💻',
    },
    {
      id: '2',
      name: 'Vacation',
      targetAmount: 50000,
      currentAmount: 18000,
      targetDate: '2025-06-30',
      emoji: '✈️',
    },
  ];
};

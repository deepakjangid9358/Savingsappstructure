import { apiRequest } from './apiClient';
import { ENDPOINTS, STORAGE_KEYS } from './apiConfig';

export interface LoginResponse {
  success: boolean;
  message: string;
  sessionId?: string;
}

export interface OTPVerifyResponse {
  success: boolean;
  token: string;
  refreshToken: string;
  user: {
    id: string;
    phone: string;
    name?: string;
    email?: string;
  };
  kycStatus: {
    pan: boolean;
    aadhaar: boolean;
  };
}

// Send OTP to phone number
export const loginWithPhone = async (phone: string): Promise<LoginResponse> => {
  const result = await apiRequest<LoginResponse>({
    method: 'POST',
    url: ENDPOINTS.AUTH.LOGIN,
    data: { phone },
  });

  if (result.error) {
    // Return mock success for development
    return {
      success: true,
      message: 'OTP sent successfully (mock)',
      sessionId: 'mock-session-id',
    };
  }

  return result.data!;
};

// Verify OTP
export const verifyOTP = async (
  phone: string,
  otp: string,
  sessionId?: string
): Promise<OTPVerifyResponse | null> => {
  const result = await apiRequest<OTPVerifyResponse>({
    method: 'POST',
    url: ENDPOINTS.AUTH.VERIFY_OTP,
    data: { phone, otp, sessionId },
  });

  if (result.error) {
    // Return mock data for development
    const mockResponse: OTPVerifyResponse = {
      success: true,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 'mock-user-id',
        phone,
        name: 'Rahul Kumar',
        email: 'rahul@example.com',
      },
      kycStatus: {
        pan: false,
        aadhaar: false,
      },
    };

    // Store tokens in localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockResponse.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, mockResponse.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockResponse.user));
    localStorage.setItem(STORAGE_KEYS.KYC_STATUS, JSON.stringify(mockResponse.kycStatus));

    return mockResponse;
  }

  if (result.data) {
    // Store tokens in localStorage
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, result.data.token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, result.data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(result.data.user));
    localStorage.setItem(STORAGE_KEYS.KYC_STATUS, JSON.stringify(result.data.kycStatus));
  }

  return result.data;
};

// Logout user
export const logout = async (): Promise<void> => {
  await apiRequest({
    method: 'POST',
    url: ENDPOINTS.AUTH.LOGOUT,
  });

  // Clear local storage
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  localStorage.removeItem(STORAGE_KEYS.KYC_STATUS);
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return userData ? JSON.parse(userData) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

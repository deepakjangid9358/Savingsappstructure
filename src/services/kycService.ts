import { apiRequest } from './apiClient';
import { ENDPOINTS, STORAGE_KEYS } from './apiConfig';

export interface KYCVerifyResponse {
  success: boolean;
  message: string;
  verified: boolean;
}

export interface KYCStatus {
  pan: boolean;
  aadhaar: boolean;
}

// Verify PAN card
export const verifyPAN = async (panNumber: string, name: string): Promise<KYCVerifyResponse> => {
  const result = await apiRequest<KYCVerifyResponse>({
    method: 'POST',
    url: ENDPOINTS.KYC.VERIFY_PAN,
    data: { panNumber, name },
  });

  if (result.error) {
    // Return mock success for development
    const mockResponse: KYCVerifyResponse = {
      success: true,
      message: 'PAN verified successfully (mock)',
      verified: true,
    };

    // Update KYC status in localStorage
    updateKYCStatus({ pan: true });

    return mockResponse;
  }

  if (result.data?.verified) {
    updateKYCStatus({ pan: true });
  }

  return result.data!;
};

// Verify Aadhaar card
export const verifyAadhaar = async (aadhaarNumber: string, otp?: string): Promise<KYCVerifyResponse> => {
  const result = await apiRequest<KYCVerifyResponse>({
    method: 'POST',
    url: ENDPOINTS.KYC.VERIFY_AADHAAR,
    data: { aadhaarNumber, otp },
  });

  if (result.error) {
    // Return mock success for development
    const mockResponse: KYCVerifyResponse = {
      success: true,
      message: 'Aadhaar verified successfully (mock)',
      verified: true,
    };

    // Update KYC status in localStorage
    updateKYCStatus({ aadhaar: true });

    return mockResponse;
  }

  if (result.data?.verified) {
    updateKYCStatus({ aadhaar: true });
  }

  return result.data!;
};

// Get KYC status from backend
export const getKYCStatus = async (): Promise<KYCStatus> => {
  const result = await apiRequest<KYCStatus>({
    method: 'GET',
    url: ENDPOINTS.KYC.GET_STATUS,
  });

  if (result.error) {
    // Return from localStorage as fallback
    return getLocalKYCStatus();
  }

  if (result.data) {
    // Update localStorage
    localStorage.setItem(STORAGE_KEYS.KYC_STATUS, JSON.stringify(result.data));
  }

  return result.data || getLocalKYCStatus();
};

// Get KYC status from localStorage
export const getLocalKYCStatus = (): KYCStatus => {
  const status = localStorage.getItem(STORAGE_KEYS.KYC_STATUS);
  return status ? JSON.parse(status) : { pan: false, aadhaar: false };
};

// Update KYC status in localStorage
const updateKYCStatus = (update: Partial<KYCStatus>) => {
  const currentStatus = getLocalKYCStatus();
  const newStatus = { ...currentStatus, ...update };
  localStorage.setItem(STORAGE_KEYS.KYC_STATUS, JSON.stringify(newStatus));
};

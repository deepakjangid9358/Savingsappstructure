// API Configuration for Backend Integration
// Update these values based on your Node.js backend deployment

export const API_CONFIG = {
  // Base URL for your Node.js backend (Wallet APIs)
  // Example: 'https://api.yourdomain.com' or 'http://localhost:5000'
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // API version
  VERSION: 'v1',
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    VERIFY_OTP: '/auth/verify-otp',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
  
  // KYC Verification
  KYC: {
    VERIFY_PAN: '/kyc/verify-pan',
    VERIFY_AADHAAR: '/kyc/verify-aadhaar',
    GET_STATUS: '/kyc/status',
  },
  
  // Wallet Operations
  WALLET: {
    GET_BALANCE: '/wallet/balance',
    ADD_MONEY: '/wallet/add-money',
    WITHDRAW: '/wallet/withdraw',
    GET_TRANSACTIONS: '/wallet/transactions',
  },
  
  // Savings & Goals
  SAVINGS: {
    GET_GOALS: '/savings/goals',
    CREATE_GOAL: '/savings/goals',
    UPDATE_GOAL: '/savings/goals/:id',
    DELETE_GOAL: '/savings/goals/:id',
    ADD_TO_GOAL: '/savings/goals/:id/add',
    LOCK_SAVINGS: '/savings/lock',
    GET_AUTO_SAVE_CONFIG: '/savings/auto-save',
    UPDATE_AUTO_SAVE: '/savings/auto-save',
  },
  
  // User Profile
  PROFILE: {
    GET_PROFILE: '/profile',
    UPDATE_PROFILE: '/profile',
    GET_BANK_DETAILS: '/profile/bank-details',
    UPDATE_BANK_DETAILS: '/profile/bank-details',
  },
  
  // Support
  SUPPORT: {
    GET_FAQ: '/support/faq',
    CREATE_TICKET: '/support/ticket',
    GET_TICKETS: '/support/tickets',
  },
};

// Storage keys for local storage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  KYC_STATUS: 'kyc_status',
};

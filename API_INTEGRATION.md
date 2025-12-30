# API Integration Guide

## Architecture Overview

```
React Frontend (SaveSmart App)
        ↓
Node.js Backend (Wallet APIs)
        ↓
MySQL Database
        ↑
PHP Admin Panel
```

## Backend Integration Setup

### 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `VITE_API_BASE_URL` with your Node.js backend URL:
- **Local Development**: `http://localhost:5000/api`
- **Production**: `https://api.yourdomain.com/api`

### 2. API Services Structure

The app includes the following service modules:

```
/src/services/
├── apiConfig.ts       # API configuration and endpoints
├── apiClient.ts       # Axios instance with interceptors
├── authService.ts     # Authentication APIs (login, OTP)
├── kycService.ts      # KYC verification APIs
├── walletService.ts   # Wallet operations APIs
├── savingsService.ts  # Savings & goals APIs
├── profileService.ts  # User profile & bank details APIs
├── supportService.ts  # Support & FAQ APIs
└── index.ts          # Central export file
```

### 3. API Endpoints

All API endpoints are defined in `/src/services/apiConfig.ts`:

#### Authentication
- `POST /auth/login` - Send OTP to phone
- `POST /auth/verify-otp` - Verify OTP and get tokens
- `POST /auth/logout` - Logout user
- `POST /auth/refresh-token` - Refresh access token

#### KYC Verification
- `POST /kyc/verify-pan` - Verify PAN card
- `POST /kyc/verify-aadhaar` - Verify Aadhaar card
- `GET /kyc/status` - Get KYC status

#### Wallet Operations
- `GET /wallet/balance` - Get wallet balance
- `POST /wallet/add-money` - Add money to wallet
- `POST /wallet/withdraw` - Withdraw money from wallet
- `GET /wallet/transactions` - Get transaction history

#### Savings & Goals
- `GET /savings/goals` - Get all savings goals
- `POST /savings/goals` - Create new savings goal
- `PUT /savings/goals/:id` - Update savings goal
- `DELETE /savings/goals/:id` - Delete savings goal
- `POST /savings/goals/:id/add` - Add money to goal
- `POST /savings/lock` - Lock savings
- `GET /savings/auto-save` - Get auto-save config
- `PUT /savings/auto-save` - Update auto-save config

#### User Profile
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /profile/bank-details` - Get bank account details
- `POST /profile/bank-details` - Add/update bank account

#### Support
- `GET /support/faq` - Get FAQs
- `POST /support/ticket` - Create support ticket
- `GET /support/tickets` - Get user's support tickets

### 4. Authentication Flow

The app uses JWT-based authentication:

1. **Login**: User enters phone number → Backend sends OTP
2. **Verify OTP**: User enters OTP → Backend returns JWT tokens
3. **Token Storage**: Tokens stored in localStorage
4. **API Requests**: Access token sent in `Authorization` header
5. **Token Refresh**: Auto-refresh on 401 errors
6. **Logout**: Clear tokens from localStorage

### 5. Using Services in Components

Import and use services in your components:

```typescript
import { loginWithPhone, verifyOTP } from '@/services';

// Send OTP
const handleLogin = async (phone: string) => {
  const result = await loginWithPhone(phone);
  if (result.success) {
    // OTP sent successfully
  }
};

// Verify OTP
const handleVerifyOTP = async (phone: string, otp: string) => {
  const result = await verifyOTP(phone, otp);
  if (result) {
    // User authenticated, navigate to dashboard
  }
};
```

### 6. Mock Data Fallback

All services include mock data fallback for development:

- If backend API fails or is not available, services return mock data
- This allows frontend development without backend dependency
- Mock data is similar to expected API responses

### 7. Error Handling

The `apiClient.ts` includes:

- **Request Interceptor**: Adds auth token to all requests
- **Response Interceptor**: Handles errors and token refresh
- **Error Messages**: User-friendly error messages from backend
- **Automatic Logout**: On authentication failure

### 8. Local Storage Keys

The app stores data in localStorage:

```typescript
AUTH_TOKEN      // JWT access token
REFRESH_TOKEN   // JWT refresh token
USER_DATA       // User profile data
KYC_STATUS      // KYC verification status
```

## Backend Requirements

### Expected API Response Format

All API responses should follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

### Authentication

- Include JWT token in `Authorization` header: `Bearer <token>`
- Token expiry: 1 hour (configurable)
- Refresh token expiry: 7 days (configurable)

## Database Schema Recommendations

### Users Table
```sql
id, phone, name, email, password_hash, created_at, updated_at
```

### KYC Table
```sql
user_id, pan_number, pan_verified, aadhaar_number, aadhaar_verified, verified_at
```

### Wallets Table
```sql
user_id, balance, currency, last_updated
```

### Transactions Table
```sql
id, user_id, type, amount, description, category, status, created_at
```

### Savings Goals Table
```sql
id, user_id, name, target_amount, current_amount, target_date, emoji, created_at
```

### Bank Accounts Table
```sql
id, user_id, account_number, ifsc_code, account_holder_name, bank_name, is_primary
```

## Security Considerations

1. **HTTPS Only**: Use HTTPS in production
2. **Token Expiry**: Implement proper token expiration
3. **Rate Limiting**: Implement API rate limiting
4. **Input Validation**: Validate all user inputs on backend
5. **SQL Injection**: Use parameterized queries
6. **XSS Protection**: Sanitize user inputs
7. **CORS**: Configure CORS properly for your domain

## Testing

Test API integration:

```bash
# 1. Start your Node.js backend
cd backend
npm start

# 2. Update .env with backend URL
VITE_API_BASE_URL=http://localhost:5000/api

# 3. Start frontend
npm run dev
```

## Deployment

### Frontend (React App)
- Deploy to Vercel, Netlify, or any static hosting
- Set environment variables in deployment platform

### Backend (Node.js)
- Deploy to AWS, Heroku, DigitalOcean, etc.
- Configure environment variables
- Set up MySQL database
- Enable HTTPS

### Admin Panel (PHP)
- Deploy to traditional hosting or cloud
- Connect to same MySQL database
- Implement admin authentication

## Support

For issues or questions about API integration, please refer to the backend API documentation or contact the backend team.

// src/services/api.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // Replace with your FastAPI backend URL
const API_KEY = 'mlzuMoRFjdGhcFulLMaVtfwNAHycbBAf'; // Your API key

// Define types for API responses and requests
interface UserCreate {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

interface TwoFARequest {
  email: string;
  otp_code: string;
}

interface PasswordResetRequest {
  email: string;
}

interface PasswordResetConfirm {
  email: string;
  new_password: string;
  otp_code: string;
}

interface AddressCreate {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  address_type: 'Home' | 'Work' | 'Other';
  custom_name?: string;
}

interface AddressUpdate {
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

// Helper function to set headers with JWT token and API key
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'API-Key': API_KEY, // Include the API key in the headers
    },
  };
};

// User Authentication APIs
export const signup = async (userData: UserCreate): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, userData, {
      headers: {
        'API-Key': API_KEY, // Include the API key for non-authenticated requests
      },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const login = async (loginData: LoginData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
      headers: {
        'API-Key': API_KEY, // Include the API key for non-authenticated requests
      },
    });
    localStorage.setItem('token', response.headers['authorization'].split(' ')[1]); // Store JWT token
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, {}, getAuthHeaders());
    localStorage.removeItem('token'); // Remove JWT token
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// User Profile APIs
export const getUserProfile = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const updateUserProfile = async (updateData: UserUpdate): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/update`, updateData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteUser = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete`, getAuthHeaders());
    localStorage.removeItem('token'); // Remove JWT token
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// 2FA APIs
export const get2FAStatus = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/2fa/status`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const toggle2FAStatus = async (requestData: { entered_password: string }): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/2fa/toggle`, requestData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const verify2FA = async (twoFAData: TwoFARequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/2fa/verify`, twoFAData, {
      headers: {
        'API-Key': API_KEY, // Include the API key for non-authenticated requests
      },
    });
    localStorage.setItem('token', response.headers['authorization'].split(' ')[1]); // Store JWT token
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// Password Reset APIs
export const requestPasswordReset = async (email: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/password-reset/request`, { email }, {
      headers: {
        'API-Key': API_KEY, // Include the API key for non-authenticated requests
      },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const resetPassword = async (resetData: PasswordResetConfirm): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/password-reset/confirm`, resetData, {
      headers: {
        'API-Key': API_KEY, // Include the API key for non-authenticated requests
      },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// Address APIs
export const createAddress = async (addressData: AddressCreate): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/address`, addressData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const getAddresses = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/address`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteAddress = async (addressType: string, customName?: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/address/${addressType}`, {
      ...getAuthHeaders(),
      params: { custom_name: customName },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};
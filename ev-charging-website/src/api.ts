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
  name: string;
  email: string;
  phone_number?: number | null; // Add phone_number as an optional field
}

interface TwoFARequest {
  email: string;
  otp_code: string;
}

interface PasswordResetConfirm {
  email: string;
  new_password: string;
  otp_code: string;
}

// Updated AddressCreate interface according to the new schema.
export interface AddressCreate {
  type: 'Home' | 'Work' | 'Other';
  custom_type_name?: string;
  house_building: string;
  locality_street: string;
  landmark?: string;
  city: string;
  po_ps: string;
  district: string;
  state: string;
  pin: string;
  country: string;
  is_default?: boolean;
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
      headers: { 'API-Key': API_KEY },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const login = async (loginData: LoginData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, loginData, {
      headers: { 'API-Key': API_KEY },
    });
    localStorage.setItem('token', response.headers['authorization'].split(' ')[1]);
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/logout`, {}, getAuthHeaders());
    localStorage.removeItem('token');
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
    const response = await axios.patch(`${API_BASE_URL}/users/update`, updateData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const deleteUser = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/delete`, getAuthHeaders());
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// 2FA APIs
export const get2FAStatus = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/2fa/status`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const toggle2FAStatus = async (requestData: { entered_password: string }): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/users/2fa/toggle`, requestData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const verify2FA = async (twoFAData: TwoFARequest): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/2fa/verify`, twoFAData, {
      headers: { 'API-Key': API_KEY },
    });
    localStorage.setItem('token', response.headers['authorization'].split(' ')[1]);
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// Password Reset APIs
export const requestPasswordReset = async (email: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/password-reset/request`,
      { email },
      { headers: { 'API-Key': API_KEY } }
    );
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const resetPassword = async (resetData: PasswordResetConfirm): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/password-reset/confirm`,
      resetData,
      { headers: { 'API-Key': API_KEY } }
    );
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// Address APIs
export const createAddress = async (addressData: AddressCreate): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/address`, addressData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

export const getAddresses = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/address`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// Updated deleteAddress: Identifies an address by its type and, if applicable, custom name.
export const deleteAddress = async (
  addressType: 'Home' | 'Work' | 'Other',
  customName?: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/address/${addressType}`, {
      ...getAuthHeaders(),
      params: { custom_name: customName },
    });
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

// New setDefaultAddress function for setting an address as default.
export const setDefaultAddress = async (
  addressType: 'Home' | 'Work' | 'Other',
  customName?: string
): Promise<AxiosResponse> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/users/address/${addressType}/set-default`,
      null,
      {
        ...getAuthHeaders(),
        params: { custom_name: customName },
      }
    );
    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

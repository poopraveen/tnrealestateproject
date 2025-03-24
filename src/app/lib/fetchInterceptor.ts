import { getCookie } from 'cookies-next';

const BASE_URL = '';//'https://real-pro-service.onrender.com/api';

/**
 * Custom fetch interceptor
 * Handles GET, POST, and PUT requests
 * Automatically attaches Authorization token & handles errors
 */
export const fetchInterceptor: any = async (
  endpoint: string,
  method?: 'GET' | 'POST' | 'PUT',
  body?: object
) => {
  const token = getCookie('token');

  // Default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Fetch options
  const options: RequestInit = {
    method,
    headers,
    ...(body ? body : {}), // Include body for POST & PUT
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  // Handle unauthorized response (401)
  if (response.status === 401) {
    console.error('Unauthorized! Redirecting to login...');
    window.location.href = '/login';
    return;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong!');
  }

  return response;
};

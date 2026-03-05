import axios from 'axios';
import type { ApiError, ApiResponse } from '../types/api';

const normalizeBaseUrl = (value?: string): string => {
  const raw = value?.trim();
  if (!raw) return '/api/v1';
  if (/^https?:\/\/[^/]+\/?$/i.test(raw)) return `${raw.replace(/\/$/, '')}/api/v1`;
  if (/^https?:\/\/[^/]+\/api\/?$/i.test(raw)) return `${raw.replace(/\/$/, '')}/v1`;
  return raw;
};

const baseURL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error?.response?.data as Partial<ApiResponse<unknown>> | undefined;
    const apiError: ApiError = {
      status: error?.response?.status ?? 0,
      message: payload?.message ?? error?.message ?? 'Unknown error',
      errorCode: payload?.errorCode,
    };
    return Promise.reject(apiError);
  },
);

export const unwrap = <T>(response: { data: ApiResponse<T> }): T => response.data.data;

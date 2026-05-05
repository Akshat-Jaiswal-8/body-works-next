import { useAuthStore } from '@/features/auth/store/use-auth-store';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const ensureTrailingSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/';

  if (typeof window !== 'undefined') {
    return ensureTrailingSlash(configuredBaseUrl);
  }

  if (/^https?:\/\//i.test(configuredBaseUrl)) {
    return ensureTrailingSlash(configuredBaseUrl);
  }

  return ensureTrailingSlash(
    process.env.API_URL || 'https://api.bodyworks.akshatjaiswal.me/api/v1/',
  );
};

export const API_BASE_URL = resolveApiBaseUrl();

interface ApiConfig {
  baseURL: string;
}

export const createPublicApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  if (!baseURL) {
    throw new Error('API baseURL is required');
  }

  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const createPrivateApi = ({ baseURL }: ApiConfig): AxiosInstance => {
  if (!baseURL) {
    throw new Error('API baseURL is required');
  }

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
  });

  let refreshRequestPromise: Promise<void> | null = null;

  const waitForTokenRefresh = async () => {
    if (!refreshRequestPromise) {
      refreshRequestPromise = axios
        .post(`${baseURL}auth/refresh-token`, {}, { withCredentials: true })
        .then(() => undefined)
        .catch(() => {
          useAuthStore.getState().clearSession();
          return Promise.reject(new Error('Session expired'));
        })
        .finally(() => {
          refreshRequestPromise = null;
        });
    }

    return refreshRequestPromise;
  };

  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      config.headers.set('Cookie', cookieStore.toString());
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetriableRequestConfig | undefined;
      const requestUrl = String(originalRequest?.url || '');
      const isRefreshRequest = requestUrl.includes('auth/refresh-token');

      if (
        !originalRequest ||
        error.response?.status !== 401 ||
        originalRequest._retry ||
        isRefreshRequest
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await waitForTokenRefresh();
        return instance(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    },
  );

  return instance;
};

export const publicApiCaller: AxiosInstance = createPublicApi({ baseURL: API_BASE_URL });
export const privateApiCaller: AxiosInstance = createPrivateApi({ baseURL: API_BASE_URL });

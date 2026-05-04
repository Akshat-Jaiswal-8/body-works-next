import axios from 'axios';

export class AppError extends Error {
  statusCode?: number;
  retryable: boolean;

  constructor(message: string, statusCode?: number, retryable = false) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

const extractMessage = (data: unknown): string | undefined => {
  if (typeof data === 'string') return data.trim() || undefined;

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;

    for (const key of ['message', 'detail', 'error']) {
      const val = record[key];
      if (typeof val === 'string' && val.trim()) return val.trim();
    }

    const errors = record.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const firstError = errors[0];
      if (firstError && typeof firstError === 'object') {
        const errorRecord = firstError as Record<string, unknown>;
        if (typeof errorRecord.message === 'string' && errorRecord.message.trim()) {
          return errorRecord.message.trim();
        }
      }
      if (typeof firstError === 'string') return firstError.trim();
    }
  }

  return undefined;
};

export const resolveError = (error: unknown, fallbackMessage = FALLBACK_MESSAGE): AppError => {
  if (error instanceof AppError) return error;

  if (typeof error === 'string') {
    return new AppError(error.trim() || fallbackMessage);
  }

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const isNetworkError = error.request && !error.response;
    const isTimeout = error.code === 'ECONNABORTED';
    const retryable = !statusCode || statusCode >= 500 || isTimeout || !!isNetworkError;

    const message =
      extractMessage(error.response?.data) ??
      (isTimeout ? 'The request timed out. Please try again.' : undefined) ??
      (isNetworkError ? 'Unable to connect. Check your internet connection.' : undefined) ??
      fallbackMessage;

    return new AppError(message, statusCode, retryable);
  }

  if (error instanceof Error) {
    return new AppError(error.message || fallbackMessage);
  }

  return new AppError(fallbackMessage);
};

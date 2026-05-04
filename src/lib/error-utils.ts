import { resolveError } from '@/lib/error';

export const getErrorMessage = (error: unknown, fallbackMessage?: string) =>
  resolveError(error, fallbackMessage).message;

export const getDataFetchFallbackMessage = (resourceName: string) =>
  `Unable to load ${resourceName} right now. Please try again.`;

export const getEmptyDataMessage = (resourceName: string, searchTerm?: string) =>
  searchTerm?.trim()
    ? `No ${resourceName} matched your search.`
    : `No ${resourceName} available yet.`;

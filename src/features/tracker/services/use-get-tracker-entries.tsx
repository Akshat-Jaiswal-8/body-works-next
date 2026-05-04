import type { IBodyStatsResponse, ITrackerData } from '@/features/tracker/types';
import { privateApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const trackerEntriesQueryKeys = {
  all: ['tracker-entries'] as const,
  list: (page: number, limit: number) => ['tracker-entries', page, limit] as const,
};

export const getTrackerEntries = async (
  page: number = 1,
  limit: number = 20,
): Promise<ITrackerData> => {
  const response = await privateApiCaller.get<IBodyStatsResponse>('users/me/stats', {
    params: { page, limit },
  });
  return {
    entries: response.data.data,
    total: response.data.total,
    totalPages: response.data.totalPages,
    page: response.data.page,
  };
};

export const useTrackerEntries = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: trackerEntriesQueryKeys.list(page, limit),
    queryFn: () => getTrackerEntries(page, limit),
    placeholderData: keepPreviousData,
  });
};

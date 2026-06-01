import type { IBodyStatsResponse } from '@/features/tracker/types';
import type { ChartRange, IChartData } from '@/features/tracker/types/chart';
import { privateApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const chartDataQueryKeys = {
  all: ['tracker-chart'] as const,
  byRange: (range: ChartRange) => ['tracker-chart', range] as const,
};

const getDateRange = (range: ChartRange): { from?: string; to?: string } => {
  if (range === 'all') return {};

  const now = new Date();
  const to = now.toISOString();
  let from: Date;

  switch (range) {
    case '7d':
      from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      return {};
  }

  return { from: from.toISOString(), to };
};

export const getChartData = async (range: ChartRange): Promise<IChartData> => {
  const { from, to } = getDateRange(range);

  const params: Record<string, string | number> = {
    sort: 'asc',
    limit: 100,
    page: 1,
  };

  if (from) params.from = from;
  if (to) params.to = to;

  const response = await privateApiCaller.get<IBodyStatsResponse>('users/me/stats', { params });

  const entries = response.data.data.map((entry) => ({
    date: new Date(entry.loggedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    weight: entry.weightKg,
    bmi: entry.bmi,
    bodyFat: entry.bodyFatPct,
  }));

  return {
    entries,
    total: response.data.total,
  };
};

export const useChartData = (range: ChartRange) => {
  return useQuery({
    queryKey: chartDataQueryKeys.byRange(range),
    queryFn: () => getChartData(range),
    placeholderData: keepPreviousData,
  });
};

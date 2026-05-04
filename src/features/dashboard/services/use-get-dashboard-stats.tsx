import type { IDashboardStats } from '@/features/dashboard/types';
import { privateApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const dashboardStatsQueryKey = () => ['dashboard-stats'] as const;

const calculateBmi = (weightKg: number, heightCm?: number): number => {
  if (!heightCm) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
};

const getBmiStatus = (bmi: number): string => {
  if (bmi <= 0) return 'Unknown';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

const goalLabelMap: Record<string, string> = {
  fat_loss: 'Lose Fat',
  muscle_gain: 'Build Muscle',
  strength: 'Build Strength',
  general_fitness: 'General Fitness',
};

export const getDashboardStats = async (): Promise<IDashboardStats> => {
  // For now, fetch profile and latest stat separately.
  // If a dedicated dashboard endpoint is added later, switch to that.
  const [profileResponse, statsResponse] = await Promise.all([
    privateApiCaller.get('users/me'),
    privateApiCaller.get('users/me/stats', { params: { limit: 2, page: 1 } }),
  ]);

  const profile = profileResponse.data.data;
  const stats = statsResponse.data.data;

  const latestStat = stats[0] || null;
  const previousStat = stats[1] || null;

  const weight = latestStat?.weightKg ?? 0;
  const previousWeight = previousStat?.weightKg ?? weight;
  const weightChange = Math.round((weight - previousWeight) * 10) / 10;

  const bodyFat = latestStat?.bodyFatPct ?? 0;
  const previousBodyFat = previousStat?.bodyFatPct ?? bodyFat;
  const bodyFatChange = Math.round((bodyFat - previousBodyFat) * 10) / 10;

  const bmi = calculateBmi(weight, profile.profile?.heightCm);
  const bmiStatus = getBmiStatus(bmi);

  const goal = profile.profile?.goal || 'general_fitness';
  const currentGoal = goalLabelMap[goal] || 'General Fitness';

  return {
    weight,
    weightChange,
    bodyFat,
    bodyFatChange,
    bmi,
    bmiStatus,
    currentGoal,
    goalProgress: 65, // TODO: compute from actual data when available
    goalTarget: '+2kg Muscle', // TODO: make dynamic
    goalWeeksLeft: 4, // TODO: make dynamic
    insights: [
      { label: 'Muscle Mass', value: '35.2 kg', status: 'Excellent', statusColor: 'success' },
      { label: 'Bone Mass', value: '3.1 kg', status: 'Standard', statusColor: 'info' },
      { label: 'Visceral Fat', value: 'Level 4', status: 'Low', statusColor: 'success' },
    ],
  };
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardStatsQueryKey(),
    queryFn: () => getDashboardStats(),
    placeholderData: keepPreviousData,
  });
};

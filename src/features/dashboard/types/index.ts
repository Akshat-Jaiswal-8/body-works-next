import type { IUserProfile } from '@/features/profile/types';
import type { IBodyStatEntry } from '@/features/tracker/types';

export interface IDashboardStats {
  weight: number;
  weightChange: number;
  bodyFat: number;
  bodyFatChange: number;
  bmi: number;
  bmiStatus: string;
  currentGoal: string;
  goalProgress: number;
  goalTarget: string;
  goalWeeksLeft: number;
  insights: IScanInsight[];
}

export interface IScanInsight {
  label: string;
  value: string;
  status: string;
  statusColor: 'success' | 'warning' | 'error' | 'info';
}

export interface IDashboardData {
  profile: IUserProfile;
  latestStat: IBodyStatEntry | null;
}

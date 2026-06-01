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
}

export interface IDashboardData {
  profile: IUserProfile;
  latestStat: IBodyStatEntry | null;
}

export interface IBodyStatEntry {
  id: string;
  userId: string;
  weightKg: number;
  bodyFatPct: number | null;
  bmi: number | null;
  loggedAt: string;
}

export interface IBodyStatsResponse {
  data: IBodyStatEntry[];
  count: number;
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface ICreateBodyStatPayload {
  weightKg: number;
  bodyFatPct?: number;
  bmi?: number;
  loggedAt?: string;
}

export interface ITrackerData {
  entries: IBodyStatEntry[];
  total: number;
  totalPages: number;
  page: number;
}

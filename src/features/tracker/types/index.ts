export interface IBodyStatEntry {
  id: string;
  userId: string;
  weightKg: number;
  bodyFatPct: number | null;
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
  loggedAt?: string;
}

export interface ITrackerData {
  entries: IBodyStatEntry[];
  total: number;
  totalPages: number;
  page: number;
}

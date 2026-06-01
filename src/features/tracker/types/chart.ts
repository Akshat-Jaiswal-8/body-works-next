export type ChartMetric = 'weight' | 'bmi' | 'bodyFat';

export type ChartRange = '7d' | '30d' | '90d' | '1y' | 'all';

export interface IChartEntry {
  date: string;
  weight: number | null;
  bmi: number | null;
  bodyFat: number | null;
}

export interface IChartData {
  entries: IChartEntry[];
  total: number;
}

export const CHART_RANGES: { value: ChartRange; label: string }[] = [
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
  { value: '1y', label: '1 Year' },
  { value: 'all', label: 'All Time' },
];

export const CHART_METRICS: { value: ChartMetric; label: string; color: string }[] = [
  { value: 'weight', label: 'Weight (kg)', color: 'var(--chart-1)' },
  { value: 'bmi', label: 'BMI', color: 'var(--chart-2)' },
  { value: 'bodyFat', label: 'Body Fat %', color: 'var(--chart-3)' },
];

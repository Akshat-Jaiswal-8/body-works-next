export const assessmentClasses: Record<string, string> = {
  Excellent: 'text-emerald-600 dark:text-emerald-400',
  Standard: 'text-amber-600 dark:text-amber-400',
  Monitor: 'text-red-500 dark:text-red-400',
};

export const getBodyFatAssessment = (bodyFatPct: number | null) => {
  if (!bodyFatPct) return { label: '-', colorClass: '' };
  if (bodyFatPct < 16) return { label: 'Excellent', colorClass: assessmentClasses.Excellent };
  if (bodyFatPct < 20) return { label: 'Standard', colorClass: assessmentClasses.Standard };
  return { label: 'Monitor', colorClass: assessmentClasses.Monitor };
};

export interface IRoutineFilterItem {
  title: string;
  imageUrl: string;
  nRoutines: number;
}

export type IRoutineFilterName =
  | 'category'
  | 'days_per_week'
  | 'duration'
  | 'equipment'
  | 'gender'
  | 'level'
  | 'main_goal'
  | 'workout_type';

export interface IRoutineFiltersResponse {
  totalRoutinesFilter: number;
  count: number;
  data: Partial<Record<IRoutineFilterName, IRoutineFilterItem[]>>;
}

export type IRoutineCategory = IRoutineFilterItem;

export interface IRoutineCategoryResponse {
  data: {
    category: IRoutineFilterItem[];
  };
  totalRoutinesFilter: number;
  count: number;
}

export interface IRoutine {
  category: string[];
  routine: {
    routine_title: string;
    routine_description: string;
    routine_imageUrl: string;
    workout_plan: { heading: string; day_plan: string }[];
    workout_summary: {
      MainGoal: string;
      WorkoutType: string;
      TrainingLevel: string;
      ProgramDuration: string;
      DaysPerWeek: number;
      TimePerWorkout: string;
      EquipmentRequired: string;
      TargetGender: string;
    };
  };
  id_: number;
  id: number;
}

export interface IRoutinesResponse {
  totalPages: number;
  totalRoutines: number;
  data: IRoutine[];
}

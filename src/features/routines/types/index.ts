export interface IRoutineCategory {
  title: string;
  imageUrl: string;
}

export interface IRoutineCategoryResponse {
  data: {
    category: IRoutineCategory[];
  };
  totalRoutinesFilter: number;
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

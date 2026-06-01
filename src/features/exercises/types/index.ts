export interface IExercise {
  name: string;
  title: string;
  target: string;
  muscles_worked: string;
  bodyPart: string;
  equipment: string;
  id: string;
  id_: string;
  blog: string;
  images: string[];
  gifUrl: string;
  videos: string[];
  keywords: string[];
}

export interface IExerciseData {
  totalExercises: number;
  totalPages: number;
  data: IExercise[];
}

export interface IExerciseResponse {
  data: IExercise;
}

export interface IExerciseFilterItem {
  title: string;
  exerciseCount: number;
  imageUrl: string;
}

export type IExerciseFilterName = 'equipment' | 'target' | 'bodyPart';

export interface IExerciseFilterResponse {
  data: IExerciseFilterItem[];
  totalPages: number;
  count: number;
}

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

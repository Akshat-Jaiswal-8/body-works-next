export interface ITargetMuscle {
  targetMuscle: string;
  imageUrl: string;
}

export interface ITargetMuscleData {
  totalTargetMuscles: number;
  data: ITargetMuscle[];
}

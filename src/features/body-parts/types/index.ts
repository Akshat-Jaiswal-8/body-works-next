export interface IBodyPart {
  bodyPart: string;
  imageUrl: string;
}

export interface IBodyPartData {
  totalBodyParts: number;
  data: IBodyPart[];
}

export interface IEquipment {
  equipment: string;
  imageUrl: string;
}

export interface IEquipmentData {
  totalEquipments: number;
  data: IEquipment[];
}

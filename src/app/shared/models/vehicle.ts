export class Vehicle {
  make: string;
  model: string;
  date_produced: Date;
  reg: string;
  type: VehicleType;
  category: string;
  capacity: number;
  day_price: number;
  picture: string;
  wheels?: number;
  color?: string;
}

export enum VehicleType {
  CAR = 'car',
  VAN = 'van',
  MOTORCYCLE = 'motorcycle'
}

export enum VehicleCategory {
  SPORTS = 'sports',
  CONVERTIBLE = 'convertible',
  CARRIER = 'carrier',
  HATCHBACK = 'hatchback',
  SUV = 'suv',
  ADVENTURE = 'adventure',
  NAKED = 'naked',
  SUPER_SPORTS = 'super sports',
  OTHER = 'other'
}

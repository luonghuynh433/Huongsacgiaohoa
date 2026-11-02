export type TeaRegion = 'Bắc' | 'Trung' | 'Nam';

export interface TeaCoordinates {
  lat: number;
  lng: number;
}

export interface TeaProduct {
  id: string;
  name: string;
  region: TeaRegion;
  category: string;
  altitude: number | string;
  flavorProfile: string[];
  coordinates: TeaCoordinates;
  description: string;
  soil?: string;
  oxidationLevel?: string;
  brewingTemp?: string;
}

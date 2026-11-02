import type { TeaProduct } from '@/types/tea.types';
import teaDataRaw from '@/data/teaData.json';

export const teaData: TeaProduct[] = teaDataRaw as TeaProduct[];

export const regionCenterCoordinates: Record<string, [number, number]> = {
  'Bắc': [105.4, 21.6],
  'Trung': [108.2, 14.8],
  'Nam': [106.2, 10.8],
};

export const regionLeafletCenters: Record<string, { lat: number; lng: number; zoom: number }> = {
  'Bắc': { lat: 21.6, lng: 105.4, zoom: 8 },
  'Trung': { lat: 14.6, lng: 108.2, zoom: 7 },
  'Nam': { lat: 10.8, lng: 105.8, zoom: 8 },
  'ALL': { lat: 16.2, lng: 107.5, zoom: 6 },
};

export const regionColors: Record<string, string> = {
  'Bắc': '#0F3E35',
  'Trung': '#C5A059',
  'Nam': '#217060',
};

export const regionBgGradients: Record<string, string> = {
  'Bắc': 'from-[#0B2C26] to-[#155246]',
  'Trung': 'from-[#9E7A36] to-[#C5A059]',
  'Nam': 'from-[#124B40] to-[#217060]',
};

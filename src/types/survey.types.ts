import type { TeaProduct, TeaRegion } from './tea.types';

export type MindStatePreference = 'alert_focus' | 'relax_soothe' | 'wild_heritage';

export type FlavorProfilePreference = 'astringent_sweet' | 'floral_milky' | 'honey_mineral';

export type ProcessingPreference = 'fresh_unfermented' | 'oxidized_fermented' | 'flower_scented';

export interface SurveyAnswers {
  mindState?: MindStatePreference;
  flavor?: FlavorProfilePreference;
  processingStyle?: ProcessingPreference;
}

export interface RecommendedTeaItem {
  product: TeaProduct;
  matchedScore: number;
  matchType: 'primary' | 'alternative';
  badgeLabel: string;
  headline: string;
  biochemicalReason: string;
  sensoryNote: string;
  brewingTemp: string;
  ritualNote: string;
}

export interface RecommendationResult {
  region: TeaRegion;
  product: TeaProduct;
  matchedScore: number;
  headline: string;
  biochemicalReason: string;
  sensoryNote: string;
  brewingTemp: string;
  ritualNote: string;
  recommendations: RecommendedTeaItem[];
}

export interface SurveySubmissionPayload {
  answers: SurveyAnswers;
  recommendedRegion: TeaRegion;
  recommendedTeaId: string;
  recommendedTeaName: string;
  additionalTeaIds?: string[];
  clientTimestamp: string;
}

export interface SurveySubmissionResponse {
  success: boolean;
  id: string;
  message: string;
  storedAt: string;
}

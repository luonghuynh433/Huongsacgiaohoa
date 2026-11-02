import type { SurveySubmissionPayload, SurveySubmissionResponse } from '@/types/survey.types';

const LOCAL_STORAGE_KEY = 'gentea_anonymous_surveys';

export const saveSurveyResult = async (
  payload: SurveySubmissionPayload
): Promise<SurveySubmissionResponse> => {
  try {
    const res = await fetch('/api/survey/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = (await res.json()) as SurveySubmissionResponse;
      return data;
    }
  } catch {
    // Fallback to local storage when server endpoint is unavailable
  }

  const fallbackId = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const storedAt = new Date().toISOString();

  try {
    const localSurveys = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    localSurveys.push({ id: fallbackId, ...payload, storedAt });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localSurveys));
  } catch {
    // Ignore storage write errors in private mode
  }

  return {
    success: true,
    id: fallbackId,
    message: 'Kết quả khảo sát đã được lưu ẩn danh trên thiết bị của bạn',
    storedAt,
  };
};


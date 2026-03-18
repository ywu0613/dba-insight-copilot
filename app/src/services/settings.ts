
import type { LLMSettings } from '../types/analysis';

const SETTINGS_STORAGE_KEY = 'dba_insight_copilot_llm_settings';

export const loadSettings = (): LLMSettings => {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!raw) {
    return {
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o',
    };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      apiKey: parsed.apiKey || '',
      baseUrl: parsed.baseUrl || 'https://api.openai.com/v1',
      model: parsed.model || 'gpt-4o',
    };
  } catch {
    return {
      apiKey: '',
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4o',
    };
  }
};

export const saveSettings = (settings: LLMSettings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

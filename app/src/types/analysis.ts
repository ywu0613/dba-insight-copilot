
export interface AnalysisResult {
  fileName: string;
  summary: string;
  risks: Array<{
    title: string;
    description: string;
    severity: 'high' | 'mid' | 'low';
  }>;
  metrics: Array<{
    label: string;
    value: string;
    status: 'normal' | 'warning' | 'critical';
  }>;
  suggestions: string[];
  evidence: string;
  pendingChecks: string[];
}

export interface LLMSettings {
  apiKey: string;
  baseUrl: string;
  model: string;
}

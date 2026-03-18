
import type { AnalysisResult, LLMSettings } from '../types/analysis';

const DEFAULT_PROMPT = `
你是一位专业的 Oracle DBA 分析助手。请分析以下内容（通常是 AWR、ASH 或巡检报告的文本片段或 HTML 内容），并提取关键结论和性能风险。

输出要求：
1. 请以 JSON 格式输出结果。
2. JSON 结构必须包含以下字段：
   - summary: 总体结论（约 100 字）。
   - risks: 风险列表，每一项包含 { "title": string, "description": string, "severity": "high"|"mid"|"low" }。
   - metrics: 核心指标，每一项包含 { "label": string, "value": string, "status": "normal"|"warning"|"critical" }。
   - suggestions: 建议列表（字符串数组）。
   - evidence: 分析证词/底层日志片段。
   - pendingChecks: 待核对事项列表（字符串数组）。

输入内容：
{CONTEXT}
`;

export async function analyzeReport(content: string, settings: LLMSettings, fileName: string): Promise<AnalysisResult> {
  const { apiKey, baseUrl, model } = settings;
  const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

  const context = content.slice(0, 10000); // 暂时限制上下文长度，防止超出 Token 限制

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model || 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的数据库管理员分析助手，始终以结构化的 JSON 格式返回分析结果。',
        },
        {
          role: 'user',
          content: DEFAULT_PROMPT.replace('{CONTEXT}', context),
        },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const rawResult = JSON.parse(data.choices[0].message.content);

  return {
    fileName: fileName,
    summary: rawResult.summary || '未生成总结',
    risks: rawResult.risks || [],
    metrics: rawResult.metrics || [],
    suggestions: rawResult.suggestions || [],
    evidence: rawResult.evidence || '无具体证据',
    pendingChecks: rawResult.pendingChecks || [],
  };
}

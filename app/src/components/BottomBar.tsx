
import React, { useEffect, useRef, useState } from 'react';
import { exportToMarkdown, exportToPDF } from '../utils/export';
import { analyzeReport } from '../services/llm';
import type { AnalysisResult, LLMSettings } from '../types/analysis';

const ORACLE_KEYWORDS_STORAGE_KEY = 'oracle_keywords_whitelist_v1';

const DEFAULT_ORACLE_KEYWORDS = [
  'oracle', 'awr', 'ash', 'sql', 'sql_id', 'db time', 'db cpu', 'wait event',
  'tablespace', 'undo', 'redo', 'pga', 'sga', 'rac', 'dataguard', '执行计划',
  '表空间', '慢sql', '锁等待', '巡检', '归档', '实例'
];

interface BottomBarProps {
  onResultGenerated: (result: AnalysisResult) => void;
  settings: LLMSettings;
  onLoadingChange: (loading: boolean) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onResultGenerated, settings, onLoadingChange }) => {
  const [question, setQuestion] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [oracleKeywords, setOracleKeywords] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(ORACLE_KEYWORDS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_ORACLE_KEYWORDS;
    } catch {
      return DEFAULT_ORACLE_KEYWORDS;
    }
  });
  const [showKeywordSettings, setShowKeywordSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(ORACLE_KEYWORDS_STORAGE_KEY, JSON.stringify(oracleKeywords));
  }, [oracleKeywords]);

  const handleShortcutClick = (action: string) => {
    if (action === '导出 Markdown') {
      exportToMarkdown();
      return;
    }
    if (action === '导出 PDF') {
      exportToPDF();
      return;
    }
    alert(`快捷操作: ${action}`);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadedFileName(file.name);
    const lowerName = file.name.toLowerCase();
    const allowedExtensions = ['.html', '.htm', '.txt', '.log', '.svg'];
    if (!allowedExtensions.some(ext => lowerName.endsWith(ext))) {
      setAssistantReply('当前仅支持上传 HTML/TXT/LOG/SVG 文件。');
      return;
    }

    try {
      const rawText = await file.text();
      setFileContent(rawText);
      setAssistantReply(`已接收文件《${file.name}》，请点击“开始分析”按钮。`);
    } catch {
      setAssistantReply('文件读取失败，请重试。');
    }
  };

  const handleStartAnalysis = async () => {
    if (!fileContent) {
      setAssistantReply('请先上传报告文件。');
      return;
    }

    if (!settings.apiKey) {
      setAssistantReply('请先在顶部设置按钮 (⚙️) 中配置 LLM API Key。');
      return;
    }

    onLoadingChange(true);
    setAssistantReply('正在通过 AI 分析报告，请稍候...');
    try {
      const result = await analyzeReport(fileContent, settings, uploadedFileName);
      onResultGenerated(result);
      setAssistantReply(`分析完成！报告：${uploadedFileName}`);
    } catch (err: any) {
      setAssistantReply(`分析失败: ${err.message}`);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleSendQuestion = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    setAssistantReply(`已收到你的 Oracle 问题：${trimmedQuestion}`);
    setQuestion('');
  };

  return (
    <div className="bottom-bar">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['管理汇报版', '技术详细版', '导出 Markdown', '导出 PDF'].map((action) => (
          <button
            key={action}
            onClick={() => handleShortcutClick(action)}
            style={{
              background: 'var(--border-sub)', border: 'none', color: 'var(--text-body)',
              borderRadius: '999px', padding: '4px 10px', fontSize: '11px', flexShrink: 0, cursor: 'pointer'
            }}
          >
            {action}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <button
          onClick={handleUploadClick}
          style={{
            background: 'transparent', border: '1px solid var(--border-sub)', color: 'var(--text-body)',
            borderRadius: '4px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap'
          }}
        >
          上传文件
        </button>
        
        {uploadedFileName && (
          <button
            onClick={handleStartAnalysis}
            style={{
              background: 'var(--color-primary)', border: 'none', color: 'white',
              borderRadius: '4px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap'
            }}
          >
            开始分析
          </button>
        )}

        <button
          onClick={() => setShowKeywordSettings(true)}
          style={{
            background: 'transparent', border: '1px solid var(--border-sub)', color: 'var(--text-body)',
            borderRadius: '4px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer', whiteSpace: 'nowrap'
          }}
        >
          白名单
        </button>

        <input
          ref={fileInputRef} type="file"
          accept=".html,.htm,.txt,.log,.svg"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <div
          style={{
            fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis',
            whiteSpace: 'nowrap', flex: 1
          }}
          title={uploadedFileName}
        >
          {uploadedFileName || '支持 .html / .txt / .log / .svg'}
        </div>
      </div>

      {showKeywordSettings && (
        <div style={{ marginBottom: '8px', border: '1px solid var(--border-main)', borderRadius: '6px', padding: '8px', background: 'var(--bg-page)' }}>
          <textarea
            value={oracleKeywords.join('\n')}
            onChange={(e) => setOracleKeywords(e.target.value.split('\n'))}
            rows={5}
            style={{ width: '100%', background: 'var(--bg-page)', border: '1px solid var(--border-main)', color: 'var(--text-body)', borderRadius: '4px', padding: '6px 8px', fontSize: '12px' }}
          />
          <button onClick={() => setShowKeywordSettings(false)} style={{ marginTop: '8px', background: 'var(--color-primary)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>关闭</button>
        </div>
      )}

      {assistantReply && (
        <div style={{ marginBottom: '8px', border: '1px solid var(--border-main)', borderRadius: '6px', padding: '6px 8px', fontSize: '12px', color: 'var(--text-body)', background: 'rgba(37, 99, 235, 0.08)' }}>
          {assistantReply}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text" value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="追问分析结果..."
          style={{ flex: 1, background: 'var(--bg-page)', border: '1px solid var(--border-main)', color: 'var(--text-body)', borderRadius: '4px', padding: '6px 8px', fontSize: '12px', outline: 'none' }}
        />
        <button onClick={handleSendQuestion} style={{ background: 'var(--color-primary)', border: 'none', color: 'white', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer' }}>发送</button>
      </div>
      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
        <div>v1.0.2</div>
        <div>© 青学会MOP技术社区</div>
      </div>
    </div>
  );
};

export default BottomBar;

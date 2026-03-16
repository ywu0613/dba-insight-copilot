
import React, { useEffect, useRef, useState } from 'react';
import { exportToMarkdown, exportToPDF } from '../utils/export';

const ORACLE_KEYWORDS_STORAGE_KEY = 'oracle_keywords_whitelist_v1';

const DEFAULT_ORACLE_KEYWORDS = [
  'oracle',
  'awr',
  'ash',
  'sql',
  'sql_id',
  'db time',
  'db cpu',
  'wait event',
  'tablespace',
  'undo',
  'redo',
  'pga',
  'sga',
  'rac',
  'dataguard',
  '执行计划',
  '表空间',
  '慢sql',
  '锁等待',
  '巡检',
  '归档',
  '实例'
];

const POLITE_ORACLE_ONLY_REPLY =
  '感谢你的输入。当前插件聚焦 Oracle 数据库场景（AWR/ASH/巡检/SQL 分析）。如果你愿意，我可以继续帮你分析 Oracle 相关内容。';

const normalizeKeywords = (keywords: string[]): string[] => {
  const normalized = keywords.map((keyword) => keyword.trim().toLowerCase()).filter(Boolean);
  return Array.from(new Set(normalized));
};

const parseKeywordsInput = (input: string): string[] => {
  return normalizeKeywords(input.split(/[\n,，;；]/g));
};

const loadOracleKeywords = (): string[] => {
  try {
    const raw = window.localStorage.getItem(ORACLE_KEYWORDS_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_ORACLE_KEYWORDS;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return DEFAULT_ORACLE_KEYWORDS;
    }

    const normalized = normalizeKeywords(parsed);
    return normalized.length > 0 ? normalized : DEFAULT_ORACLE_KEYWORDS;
  } catch {
    return DEFAULT_ORACLE_KEYWORDS;
  }
};

const isOracleRelated = (text: string, keywords: string[]): boolean => {
  const normalizedText = text.toLowerCase();
  return keywords.some((keyword) => normalizedText.includes(keyword));
};

const BottomBar: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [oracleKeywords, setOracleKeywords] = useState<string[]>(() => loadOracleKeywords());
  const [showKeywordSettings, setShowKeywordSettings] = useState(false);
  const [keywordEditorValue, setKeywordEditorValue] = useState('');
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

  const handleOpenKeywordSettings = () => {
    setKeywordEditorValue(oracleKeywords.join('\n'));
    setShowKeywordSettings(true);
  };

  const handleSaveKeywordSettings = () => {
    const parsedKeywords = parseKeywordsInput(keywordEditorValue);
    if (parsedKeywords.length === 0) {
      setAssistantReply('关键词至少保留 1 个，请调整后再保存。');
      return;
    }

    setOracleKeywords(parsedKeywords);
    setAssistantReply(`Oracle 关键词已更新（${parsedKeywords.length} 个）。`);
    setShowKeywordSettings(false);
  };

  const handleResetKeywordSettings = () => {
    setOracleKeywords(DEFAULT_ORACLE_KEYWORDS);
    setKeywordEditorValue(DEFAULT_ORACLE_KEYWORDS.join('\n'));
    setAssistantReply('已恢复默认 Oracle 关键词。');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }

    setUploadedFileName(file.name);

    const lowerName = file.name.toLowerCase();
    const allowedExtensions = ['.html', '.htm', '.txt', '.log', '.svg'];
    const isAllowed = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    if (!isAllowed) {
      setAssistantReply('当前仅支持上传 HTML/TXT/LOG/SVG 文件。');
      return;
    }

    try {
      const rawText = await file.text();
      const sampleText = `${file.name}\n${rawText.slice(0, 200000)}`;
      if (!isOracleRelated(sampleText, oracleKeywords)) {
        setAssistantReply(POLITE_ORACLE_ONLY_REPLY);
        return;
      }

      setAssistantReply(`已接收文件《${file.name}》，将按 Oracle 数据库场景继续分析。`);
    } catch {
      setAssistantReply('文件读取失败，请重试。');
    }
  };

  const handleSendQuestion = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    if (!isOracleRelated(trimmedQuestion, oracleKeywords)) {
      setAssistantReply(POLITE_ORACLE_ONLY_REPLY);
      return;
    }

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
              background: 'var(--border-sub)',
              border: 'none',
              color: 'var(--text-body)',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '11px',
              flexShrink: 0,
              cursor: 'pointer'
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
            background: 'transparent',
            border: '1px solid var(--border-sub)',
            color: 'var(--text-body)',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          上传文件
        </button>
        <button
          onClick={handleOpenKeywordSettings}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-sub)',
            color: 'var(--text-body)',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          关键词设置
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm,.txt,.log,.svg,image/svg+xml,text/html,text/plain"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <div
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1
          }}
          title={uploadedFileName}
        >
          {uploadedFileName || `支持 .html / .txt / .log / .svg（关键词 ${oracleKeywords.length} 个）`}
        </div>
      </div>

      {showKeywordSettings ? (
        <div
          style={{
            marginBottom: '8px',
            border: '1px solid var(--border-main)',
            borderRadius: '6px',
            padding: '8px',
            background: 'var(--bg-page)'
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-body)', marginBottom: '6px' }}>
            Oracle 白名单关键词（每行一个，或用逗号分隔）
          </div>
          <textarea
            value={keywordEditorValue}
            onChange={(event) => setKeywordEditorValue(event.target.value)}
            rows={5}
            style={{
              width: '100%',
              resize: 'vertical',
              background: 'var(--bg-page)',
              border: '1px solid var(--border-main)',
              color: 'var(--text-body)',
              borderRadius: '4px',
              padding: '6px 8px',
              fontSize: '12px',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={handleSaveKeywordSettings}
              style={{
                background: 'var(--color-primary)',
                border: 'none',
                color: 'white',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              保存
            </button>
            <button
              onClick={handleResetKeywordSettings}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-sub)',
                color: 'var(--text-body)',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              恢复默认
            </button>
            <button
              onClick={() => setShowKeywordSettings(false)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-sub)',
                color: 'var(--text-body)',
                borderRadius: '4px',
                padding: '6px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              取消
            </button>
          </div>
        </div>
      ) : null}

      {assistantReply ? (
        <div
          style={{
            marginBottom: '8px',
            border: '1px solid var(--border-main)',
            borderRadius: '6px',
            padding: '6px 8px',
            fontSize: '12px',
            color: 'var(--text-body)',
            background: 'rgba(37, 99, 235, 0.08)'
          }}
        >
          {assistantReply}
        </div>
      ) : null}

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendQuestion();
            }
          }}
          placeholder="追问分析结果..."
          style={{
            flex: 1,
            background: 'var(--bg-page)',
            border: '1px solid var(--border-main)',
            color: 'var(--text-body)',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: '12px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSendQuestion}
          style={{
            background: 'var(--color-primary)',
            border: 'none',
            color: 'white',
            borderRadius: '4px',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          发送
        </button>
      </div>

      <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>
        © 青学会MOP技术社区
      </div>
    </div>
  );
};

export default BottomBar;

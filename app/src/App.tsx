
import { useState, useEffect } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import SummaryCard from './components/SummaryCard';
import RiskListCard from './components/RiskListCard';
import MetricGridCard from './components/MetricGridCard';
import SuggestionCard from './components/SuggestionCard';
import EvidenceCard from './components/EvidenceCard';
import PendingCheckCard from './components/PendingCheckCard';
import type { AnalysisResult, LLMSettings } from './types/analysis';
import { loadSettings, saveSettings as saveLLMSettings } from './services/settings';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [settings, setSettings] = useState<LLMSettings>(() => loadSettings());
  const [showSettings, setShowSettings] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    saveLLMSettings(settings);
  }, [settings]);

  const handleSettingsChange = (newSettings: Partial<LLMSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="app-container">
      <TopBar 
        fileName={analysisResult?.fileName} 
        onSettingsClick={() => setShowSettings(true)} 
      />
      
      <div className="main-content">
        {showSettings ? (
          <div className="card settings-card" style={{ border: '2px solid var(--color-primary)' }}>
            <h3 className="card-title">LLM 配置 (大模型设置)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Base URL</label>
                <input 
                  type="text" 
                  value={settings.baseUrl} 
                  onChange={(e) => handleSettingsChange({ baseUrl: e.target.value })}
                  placeholder="https://api.openai.com/v1"
                  style={{ width: '100%', padding: '6px', background: 'var(--bg-page)', border: '1px solid var(--border-main)', color: 'var(--text-body)', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>API Key</label>
                <input 
                  type="password" 
                  value={settings.apiKey} 
                  onChange={(e) => handleSettingsChange({ apiKey: e.target.value })}
                  placeholder="Enter API Key"
                  style={{ width: '100%', padding: '6px', background: 'var(--bg-page)', border: '1px solid var(--border-main)', color: 'var(--text-body)', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Model Name</label>
                <input 
                  type="text" 
                  value={settings.model} 
                  onChange={(e) => handleSettingsChange({ model: e.target.value })}
                  placeholder="gpt-4o"
                  style={{ width: '100%', padding: '6px', background: 'var(--bg-page)', border: '1px solid var(--border-main)', color: 'var(--text-body)', borderRadius: '4px' }}
                />
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                style={{ background: 'var(--color-primary)', border: 'none', color: 'white', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                保存配置
              </button>
            </div>
          </div>
        ) : (
          <>
            {isAnalyzing ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--color-primary)', fontWeight: 600 }}>
                分析中，请稍候... (AI Analyzing...)
              </div>
            ) : analysisResult ? (
              <>
                <SummaryCard summary={analysisResult.summary} />
                <RiskListCard risks={analysisResult.risks} />
                <MetricGridCard metrics={analysisResult.metrics} />
                <SuggestionCard suggestions={analysisResult.suggestions} />
                <EvidenceCard evidence={analysisResult.evidence} />
                <PendingCheckCard checks={analysisResult.pendingChecks} />
              </>
            ) : (
              <div style={{ padding: '80px 20px', textAlign: 'center', opacity: 0.6 }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
                <div>请上传 Oracle AWR/ASH 或巡检报告 HTML/TXT 文件开始分析</div>
              </div>
            )}
          </>
        )}
      </div>
      
      <BottomBar 
        onResultGenerated={(result) => setAnalysisResult(result)} 
        settings={settings}
        onLoadingChange={setIsAnalyzing}
      />
    </div>
  );
}

export default App;

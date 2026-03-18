import { exportToMarkdown } from '../utils/export';

interface TopBarProps {
  fileName?: string;
  onSettingsClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ fileName, onSettingsClick }) => {
  return (
    <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-title)' }}>DBA Insight Copilot</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {fileName ? `${fileName} • Oracle Report` : 'Oracle DBA Side Panel'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={onSettingsClick}
          style={{ 
            background: 'transparent', border: '1px solid var(--border-sub)', 
            color: 'var(--text-body)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' 
          }}
          title="LLM Settings"
        >
          ⚙️
        </button>
        <button 
          onClick={exportToMarkdown}
          style={{ 
            background: 'transparent', border: '1px solid var(--border-sub)', 
            color: 'var(--text-body)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' 
          }}
        >
          导出
        </button>
      </div>
    </div>
  );
};

export default TopBar;

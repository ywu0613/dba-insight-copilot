import { exportToMarkdown } from '../utils/export';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-title)' }}>DBA Insight Copilot</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>awrrpt_1_200.html • Oracle AWR • <span style={{color: 'var(--color-risk-high)'}}>高风险</span></div>
      </div>
      <div>
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

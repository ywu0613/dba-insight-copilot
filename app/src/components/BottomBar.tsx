
import { exportToMarkdown, exportToPDF } from '../utils/export';

const BottomBar: React.FC = () => {
  const handleShortcutClick = (action: string) => {
    if (action === '导出 Markdown') {
      exportToMarkdown();
    } else if (action === '导出 PDF') {
      exportToPDF();
    } else {
      alert(`快捷操作: ${action}`);
    }
  };

  return (
    <div className="bottom-bar">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['管理汇报版', '技术详细版', '导出 Markdown', '导出 PDF'].map(action => (
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
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="追问分析结果..." 
          style={{
            flex: 1, background: 'var(--bg-page)', border: '1px solid var(--border-main)',
            color: 'var(--text-body)', borderRadius: '4px', padding: '6px 8px', fontSize: '12px', outline: 'none'
          }} 
        />
        <button style={{
          background: 'var(--color-primary)', border: 'none', color: 'white',
          borderRadius: '4px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer'
        }}>发送</button>
      </div>
    </div>
  );
};

export default BottomBar;

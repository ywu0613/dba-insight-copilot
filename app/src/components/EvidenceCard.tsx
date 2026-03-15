

const EvidenceCard: React.FC = () => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 className="card-title" style={{ marginBottom: 0 }}>证据片段</h3>
        <button style={{ 
          background: 'transparent', border: 'none', color: 'var(--color-primary)', 
          fontSize: '12px', cursor: 'pointer', padding: 0
        }}>定位到原文 ↗</button>
      </div>
      
      <div style={{ background: 'var(--bg-top-bottom)', borderRadius: '8px', padding: '10px', overflowX: 'auto' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-body)', marginBottom: '6px' }}>Top Events Preview</div>
        <table style={{ width: '100%', fontSize: '11px', textAlign: 'left', borderCollapse: 'collapse', color: 'var(--text-muted)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-sub)' }}>
              <th style={{ padding: '4px 0', fontWeight: 'normal' }}>Event</th>
              <th style={{ padding: '4px 0', fontWeight: 'normal' }}>Waits</th>
              <th style={{ padding: '4px 0', fontWeight: 'normal' }}>Time(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '4px 0' }}>db file seq read</td>
              <td style={{ padding: '4px 0' }}>1,234,567</td>
              <td style={{ padding: '4px 0' }}>18,500</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>log file sync</td>
              <td style={{ padding: '4px 0' }}>56,789</td>
              <td style={{ padding: '4px 0' }}>1,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvidenceCard;



const MetricGridCard: React.FC = () => {
  return (
    <div className="card">
      <h3 className="card-title">关键指标</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '12px' }}>
          <div className="text-small" style={{ marginBottom: '4px' }}>DB Time</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-title)' }}>1,432<span style={{ fontSize: '12px', fontWeight: 'normal', color: 'var(--text-muted)' }}> mins</span></div>
        </div>
        <div style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '12px' }}>
          <div className="text-small" style={{ marginBottom: '4px' }}>DB CPU</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-title)' }}>850<span style={{ fontSize: '12px', fontWeight: 'normal', color: 'var(--text-muted)' }}> mins</span></div>
        </div>
        <div style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '12px' }}>
          <div className="text-small" style={{ marginBottom: '4px' }}>Top Wait 占比</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-risk-high)' }}>45%</div>
        </div>
        <div style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '12px' }}>
          <div className="text-small" style={{ marginBottom: '4px' }}>可疑 SQL 数量</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-risk-mid)' }}>5<span style={{ fontSize: '12px', fontWeight: 'normal', color: 'var(--text-muted)' }}> 个</span></div>
        </div>
      </div>
    </div>
  );
};

export default MetricGridCard;

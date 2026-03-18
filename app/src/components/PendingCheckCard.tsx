

interface PendingCheckCardProps {
  checks: string[];
}

const PendingCheckCard: React.FC<PendingCheckCardProps> = ({ checks }) => {
  return (
    <div className="card">
      <h3 className="card-title">待确认项</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {checks.map((check, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border-sub)', flexShrink: 0 }}></div>
            <div style={{ fontSize: '13px', color: 'var(--text-body)' }}>{check}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingCheckCard;

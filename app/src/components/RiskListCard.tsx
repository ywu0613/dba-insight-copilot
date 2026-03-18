

interface RiskItem {
  title: string;
  description: string;
  severity: 'high' | 'mid' | 'low';
}

interface RiskListCardProps {
  risks: RiskItem[];
}

const getLevelColor = (level: string) => {
  if (level === 'high') return 'var(--color-risk-high)';
  if (level === 'mid') return 'var(--color-risk-mid)';
  return 'var(--color-risk-low)';
};

const RiskListCard: React.FC<RiskListCardProps> = ({ risks }) => {
  return (
    <div className="card">
      <h3 className="card-title">风险摘要</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {risks.map((risk, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              backgroundColor: getLevelColor(risk.severity), marginTop: '6px', flexShrink: 0 
            }}></div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-body)' }}>{risk.title}</div>
              <div className="text-small">{risk.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskListCard;

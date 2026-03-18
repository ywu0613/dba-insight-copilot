

interface MetricItem {
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
}

interface MetricGridCardProps {
  metrics: MetricItem[];
}

const getStatusColor = (status: string) => {
  if (status === 'critical') return 'var(--color-risk-high)';
  if (status === 'warning') return 'var(--color-risk-mid)';
  return 'var(--text-title)';
};

const MetricGridCard: React.FC<MetricGridCardProps> = ({ metrics }) => {
  return (
    <div className="card">
      <h3 className="card-title">关键指标</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {metrics.map((metric, index) => (
          <div key={index} style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '12px' }}>
            <div className="text-small" style={{ marginBottom: '4px' }}>{metric.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: getStatusColor(metric.status) }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricGridCard;

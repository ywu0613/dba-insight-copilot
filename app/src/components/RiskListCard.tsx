

const risks = [
  { level: 'high', title: '高 Buffer Gets SQL 暴增', desc: 'Top 1 SQL 占用了 45% 的逻辑读。' },
  { level: 'high', title: '单块读延迟上升', desc: 'db file sequential read 平均延迟达到 15ms。' },
  { level: 'mid', title: '硬解析过高', desc: '每秒硬解析超过 100 次，需排查绑定变量使用。' },
];

const getLevelColor = (level: string) => {
  if (level === 'high') return 'var(--color-risk-high)';
  if (level === 'mid') return 'var(--color-risk-mid)';
  return 'var(--color-risk-low)';
};

const RiskListCard: React.FC = () => {
  return (
    <div className="card">
      <h3 className="card-title">风险摘要</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {risks.map((risk, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              backgroundColor: getLevelColor(risk.level), marginTop: '6px', flexShrink: 0 
            }}></div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-body)' }}>{risk.title}</div>
              <div className="text-small">{risk.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskListCard;

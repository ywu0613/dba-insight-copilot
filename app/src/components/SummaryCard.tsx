

const SummaryCard: React.FC = () => {
  return (
    <div className="card">
      <h3 className="card-title">总体结论</h3>
      <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-body)' }}>
        当前瓶颈主要集中在单块读等待与高 Buffer Gets SQL。本次问题更偏向 IO 与执行计划问题，而非 CPU 饱和。系统处于高负载运行状态，请注意防范雪崩风险。
      </div>
    </div>
  );
};

export default SummaryCard;

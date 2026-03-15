

const PendingCheckCard: React.FC = () => {
  return (
    <div className="card">
      <h3 className="card-title">待确认项</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border-sub)', flexShrink: 0 }}></div>
          <div style={{ fontSize: '13px', color: 'var(--text-body)' }}>确认近期是否收集了统计信息</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border-sub)', flexShrink: 0 }}></div>
          <div style={{ fontSize: '13px', color: 'var(--text-body)' }}>确认业务峰值是否异常波动</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--border-sub)', flexShrink: 0 }}></div>
          <div style={{ fontSize: '13px', color: 'var(--text-body)' }}>联系系统管排查底层存储是否存在坏块或者硬件瓶颈</div>
        </div>
      </div>
    </div>
  );
};

export default PendingCheckCard;

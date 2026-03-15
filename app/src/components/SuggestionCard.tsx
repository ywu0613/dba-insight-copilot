

const SuggestionCard: React.FC = () => {
  return (
    <div className="card">
      <h3 className="card-title">优化建议</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-body)', marginBottom: '4px' }}>1. 优先核查 Top SQL 执行计划</div>
          <div className="text-small">核查 sql_id: 1a2b3c4d5e 及其执行计划是否产生剧烈抖动，导致 Buffer Gets 突增。</div>
        </div>
        <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-body)', marginBottom: '4px' }}>2. 检查存储层 IO 延迟</div>
          <div className="text-small">单块读飙升可能与存储层响应变慢有关，建议同步联系存储管理员协助排查。</div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;

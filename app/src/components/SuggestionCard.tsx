

interface SuggestionCardProps {
  suggestions: string[];
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestions }) => {
  return (
    <div className="card">
      <h3 className="card-title">优化建议</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {suggestions.map((suggestion, index) => (
          <div key={index} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-body)', marginBottom: '4px' }}>
              {index + 1}. {suggestion.split('\n')[0]}
            </div>
            {suggestion.includes('\n') && (
              <div className="text-small">{suggestion.split('\n').slice(1).join('\n')}</div>
            )}
            {!suggestion.includes('\n') && (
              <div className="text-small">根据分析结果提供的优化建议。</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCard;

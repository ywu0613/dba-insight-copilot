

interface SummaryCardProps {
  summary: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div className="card">
      <h3 className="card-title">总体结论</h3>
      <div style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-body)' }}>
        {summary}
      </div>
    </div>
  );
};

export default SummaryCard;

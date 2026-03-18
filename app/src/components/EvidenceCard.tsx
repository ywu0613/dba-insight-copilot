

interface EvidenceCardProps {
  evidence: string;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 className="card-title" style={{ marginBottom: 0 }}>分析证词 (AI Evidence)</h3>
      </div>
      
      <div style={{ background: 'var(--bg-top-bottom)', borderRadius: '8px', padding: '10px', overflowX: 'auto' }}>
        <pre style={{ 
          fontSize: '11px', 
          color: 'var(--text-muted)', 
          whiteSpace: 'pre-wrap', 
          margin: 0,
          fontFamily: 'monospace' 
        }}>
          {evidence}
        </pre>
      </div>
    </div>
  );
};

export default EvidenceCard;

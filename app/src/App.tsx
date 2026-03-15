
import './App.css';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import SummaryCard from './components/SummaryCard';
import RiskListCard from './components/RiskListCard';
import MetricGridCard from './components/MetricGridCard';
import SuggestionCard from './components/SuggestionCard';
import EvidenceCard from './components/EvidenceCard';
import PendingCheckCard from './components/PendingCheckCard';

function App() {
  return (
    <div className="app-container">
      <TopBar />
      
      <div className="main-content">
        <SummaryCard />
        <RiskListCard />
        <MetricGridCard />
        <SuggestionCard />
        <EvidenceCard />
        <PendingCheckCard />
      </div>
      
      <BottomBar />
    </div>
  );
}

export default App;

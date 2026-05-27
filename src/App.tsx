import { useState } from 'react';
import Sidebar, { type PageType } from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import AIPortrait from './pages/AIPortrait';
import SmartCrowd from './pages/SmartCrowd';
import AIContent from './pages/AIContent';
import PushTasks from './pages/PushTasks';
import AutoFollowup from './pages/AutoFollowup';
import MessageChannels from './pages/MessageChannels';
import DataAnalysis from './pages/DataAnalysis';
import RiskWarning from './pages/RiskWarning';
import AuditCompliance from './pages/AuditCompliance';
import SystemConfig from './pages/SystemConfig';

const pageComponents: Record<PageType, React.ComponentType> = {
  dashboard: Dashboard,
  patients: Patients,
  'ai-portrait': AIPortrait,
  'smart-crowd': SmartCrowd,
  'ai-content': AIContent,
  'push-tasks': PushTasks,
  'auto-followup': AutoFollowup,
  'message-channels': MessageChannels,
  'data-analysis': DataAnalysis,
  'risk-warning': RiskWarning,
  'audit-compliance': AuditCompliance,
  'system-config': SystemConfig,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const PageComponent = pageComponents[currentPage];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0f172a' }}>
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header currentPage={currentPage} />
        
        <main className="flex-1 overflow-y-auto" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #0d1929 100%)' }}>
          <PageComponent />
        </main>
      </div>
    </div>
  );
}

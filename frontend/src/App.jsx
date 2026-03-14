import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './components/LandingPage'
import ChatDashboard from './components/ChatDashboard'
import DomainPage from './components/DomainPage'
import FeaturesPage from './components/FeaturesPage'

function AppContent() {
  const [view, setView] = useState('landing'); // 'landing', 'features', 'domains', 'chat'
  const [domain, setDomain] = useState('general');

  const startApp = () => setView('domains');
  const selectDomain = (d) => {
    setDomain(d);
    setView('chat');
  };

  if (view === 'landing') {
    return <LandingPage onStart={startApp} onNavigate={setView} />;
  }

  if (view === 'features') {
    return <FeaturesPage onNavigate={setView} onStart={startApp} />;
  }

  if (view === 'domains') {
    return <DomainPage onSelect={selectDomain} onNavigate={setView} onStart={startApp} />;
  }

  return <ChatDashboard domain={domain} setDomain={setDomain} onGoBack={() => setView('domains')} />;
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App

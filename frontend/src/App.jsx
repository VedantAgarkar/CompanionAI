import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './components/LandingPage'
import ChatDashboard from './components/ChatDashboard'
import DomainPage from './components/DomainPage'
import FeaturesPage from './components/FeaturesPage'
import AboutPage from './components/AboutPage'

function AppContent() {
  const [view, setView] = useState('landing'); // 'landing', 'features', 'domains', 'about', 'chat'
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

  if (view === 'about') {
    return <AboutPage onNavigate={setView} onStart={startApp} />;
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

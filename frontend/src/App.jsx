import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'
import LandingPage from './components/LandingPage'
import ChatDashboard from './components/ChatDashboard'
import DomainPage from './components/DomainPage'
import FeaturesPage from './components/FeaturesPage'
import AboutPage from './components/AboutPage'
import AuthPage from './components/AuthPage'
import AdminDashboard from './components/AdminDashboard'

function AppContent() {
  const [view, setView] = useState('landing'); // 'landing', 'features', 'domains', 'about', 'signin', 'signup', 'admin', 'chat'
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

  if (view === 'signin') {
    return <AuthPage onNavigate={setView} initialMode="signin" />;
  }

  if (view === 'signup') {
    return <AuthPage onNavigate={setView} initialMode="signup" />;
  }

  if (view === 'admin') {
    return <AdminDashboard onNavigate={setView} />;
  }

  if (view === 'domains') {
    return <DomainPage onSelect={selectDomain} onNavigate={setView} onStart={startApp} />;
  }

  return <ChatDashboard domain={domain} setDomain={setDomain} onGoBack={() => setView('domains')} />;
}

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App


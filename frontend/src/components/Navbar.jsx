import React, { useState, useRef, useEffect } from 'react';
import { Zap, Globe, ChevronDown, Sun, Moon, LogOut, Crown, LayoutDashboard, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const Navbar = ({ onNavigate, onStart }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  const currentLanguageLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogout(false);
    onNavigate('landing');
  };

  const isAdmin = user?.role === 'admin';
  const firstName = user?.name?.split(' ')[0] || '';

  return (
    <nav className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[var(--bg-primary)]/75 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/20'
        : 'bg-transparent border-b border-transparent'
    }`}>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">CompanionAI</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col p-4 gap-2">
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('landing'); }} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold">
            {t('nav.home')}
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('features'); }} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold">
            {t('nav.features')}
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('domains'); }} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold">
            {t('nav.domains')}
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onNavigate('about'); }} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold">
            {t('nav.about')}
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:py-5">
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('landing')}
        >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl sm:text-2xl md:text-3xl hidden min-[400px]:block font-bold tracking-tight text-[var(--text-primary)]">CompanionAI</span>
        </div>
      </div>

      <div className="hidden md:flex gap-10 text-[var(--text-secondary)] text-base font-semibold items-center">
        <button onClick={() => onNavigate('landing')} className="hover:text-[var(--text-primary)] transition-colors tracking-wide">{t('nav.home')}</button>
        <button onClick={() => onNavigate('features')} className="hover:text-[var(--text-primary)] transition-colors tracking-wide">{t('nav.features')}</button>
        <button onClick={() => onNavigate('domains')} className="hover:text-[var(--text-primary)] transition-colors tracking-wide">{t('nav.domains')}</button>
        <button onClick={() => onNavigate('about')} className="hover:text-[var(--text-primary)] transition-colors tracking-wide">{t('nav.about')}</button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1 sm:gap-2 bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-color)] rounded-xl px-2 sm:px-4 py-2 hover:border-blue-500/50 transition-all group"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-blue-400 transition-colors" />
            <span className="hidden sm:inline text-sm sm:text-base font-semibold text-[var(--text-secondary)]">{currentLanguageLabel}</span>
            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-[var(--text-secondary)] transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute top-full mt-2 right-0 w-40 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 text-base transition-colors flex items-center justify-between ${
                    i18n.language === lang.code 
                    ? 'bg-blue-600 text-white' 
                    : 'text-[var(--text-secondary)] hover:bg-white/5'
                  }`}
                >
                  {lang.label}
                  {i18n.language === lang.code && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auth / Profile Button */}
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowLogout(!showLogout)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all border active:scale-95 ${
                isAdmin
                  ? 'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20'
                  : 'border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20'
              }`}
            >
              {isAdmin && <Crown className="w-4 h-4 text-yellow-400" />}
              <span className={`text-base font-bold ${isAdmin ? 'text-yellow-400' : 'text-[var(--text-primary)]'}`}>
                {firstName}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showLogout ? 'rotate-180' : ''} ${isAdmin ? 'text-yellow-400' : 'text-[var(--text-secondary)]'}`} />
            </button>

            {showLogout && (
              <div className="absolute top-full mt-3 right-0 w-56 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl p-1">
                <div className="px-4 py-3 border-b border-[var(--border-color)] mb-1">
                  <p className={`font-bold text-base ${isAdmin ? 'text-yellow-400' : 'text-[var(--text-primary)]'}`}>
                    {isAdmin && '👑 '}{user.name}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] truncate">{user.email}</p>
                  {isAdmin && <p className="text-sm text-yellow-500/80 font-semibold mt-1">Administrator</p>}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => { setShowLogout(false); onNavigate('admin'); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-base text-yellow-400 hover:bg-yellow-500/10 rounded-xl transition-colors font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('signin')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 sm:px-7 sm:py-2.5 rounded-full font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-500/20 text-white active:scale-95 whitespace-nowrap"
          >
            {t('nav.signIn')}
          </button>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;

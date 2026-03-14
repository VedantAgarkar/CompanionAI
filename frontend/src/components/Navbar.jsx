import React, { useState, useRef, useEffect } from 'react';
import { Zap, Globe, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onNavigate, onStart }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  const currentLanguageLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <nav className="w-full flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-[var(--border-color)] relative z-50">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate('landing')}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">CompanionAI</span>
      </div>

      <div className="hidden md:flex gap-8 text-[var(--text-secondary)] text-sm font-medium items-center">
        <button onClick={() => onNavigate('landing')} className="hover:text-[var(--text-primary)] transition-colors">{t('nav.home')}</button>
        <button 
          onClick={() => onNavigate('features')} 
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          {t('nav.features')}
        </button>
        <button onClick={() => onNavigate('domains')} className="hover:text-[var(--text-primary)] transition-colors">{t('nav.domains')}</button>
        <button 
          onClick={() => { onNavigate('landing'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          {t('nav.contact')}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Custom Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 bg-[var(--bg-secondary)] backdrop-blur-md border border-[var(--border-color)] rounded-xl px-4 py-2 hover:border-blue-500/50 transition-all group"
          >
            <Globe className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">{currentLanguageLabel}</span>
            <ChevronDown className={`w-3 h-3 text-[var(--text-secondary)] transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLangOpen && (
            <div className="absolute top-full mt-2 right-0 w-40 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${
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

        <button 
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20 text-white active:scale-95"
        >
          {t('nav.signIn')}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

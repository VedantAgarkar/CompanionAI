import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import DarkVeil from './DarkVeil';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const AuthPage = ({ onNavigate, initialMode = 'signin' }) => {
  const { t } = useTranslation();
  const { login } = useUser();
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false
  });

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormData({ email: '', password: '', confirmPassword: '', name: '', rememberMe: false });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError('');
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await axios.post(`${API_BASE}/auth/signup`, {
          full_name: formData.name,
          email: formData.email,
          password: formData.password
        });
        // Auto login or switch to login
        setMode('signin');
        setError('Account created successfully! Please sign in.');
      } else {
        const response = await axios.post(`${API_BASE}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        login(response.data.access_token, response.data.role);
        onNavigate('domains');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const direction = mode === 'signin' ? -1 : 1;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 opacity-40">
        <DarkVeil
          hueShift={mode === 'signin' ? 220 : 140}
          noiseIntensity={0.03}
          scanlineIntensity={0.1}
          speed={1.0}
          scanlineFrequency={0.3}
          warpAmount={0.2}
        />
      </div>

      {/* Back Button */}
      <button 
        onClick={() => onNavigate('landing')}
        className="absolute top-8 left-8 flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors group z-20"
      >
        <div className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-white/5 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[32px] p-8 md:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={mode}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">{mode === 'signin' ? t('auth.signInTitle') : t('auth.signUpTitle')}</h1>
                <p className="text-[var(--text-secondary)]">{mode === 'signin' ? t('auth.signInSub') : t('auth.signUpSub')}</p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mb-6 p-4 rounded-2xl text-sm font-medium ${error.includes('successfully') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {error}
                </motion.div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-secondary)] ml-1">{t('auth.name')}</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] transition-colors group-focus-within:text-blue-400" />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-secondary)] ml-1">{t('auth.email')}</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] transition-colors group-focus-within:text-blue-400" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-semibold text-[var(--text-secondary)]">{t('auth.password')}</label>
                    {mode === 'signin' && (
                      <button type="button" className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
                        {t('auth.forgot')}
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] transition-colors group-focus-within:text-blue-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-12 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-secondary)] ml-1">{t('auth.confirmPassword')}</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] transition-colors group-focus-within:text-blue-400" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                      />
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="flex items-center gap-2 ml-1">
                    <div className="relative flex items-center h-5">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-[var(--border-color)] bg-[var(--bg-primary)] text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="rememberMe" className="text-sm text-[var(--text-secondary)] cursor-pointer select-none">
                      {t('auth.rememberMe')}
                    </label>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group mt-4"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      {mode === 'signin' ? t('auth.btnSignIn') : t('auth.btnSignUp')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center pt-6 border-t border-[var(--border-color)]">
                <p className="text-[var(--text-secondary)] text-sm">
                  {mode === 'signin' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
                  >
                    {mode === 'signin' ? t('auth.btnSignUp') : t('auth.btnSignIn')}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Decorative elements outside the card */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default AuthPage;

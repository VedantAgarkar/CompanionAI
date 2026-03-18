import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Briefcase, Shrub, Shield, Zap, Layout, ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const LandingPage = ({ onStart, onNavigate }) => {
  const { t } = useTranslation();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setSending(true);
    try {
      await axios.post(`${API_BASE}/contact/`, contactForm);
      setToast('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      setToast('Failed to send. Please try again.');
      setTimeout(() => setToast(null), 4000);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-hidden transition-colors duration-300 pt-24">
      <Navbar onNavigate={onNavigate} onStart={onStart} />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 md:pb-32 px-4 md:px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] opacity-80">
            <DarkVeil
              hueShift={160}
              noiseIntensity={0.05}
              scanlineIntensity={0.2}
              speed={2.0}
              scanlineFrequency={0.5}
              warpAmount={0.3}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 md:mb-8">
              {t('landing.heroTitle1')}<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{t('landing.heroTitle2')}</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto">
              {t('landing.heroSub')}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => onNavigate('signin')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all shadow-lg shadow-blue-500/20"
              >
                {t('landing.launchBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard 
              icon={<Rocket className="w-6 h-6 text-blue-400" />}
              title={t('landing.feature1Title')}
              desc={t('landing.feature1Desc')}
            />
            <FeatureCard 
              icon={<Briefcase className="w-6 h-6 text-emerald-400" />}
              title={t('landing.feature2Title')}
              desc={t('landing.feature2Desc')}
            />
            <FeatureCard 
              icon={<Shrub className="w-6 h-6 text-amber-400" />}
              title={t('landing.feature3Title')}
              desc={t('landing.feature3Desc')}
            />
          </div>
          <div className="mt-16 text-center">
            <button 
              onClick={() => onNavigate('features')}
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
            >
              Discover All Features <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-[var(--bg-primary)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center text-[var(--text-primary)]">{t('landing.contactTitle')}</h2>
          <p className="text-[var(--text-secondary)] mb-8 md:mb-12 text-base md:text-lg text-center">{t('landing.contactDesc')}</p>
          
          <form onSubmit={handleContactSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-6 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[var(--text-primary)] ml-1">Your Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project or inquiry..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
                className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Message <Send className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 backdrop-blur-xl shadow-2xl shadow-emerald-500/10"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-300 font-semibold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] hover:border-blue-500/30 transition-all group shadow-sm">
    <div className="w-12 h-12 bg-blue-600/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{title}</h3>
    <p className="text-[var(--text-secondary)] leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;

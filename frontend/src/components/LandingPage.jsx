import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Briefcase, Shrub, Shield, Zap, Layout, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';

const LandingPage = ({ onStart, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] overflow-hidden transition-colors duration-300">
      <Navbar onNavigate={onNavigate} onStart={onStart} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
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
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
              {t('landing.heroTitle1')}<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{t('landing.heroTitle2')}</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('landing.heroSub')}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={onStart}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20"
              >
                {t('landing.launchBtn')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
      <section id="contact" className="py-24 px-6 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">{t('landing.contactTitle')}</h2>
          <p className="text-[var(--text-secondary)] mb-10 text-lg">{t('landing.contactDesc')}</p>
          <a href="mailto:contact@companionai.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
            {t('landing.contactBtn')}
          </a>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--border-color)] hover:border-blue-500/30 transition-all group shadow-sm">
    <div className="w-12 h-12 bg-blue-600/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{title}</h3>
    <p className="text-[var(--text-secondary)] leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Layout,
  ArrowRight
} from 'lucide-react';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';

const FeaturesPage = ({ onNavigate, onStart }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: t('featuresPage.f1Title'),
      desc: t('featuresPage.f1Desc'),
      delay: 0.1
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: t('featuresPage.f2Title'),
      desc: t('featuresPage.f2Desc'),
      delay: 0.2
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: t('featuresPage.f3Title'),
      desc: t('featuresPage.f3Desc'),
      delay: 0.3
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: t('featuresPage.f4Title'),
      desc: t('featuresPage.f4Desc'),
      delay: 0.4
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      title: t('featuresPage.f5Title'),
      desc: t('featuresPage.f5Desc'),
      delay: 0.5
    },
    {
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      title: t('featuresPage.f6Title'),
      desc: t('featuresPage.f6Desc'),
      delay: 0.6
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] relative overflow-x-hidden pt-24">
      <Navbar onNavigate={onNavigate} onStart={onStart} />
      
      {/* Background Effect */}
      <div className="fixed inset-0 -z-10 opacity-40">
        <DarkVeil
          hueShift={220}
          noiseIntensity={0.03}
          scanlineIntensity={0.1}
          speed={1.0}
          scanlineFrequency={0.3}
          warpAmount={0.2}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-20 pb-20 md:pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
            {t('featuresPage.title')}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            {t('featuresPage.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 sm:p-8 rounded-3xl bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {feature.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-20 md:mt-32 p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-blue-600/20 to-emerald-600/10 border border-blue-500/20 text-center backdrop-blur-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to experience these features?</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of founders and farmers who are already using CompanionAI to transform their decision-making.
          </p>
          <button 
            onClick={onStart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-lg md:text-xl transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            {t('landing.launchBtn')}
          </button>
        </motion.div>
      </main>
    </div>
  );
};

export default FeaturesPage;

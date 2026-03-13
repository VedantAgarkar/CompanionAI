import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Rocket, Sprout, Bot } from 'lucide-react';
import Navbar from './Navbar';

const DomainPage = ({ onSelect, onNavigate, onStart }) => {
  const { t } = useTranslation();

  const domains = [
    {
      title: t('domains.businessTitle'),
      icon: Briefcase,
      color: 'text-blue-400',
      bgColor: 'group-hover:bg-blue-600/10',
      description: t('domains.businessDesc'),
      requirements: t('domains.businessReq'),
      domain: "business"
    },
    {
      title: t('domains.startupTitle'),
      icon: Rocket,
      color: 'text-emerald-400',
      bgColor: 'group-hover:bg-emerald-600/10',
      description: t('domains.startupDesc'),
      requirements: t('domains.startupReq'),
      domain: "startup"
    },
    {
      title: t('domains.farmingTitle'),
      icon: Sprout,
      color: 'text-amber-400',
      bgColor: 'group-hover:bg-amber-600/10',
      description: t('domains.farmingDesc'),
      requirements: t('domains.farmingReq'),
      domain: "farming"
    },
    {
      title: t('domains.generalTitle'),
      icon: Bot,
      color: 'text-indigo-400',
      bgColor: 'group-hover:bg-indigo-600/10',
      description: t('domains.generalDesc'),
      requirements: t('domains.generalReq'),
      domain: "general"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-primary)] relative flex flex-col transition-colors duration-300">
      <Navbar onNavigate={onNavigate} onStart={onStart} />
      
      <div className="flex-grow py-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {t('domains.explore')}<span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{t('domains.aiDomains')}</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--card-bg)] backdrop-blur-sm rounded-3xl p-8 border border-[var(--border-color)] flex flex-col items-center text-center group hover:border-blue-500/30 transition-all duration-300 shadow-sm"
              >
                {/* Icon Container */}
                <div className={`w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-300 ${domain.bgColor}`}>
                  <domain.icon className={`w-10 h-10 ${domain.color}`} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-[var(--text-primary)]">
                  {domain.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-6">
                  {domain.description}
                </p>

                {/* Requirements/Details */}
                <p className="text-[var(--text-secondary)] opacity-70 text-[13px] italic mb-10 leading-relaxed min-h-[60px]">
                  {domain.requirements}
                </p>

                {/* Action Button */}
                <button
                  onClick={() => onSelect(domain.domain)}
                  className="mt-auto w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  {t('domains.launch')} {domain.title.split(' ')[0]}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainPage;

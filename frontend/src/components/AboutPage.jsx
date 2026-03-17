import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';
import vedImg from '../../imgs/ved.jpg';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="4"/>
    <line x1="8" y1="11" x2="8" y2="17"/>
    <line x1="8" y1="8" x2="8" y2="8.01"/>
    <path d="M12 17v-6"/>
    <path d="M12 14a3 3 0 0 1 6 0v3"/>
  </svg>
);

const AboutPage = ({ onNavigate, onStart }) => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      href: 'https://www.instagram.com/vedant_agarkar_07/',
      color: 'hover:text-pink-400 hover:border-pink-400/50 hover:shadow-pink-500/20',
      gradient: 'from-pink-500 to-purple-600',
    },
    {
      icon: <EmailIcon />,
      label: 'Email',
      href: 'mailto:vedantagarkar@gmail.com',
      color: 'hover:text-blue-400 hover:border-blue-400/50 hover:shadow-blue-500/20',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vedant-agarkar-786b81310',
      color: 'hover:text-sky-400 hover:border-sky-400/50 hover:shadow-sky-500/20',
      gradient: 'from-sky-500 to-blue-700',
    },
  ];

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] relative overflow-x-hidden pt-24">
      <Navbar onNavigate={onNavigate} onStart={onStart} />
      
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <DarkVeil
          hueShift={280}
          noiseIntensity={0.02}
          scanlineIntensity={0.05}
          speed={0.8}
          scanlineFrequency={0.2}
          warpAmount={0.15}
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent italic">
            {t('aboutPage.title')}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed font-light">
            {t('aboutPage.subtitle')}
          </p>
        </motion.div>

        {/* Single Centered Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col items-center text-center max-w-sm"
          >
            {/* Profile Image Circle */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-56 h-56 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-white/20 to-white/5 relative z-10"
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl relative bg-[var(--bg-secondary)] flex items-center justify-center">
                  <img
                    src={vedImg}
                    alt="Vedant Agarkar"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>
              
              {/* Decorative Ring */}
              <div className="absolute -inset-4 border border-blue-500/10 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-blue-500/30 transition-colors" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold mb-2 tracking-tight">
                {t('aboutPage.team.0.name')}
              </h3>
              <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-4">
                {t('aboutPage.team.0.role')}
              </p>
              <div className="h-px w-12 bg-blue-500/30 mx-auto mb-6 group-hover:w-24 transition-all duration-500" />
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs font-medium mb-8">
                {t('aboutPage.team.0.bio')}
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center justify-center w-11 h-11 rounded-xl
                      border border-white/10 bg-white/5 backdrop-blur-sm
                      text-[var(--text-secondary)] transition-all duration-300
                      shadow-lg hover:shadow-xl
                      ${link.color}
                    `}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 p-16 rounded-[48px] bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden backdrop-blur-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Our Vision</h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed italic">
              "We believe that powerful AI shouldn't just be for big tech. Our mission is to put world-class decision intelligence into the hands of every founder and farmer, helping humanity grow smarter, together."
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default AboutPage;

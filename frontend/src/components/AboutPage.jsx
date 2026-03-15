import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';
import mandarImg from '../../imgs/Mandar Gopal Petkar .png';
import omImg from '../../imgs/Om Lahu Shinde.png';
import tauseefImg from '../../imgs/Tauseef Ahmad Shaikh Ansar.png';
import vikasImg from '../../imgs/Vikas Vasant Chavan.png';
const AboutPage = ({ onNavigate, onStart }) => {
  const { t } = useTranslation();

  const team = [
    {
      name: t('aboutPage.team.0.name'),
      role: t('aboutPage.team.0.role'),
      bio: t('aboutPage.team.0.bio'),
      image: mandarImg,
      color: "from-blue-500 to-indigo-600",
      delay: 0.1
    },
    {
      name: t('aboutPage.team.1.name'),
      role: t('aboutPage.team.1.role'),
      bio: t('aboutPage.team.1.bio'),
      image: omImg,
      color: "from-emerald-500 to-teal-600",
      delay: 0.2
    },
    {
      name: t('aboutPage.team.2.name'),
      role: t('aboutPage.team.2.role'),
      bio: t('aboutPage.team.2.bio'),
      image: tauseefImg,
      color: "from-purple-500 to-pink-600",
      delay: 0.3
    },
    {
      name: t('aboutPage.team.3.name'),
      role: t('aboutPage.team.3.role'),
      bio: t('aboutPage.team.3.bio'),
      image: vikasImg,
      color: "from-orange-500 to-rose-600",
      delay: 0.4
    }
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: member.delay }}
              className="group flex flex-col items-center text-center"
            >
              {/* Profile Image Circle */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 bg-gradient-to-tr from-white/20 to-white/5 relative z-10"
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl relative bg-[var(--bg-secondary)] flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
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
                transition={{ delay: member.delay + 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-2 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-4">
                  {member.role}
                </p>
                <div className="h-px w-12 bg-blue-500/30 mx-auto mb-6 group-hover:w-24 transition-all duration-500" />
                <p className="text-[var(--text-secondary)] leading-relaxed max-w-xs font-medium">
                  {member.bio}
                </p>
              </motion.div>
            </motion.div>
          ))}
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

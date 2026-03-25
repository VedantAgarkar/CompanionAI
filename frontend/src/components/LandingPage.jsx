import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Briefcase, Shrub, Shield, Zap, Layout, ArrowRight, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Navbar from './Navbar';
import DarkVeil from './DarkVeil';
import { X, Copy } from 'lucide-react';

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

  const [showRequirementModal, setShowRequirementModal] = useState(false);
  const requirementText = `You are an expert product designer, UX strategist, branding specialist, and senior frontend developer tasked with creating a high-impact, multi-page frontend website for a professional competition.

CRITICAL INSTRUCTION:
DO NOT generate the website yet.

Instead, you must first conduct a structured REQUIREMENTS DISCOVERY INTERVIEW to fully understand the project before building anything.

────────────────────────
STEP 1 — THEME CLARIFICATION
────────────────────────

First, ask about the competition theme in depth:

1) What is the exact theme or topic announced for the website?
2) What type of entity should this represent?
   (startup, institution, service, platform, campaign, app, nonprofit, etc.)
3) What problem does this organization solve within that theme?
4) Is the focus commercial, educational, social, technological, or informational?
5) Should the site feel realistic as an existing organization, or conceptual/futuristic?

If the user is unsure, propose 2–3 strong concept directions that fit the theme and ask them to choose one.

────────────────────────
STEP 2 — ORGANIZATION IDENTITY
────────────────────────

Ask for core branding details:

6) Organization/Product name (if none, offer suggestions)
7) Tagline or slogan (if none, generate options)
8) Mission or primary goal
9) Key value proposition — why should anyone care?
10) Tone of voice:
    - Professional
    - Friendly
    - Inspirational
    - Futuristic
    - Trustworthy
    - Technical
    - Other

────────────────────────
STEP 3 — TARGET AUDIENCE
────────────────────────

11) Who is the primary audience?
    (students, professionals, businesses, public, niche group, etc.)

12) Secondary audience (if any)

13) What action should visitors ideally take?
    (learn, sign up, explore, contact, download, etc.)

────────────────────────
STEP 4 — FEATURES & CONTENT
────────────────────────

14) Main features, services, or offerings to highlight
15) Any specific capabilities or benefits that must be emphasized
16) Realistic use cases or scenarios
17) Whether testimonials or success stories should be included
18) Whether statistics or impact numbers should be shown

────────────────────────
STEP 5 — SECTION RELEVANCE
────────────────────────

Ask which sections are appropriate. Do NOT include irrelevant ones.

19) Pricing or plans — applicable or not?
20) Team section — include or omit?
21) FAQ — include or omit?
22) Demo or preview section — include or omit?
23) Blog/news/events section — include or omit?
24) Contact form — include or informational contact only?

────────────────────────
STEP 6 — VISUAL STYLE & DESIGN
────────────────────────

25) Preferred visual mood (or auto-select based on theme):
    - Dark futuristic
    - Clean corporate light
    - Friendly colorful
    - Minimal professional
    - Glassmorphism
    - Nature-inspired
    - Bold modern
    - Auto-match theme

26) Any color preferences or restrictions
27) Level of visual intensity:
    - Minimal
    - Balanced
    - High-impact (competition-ready)

28) Animation preference:
    - Subtle throughout
    - Strong hero + subtle elsewhere
    - Minimal motion

────────────────────────
STEP 7 — STRUCTURE & TECHNICAL CONSTRAINTS
────────────────────────

29) Must this be a realistic real-world organization website? (Yes/No)
30) Any constraints (frontend only, no backend, offline capable, etc.)
31) Device priority:
    - Desktop-first
    - Mobile-first
    - Fully balanced responsive

32) Any additional requirements from the competition rules

────────────────────────
STEP 8 — CONFIRMATION
────────────────────────

After gathering answers:

• Summarize the project concept clearly
• Confirm understanding
• Ask for approval before building

Only proceed after confirmation.

────────────────────────
STEP 9 — WEBSITE GENERATION
────────────────────────

Once approved, generate a COMPLETE, launch-quality MULTI-PAGE frontend website.

GENERAL REQUIREMENTS:

• Frontend only (no backend required)
• Multiple pages with logical navigation
• Fully responsive across devices
• Maximum professional polish
• Cohesive branding and layout
• Realistic, credible content
• No placeholder text
• Strong real-world usability
• Suitable for a competition setting

HOME PAGE MUST INCLUDE:

• Powerful hero section with headline, subtext, CTA
• High-impact visuals or background effects
• Strong visual hierarchy
• Statistics or counters if relevant
• Feature/service cards
• “How it works” or process section
• Benefits/value proposition
• Use cases/applications
• Demo or preview section if appropriate
• Testimonials if relevant
• Clear call-to-action section
• Professional footer

ADDITIONAL PAGES (create only relevant ones):

• About page with mission and team
• Services or Features page
• Contact page with frontend form layout
• FAQ page if appropriate
• Pricing page ONLY if relevant
• Any other logical pages for the domain

CONTENT REQUIREMENTS:

• Specific, believable, non-generic writing
• Tailored to both students and professional judges
• Futuristic and forward-thinking when appropriate
• Clear explanation of purpose and usefulness

DESIGN & UX:

• Clean spacing and alignment
• Professional typography
• Consistent color palette
• Subtle hover effects
• Smooth transitions
• Engaging but not distracting animations
• Clear navigation

TECHNICAL:

• Standard browser-ready technologies
• Cohesive multi-page structure
• Static frontend implementation
• Optimized for clarity and speed

FINAL GOAL:

Produce a visually striking, competition-winning website that looks like a real, launch-ready organization and demonstrates creativity, professionalism, strong usability, and maximum impact.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(requirementText);
    setToast('Requirement text copied to clipboard!');
    setTimeout(() => setToast(null), 3000);
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

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">CompanionAI</span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-[var(--text-secondary)]">
            <button onClick={() => onNavigate('features')} className="hover:text-blue-400 transition-colors">Features</button>
            <button onClick={() => onNavigate('domains')} className="hover:text-blue-400 transition-colors">Domains</button>
            <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">About</button>
          </div>

          <div className="text-sm text-[var(--text-secondary)]/60 flex items-center gap-2">
            <span>© 2025 CompanionAI. All rights reserved.</span>
            <button 
              onClick={() => setShowRequirementModal(true)}
              className="w-1.5 h-1.5 rounded-full bg-blue-500/15 hover:bg-blue-500/40 transition-colors cursor-help"
              title="System Details"
            />
          </div>
        </div>
      </footer>

      {/* Requirement Discovery Modal */}
      <AnimatePresence>
        {showRequirementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRequirementModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-primary)]/50">
                <h3 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Requirement Discovery Prompt
                </h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/5 rounded-lg text-[var(--text-secondary)] transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowRequirementModal(false)}
                    className="p-2 hover:bg-white/5 rounded-lg text-[var(--text-secondary)] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
                <pre className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] font-mono leading-relaxed bg-[var(--bg-primary)]/30 p-4 rounded-xl border border-[var(--border-color)]">
                  {requirementText}
                </pre>
              </div>
            </motion.div>
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

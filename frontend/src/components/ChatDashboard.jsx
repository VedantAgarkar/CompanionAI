import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, ArrowLeft, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import MarkdownMessage from './MarkdownMessage';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const ChatDashboard = ({ domain, setDomain, onGoBack }) => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const domainOptions = [
    { key: 'general', label: t('chat.generalAI') },
    { key: 'business', label: t('chat.businessAI') },
    { key: 'startup', label: t('chat.startupAI') },
    { key: 'farming', label: t('chat.farmingAI') },
  ];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef([]);  // always has latest messages, no stale closure
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Helper: add a message to both state and ref atomically
  const appendMessage = (msg) => {
    messagesRef.current = [...messagesRef.current, msg];
    setMessages([...messagesRef.current]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle auto-resize on input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: 'user', content: trimmed };
    appendMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      // messagesRef.current already includes the new user message
      const response = await axios.post(`${API_BASE}/chat/`, {
        messages: messagesRef.current,
        domain: domain,
        language: i18n.language
      });
      appendMessage({ role: 'assistant', content: response.data.response });
    } catch (error) {
      console.error('Chat error:', error);
      appendMessage({ role: 'assistant', content: t('chat.error') });
    } finally {
      setIsLoading(false);
    }
  };

  const currentOption = domainOptions.find(o => o.key === domain);
  const domainLabel = currentOption ? currentOption.label : domain;

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-secondary)]">
        <div className="p-6 border-b border-[var(--border-color)] flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)]">CompanionAI</span>
        </div>

        <div className="p-4 space-y-1 flex-grow">
          <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4 px-2">{t('chat.products')}</p>
          {domainOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => { setDomain(opt.key); setMessages([]); messagesRef.current = []; }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                domain === opt.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* User card */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500/30 to-emerald-500/30 rounded-full flex items-center justify-center border border-[var(--border-color)] font-bold text-sm">
              {user?.name?.[0] || '?'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-[var(--text-secondary)] capitalize">{user?.role || 'user'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="px-6 py-4 border-b border-[var(--border-color)] flex items-center gap-4 bg-[var(--bg-primary)]/60 backdrop-blur-xl sticky top-0 z-10">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('chat.backToProducts')}
          </button>
          <div className="h-5 w-px bg-[var(--border-color)]" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-[var(--text-primary)]">{domainLabel}</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)]">
              <div className="w-16 h-16 bg-blue-600/5 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/10">
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t('chat.startConv')}</h2>
              <p>{t('chat.askAbout')} <span className="text-blue-500 font-semibold">{domainLabel}</span></p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-blue-600/10 border border-blue-500/20'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-5 h-5 text-blue-400" />}
              </div>
              <div className={`rounded-2xl px-5 py-4 leading-relaxed shadow-sm max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}>
                {msg.role === 'assistant'
                  ? <MarkdownMessage content={msg.content} />
                  : msg.content
                }
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 max-w-3xl mx-auto">
              <div className="w-8 h-8 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-2xl px-5 py-4 border border-[var(--border-color)] text-[var(--text-secondary)] italic shadow-sm">
                {t('chat.thinking')}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
          <div className="max-w-3xl mx-auto relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('chat.messagePlaceholder')}
              className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none py-3 resize-none max-h-48 scrollbar-hide"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-color)]/30">
              <div className="text-[0.65rem] text-[var(--text-secondary)]/50 font-medium">
                {t('chat.enterHint')}
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-95'
                    : 'bg-white/5 text-[var(--text-secondary)] cursor-not-allowed'
                }`}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Paperclip, Mic, Globe, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const ChatDashboard = ({ domain, setDomain, onGoBack }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.strip() && !isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/chat/`, {
        messages: [...messages, userMessage],
        domain: domain
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t('chat.error') }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE}/files/upload`, formData);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `File "${file.name}" uploaded and analyzed. Summary: ${response.data.analysis.summary}` 
      }]);
    } catch (error) {
      console.error('Upload error:', error);
      alert(t('chat.uploadFailed'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sidebar - Same as before but with setMessages([]) on domain change */}
      <aside className="w-64 border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-secondary)]">
        <div className="p-6 border-b border-[var(--border-color)] font-bold text-xl flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-[var(--text-primary)]">CompanionAI</span>
        </div>
        
        <div className="p-4 space-y-2 flex-grow">
          <p className="text-xs font-semibold text-[var(--text-secondary)] opacity-60 uppercase tracking-wider mb-4 px-2">{t('chat.domains')}</p>
          {['general', 'business', 'startup', 'farming'].map(d => (
            <button 
              key={d}
              onClick={() => { setDomain(d); setMessages([]); }}
              className={`w-full text-left px-4 py-2 rounded-xl transition-all capitalize ${
                domain === d ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
              }`}
            >
              {t('chat.' + d) || d}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-[var(--bg-primary)] rounded-full flex items-center justify-center border border-[var(--border-color)]">
              <User className="w-4 h-4 text-[var(--text-secondary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{t('chat.testUser')}</p>
              <p className="text-xs text-[var(--text-secondary)]">{t('chat.freeTier')}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-primary)]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onGoBack}
              className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-wider transition-colors"
            >
              ← {t('chat.back')}
            </button>
            <div className="h-4 w-px bg-[var(--border-color)]"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--text-secondary)]">{t('chat.currentDomain')}</span>
              <span className="text-sm font-bold text-blue-400 capitalize">{t('chat.' + domain) || domain}</span>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <Bot className="w-12 h-12 mb-4 opacity-20" />
              <p>{t('chat.startConv')} <span className="text-blue-400 font-bold">{t('chat.' + domain) || domain}</span> {t('chat.domain')}</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-blue-600/10'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-5 h-5 text-blue-500" />}
              </div>
              <div className={`rounded-2xl p-4 border border-[var(--border-color)] leading-relaxed shadow-sm ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)]'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-3xl mx-auto">
              <div className="w-8 h-8 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border-color)] italic text-[var(--text-secondary)] shadow-sm">
                {t('chat.thinking')}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
          <div className="max-w-3xl mx-auto relative">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder={`${t('chat.message')} ${t('chat.' + domain) || domain} ${t('chat.ai')}`}
              disabled={isLoading}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl p-4 pr-32 focus:outline-none focus:border-blue-500/50 transition-colors resize-none h-24 disabled:opacity-50"
            />
            <div className="absolute right-4 bottom-4 flex gap-2">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pdf"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
              </button>
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;

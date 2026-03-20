import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, LogIn, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AuthPromptModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
              <AlertCircle className="w-8 h-8 text-blue-400" />
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              {title}
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {message}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-[var(--text-primary)] bg-white/5 hover:bg-white/10 border border-[var(--border-color)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-[2] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPromptModal;

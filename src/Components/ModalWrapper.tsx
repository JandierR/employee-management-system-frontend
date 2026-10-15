import React from 'react';

interface ModalWrapperProps {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function ModalWrapper({
  title,
  onClose,
  children,
}: ModalWrapperProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      {/* Modal Card Layout */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-colors">
            &times;
          </button>
        </div>

        {/* Content Body injection point */}
        {children}
      </div>
    </div>
  );
}

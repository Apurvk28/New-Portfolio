import React from 'react';

export default function ToastContainer({ toasts }) {
  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-black text-white px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 pointer-events-auto border border-neutral-700 transition-all duration-300 transform translate-y-0 opacity-100"
        >
          <span className="text-white">●</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

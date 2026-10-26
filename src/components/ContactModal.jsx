import React, { useState, useEffect } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div
      id="contact-modal"
      onClick={(e) => {
        if (e.target.id === 'contact-modal') onClose();
      }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
    >
      <div
        id="contact-modal-card"
        className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 md:p-9 shadow-2xl transform scale-100 transition-transform duration-300 relative border border-neutral-100"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-neutral-200/80 pb-5 mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 block mb-1">
              OPEN FOR OPPORTUNITIES
            </span>
            <h3 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">
              LET'S CONNECT
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Primary Message */}
        <div className="mb-8">
          <p className="text-sm md:text-base text-neutral-700 leading-relaxed font-normal">
            Whether you're looking to scale your engineering team, interview strong full-stack talent, or discuss an open technical role, I'm ready to connect.
          </p>
        </div>

        {/* Email Address Card */}
        <div className="mb-8">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 hover:border-neutral-400 transition-all">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-800 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  DIRECT EMAIL
                </span>
                <a
                  href="mailto:khairnarapurv@gmail.com"
                  className="text-xs sm:text-sm font-bold text-neutral-900 hover:underline truncate block"
                >
                  khairnarapurv@gmail.com
                </a>
              </div>
            </div>

            <button
              onClick={() => handleCopy('khairnarapurv@gmail.com')}
              className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition-all shrink-0 ml-2"
            >
              {copied ? 'COPIED ✓' : 'COPY'}
            </button>
          </div>
        </div>

        {/* Quick Direct Actions: Send Email & Download Resume */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="mailto:khairnarapurv@gmail.com"
            className="flex-1 py-3 px-4 bg-black text-white rounded-full text-xs font-bold tracking-widest uppercase text-center hover:bg-neutral-800 transition-all shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            SEND AN EMAIL ↗
          </a>
          <a
            href="/assets/resume/ApurvResume.pdf"
            download="Apurv_Khairnar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-white text-black border border-neutral-300 rounded-full text-xs font-bold tracking-widest uppercase text-center hover:border-black transition-all hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-1.5"
          >
            <span>DOWNLOAD RESUME</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

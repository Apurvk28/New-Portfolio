import React, { useEffect } from 'react';

export default function ResumeModal({ isOpen, onClose }) {
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

  const resumeUrl = '/assets/resume/ApurvResume.pdf';

  return (
    <div
      id="resume-modal"
      onClick={(e) => {
        if (e.target.id === 'resume-modal') onClose();
      }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6 transition-opacity duration-300 animate-fadeIn"
    >
      <div
        id="resume-modal-card"
        className="bg-white rounded-[28px] sm:rounded-[32px] w-full max-w-4xl lg:max-w-5xl h-[92vh] max-h-[95vh] flex flex-col p-4 sm:p-6 shadow-2xl border border-neutral-100 relative"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-neutral-100 shrink-0">
          <div>
            <span className="block text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-0.5">
              CURRICULUM VITAE &bull; APURV KHAIRNAR
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 tracking-tight">
              RESUME PREVIEW
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Open Tab</span>
              <span>↗</span>
            </a>
            <a
              href={resumeUrl}
              download="Apurv_Khairnar_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Download</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-inner relative flex items-center justify-center">
          <object
            data={`${resumeUrl}#toolbar=0&navpanes=0`}
            type="application/pdf"
            className="w-full h-full rounded-2xl"
          >
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <p className="text-sm text-neutral-600 font-medium">
                Unable to display PDF directly in your browser.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider"
                >
                  Open Resume ↗
                </a>
                <a
                  href={resumeUrl}
                  download="Apurv_Khairnar_Resume.pdf"
                  className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider"
                >
                  Download PDF ↓
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}

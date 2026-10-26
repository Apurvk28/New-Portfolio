import React, { useEffect, useState } from 'react';

const CERTIFICATE_VERIFY_URLS = {
  'claude 101': 'https://verify.skilljar.com/c/2q4m6csrnvpj',
  'model context protocol': 'https://verify.skilljar.com/c/k66ahipzjsty',
  'mcp': 'https://verify.skilljar.com/c/k66ahipzjsty',
  'large language models': 'https://verify.letsupgrade.in/certificate/LUELLMJUN125238',
  'llm': 'https://verify.letsupgrade.in/certificate/LUELLMJUN125238',
  'full-stack mern': 'https://30dc.graphy.com/verify-certificate?serialno=CKFLES7P',
  'mern': 'https://30dc.graphy.com/verify-certificate?serialno=CKFLES7P',
  'rag architecture': 'https://www.guvi.in/share-certificate/KA718U7x1959y0J352',
  'rag': 'https://www.guvi.in/share-certificate/KA718U7x1959y0J352',
};

export default function ProjectModal({ project, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!project) {
      setIsFullscreen(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, isFullscreen]);

  if (!project) return null;

  const category = project.subtitle || project.category || 'FEATURED PROJECT';
  const title = project.title || 'PROJECT DETAILS';
  const imgSrc = project.src || project.image;
  const link = project.link || (project.href && !project.href.startsWith('#') ? project.href : null);

  const isCertificate = Boolean(
    project.isCertificate ||
    imgSrc?.includes('certificates') ||
    project.category?.includes('CERTIF')
  );

  const verifyUrl =
    project.verifyUrl ||
    CERTIFICATE_VERIFY_URLS[project.title?.toLowerCase().trim()] ||
    null;

  return (
    <>
      <div
        id="project-modal"
        onClick={(e) => {
          if (e.target.id === 'project-modal') onClose();
        }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 transition-opacity duration-300"
      >
        <div
          id="project-modal-card"
          className={`bg-white rounded-[32px] w-full max-h-[92vh] overflow-y-auto no-scrollbar p-5 sm:p-7 md:p-8 shadow-2xl border border-neutral-100 relative transition-all duration-300 ${
            isCertificate ? 'max-w-4xl lg:max-w-5xl' : 'max-w-2xl'
          }`}
        >
          {/* Header */}
          <div className="relative text-center pb-4 mb-5 border-b border-neutral-100">
            <span
              id="modal-project-category"
              className="inline-block text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1"
            >
              {isCertificate ? `Official Certification • ${category}` : category}
            </span>
            <h3
              id="modal-project-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-neutral-900 tracking-tight"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-black hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div id="modal-project-body" className="space-y-6 text-sm text-neutral-700">
            {/* Certificate Display: Clean uncropped view with Verify Credential button */}
            {imgSrc && isCertificate && (
              <div className="w-full flex flex-col items-center gap-5">
                <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-900/5 p-2 sm:p-3 shadow-inner flex flex-col items-center">
                  <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm group">
                    <img
                      src={imgSrc}
                      alt={project.alt || `${title} Certificate`}
                      onClick={() => setIsFullscreen(true)}
                      className="w-full h-auto max-h-[58vh] md:max-h-[64vh] object-contain rounded-xl cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                      title="Click to view full screen"
                    />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-white text-[11px] font-mono px-3 py-1.5 rounded-full pointer-events-none">
                      🔍 Click to Zoom
                    </div>
                  </div>

                  {/* Toolbar beneath image */}
                  <div className="w-full mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-700">
                        Verified Credential
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFullscreen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <span>🔍</span> Full Screen
                      </button>
                      <a
                        href={imgSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Open Full Res ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* Big prominent Verify Credential button (only when verify link exists) */}
                {verifyUrl && (
                  <div className="pt-2 flex justify-center items-center w-full">
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Verify Credential</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Standard Project Image (Only for Featured Projects) */}
            {imgSrc && !isCertificate && (
              <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-100 shadow-inner p-1.5 flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={project.alt || title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-xl shadow-sm"
                />
              </div>
            )}

            {/* Standard Project Details (Only for Featured Projects) */}
            {!isCertificate && project.description && (
              <p className="text-neutral-600 leading-relaxed font-normal text-sm sm:text-base text-center max-w-2xl mx-auto">
                {project.description}
              </p>
            )}

            {!isCertificate && project.stats && (
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Key Highlights
                </p>
                <p className="text-xs sm:text-sm text-neutral-800 font-semibold">{project.stats}</p>
              </div>
            )}

            {!isCertificate && project.deliverables && project.deliverables.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2 text-center">
                  Key Deliverables
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600 max-w-md mx-auto">
                  {project.deliverables.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {!isCertificate && project.tools && project.tools.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-black mb-2 text-center">
                  Technologies &amp; Stack
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] font-semibold rounded-full uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isCertificate && link && (
              <div className="pt-2 flex justify-center items-center">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Visit Live Website ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && imgSrc && (
        <div
          id="cert-lightbox"
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 flex items-center gap-3 z-10">
            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider transition-all hover:bg-neutral-200"
              >
                Verify Credential ↗
              </a>
            )}
            <a
              href={imgSrc}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Open Tab ↗
            </a>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg font-bold transition-all cursor-pointer"
              aria-label="Close fullscreen"
            >
              ✕
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-[96vw] max-h-[85vh] flex items-center justify-center"
          >
            <img
              src={imgSrc}
              alt={title}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>

          <p className="mt-4 text-xs font-mono text-neutral-400 select-none">
            {title} • Press ESC or click outside to exit fullscreen
          </p>
        </div>
      )}
    </>
  );
}

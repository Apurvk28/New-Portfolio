import React, { useEffect, useRef } from 'react';
import { initWorksWheel } from '../utils/works-wheel.js';
import { LANDING_PAGES } from '../utils/projectsData.js';

export default function Certificates({ onOpenProject }) {
  const containerRef = useRef(null);
  const wheelInstanceRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = initWorksWheel(container, {
      items: LANDING_PAGES,
      label: "Certificates",
      action: "View",
      onSelect: (index, item) => {
        onOpenProject(item);
      },
    });

    wheelInstanceRef.current = instance;

    const section = sectionRef.current;
    let autoSnapped = false;

    const checkAcquired = () => {
      if (!section || !wheelInstanceRef.current) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section has acquired the screen when top is aligned (within 40px) or occupying majority of screen
      const isAcquired = Math.abs(rect.top) <= 40 || (rect.top <= 60 && rect.bottom >= vh * 0.85);

      if (isAcquired) {
        wheelInstanceRef.current.setAcquired(true);
      } else if (rect.top > 0 && rect.top < vh * 0.4 && !autoSnapped) {
        // Approaching section: snap to fill screen cleanly so it's not sharing half-screen
        autoSnapped = true;
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          wheelInstanceRef.current?.setAcquired(true);
        }, 450);
      }
    };

    window.addEventListener('scroll', checkAcquired, { passive: true });
    // Initial check in case page starts/refreshes at certificates
    checkAcquired();

    return () => {
      window.removeEventListener('scroll', checkAcquired);
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
      wheelInstanceRef.current = null;
    };
  }, [onOpenProject]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-[#FAFAFA] w-full h-screen h-[100dvh] min-h-[100dvh] flex flex-col justify-between max-w-[1400px] mx-auto px-4 sm:px-6 md:px-14 py-6 md:py-8 overflow-hidden select-none"
      data-purpose="certificates-section"
      id="certificates"
    >
      {/* Header with Title */}
      <div className="flex-shrink-0 mb-2 md:mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
            CERTIFICATES
          </h2>
        </div>
      </div>

      {/* WorksWheel 3D Container - occupies full remaining vertical viewport */}
      <div className="flex-1 w-full relative overflow-hidden min-h-0">
        <div
          ref={containerRef}
          id="works-wheel-container"
          className="w-full h-full relative"
        >
          {/* WorksWheel 3D drum mounts here */}
        </div>
      </div>
    </section>
  );
}

export { Certificates as LandingPages };

import React, { useEffect, useRef } from 'react';
import { initWorksWheel } from '../utils/works-wheel.js';
import { LANDING_PAGES } from '../utils/projectsData.js';

export default function Certificates({ onOpenProject }) {
  const containerRef = useRef(null);
  const wheelInstanceRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const count = LANDING_PAGES.length;

    const handleNavigate = (targetStep) => {
      if (!section) return;
      const vh = window.innerHeight;
      const totalDist = section.offsetHeight - vh;
      if (totalDist <= 0) return;

      let progress = 0;
      if (targetStep >= 1) {
        const norm = (targetStep - 1) / Math.max(1, count - 1);
        progress = 0.08 + norm * 0.84;
      }
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const targetScroll = sectionTop + progress * totalDist;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    const instance = initWorksWheel(container, {
      items: LANDING_PAGES,
      label: "Certificates",
      action: "View",
      onNavigate: handleNavigate,
      onSelect: (index, item) => {
        onOpenProject(item);
      },
    });

    wheelInstanceRef.current = instance;

    let rafId = null;

    const handleScroll = () => {
      if (!section || !wheelInstanceRef.current) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalDist = section.offsetHeight - vh;

      if (totalDist <= 0) return;

      const scrolled = -rect.top;

      if (scrolled >= 0 && scrolled <= totalDist) {
        const progress = scrolled / totalDist; // 0.0 to 1.0
        // 0.00 -> 0.08: ring transforms into front certificate 0
        // 0.08 -> 0.92: cycle through certificates 0..count-1 (target 1..count)
        // 0.92 -> 1.00: hold on last certificate before naturally releasing to footer
        let targetVal = 0;
        if (progress <= 0.08) {
          targetVal = (progress / 0.08) * 1.0;
        } else if (progress <= 0.92) {
          targetVal = 1.0 + ((progress - 0.08) / 0.84) * (count - 1);
        } else {
          targetVal = count;
        }

        wheelInstanceRef.current.to(Math.min(count, Math.max(0, targetVal)));
      } else if (scrolled < 0) {
        wheelInstanceRef.current.to(0);
      } else if (scrolled > totalDist) {
        wheelInstanceRef.current.to(count);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
      wheelInstanceRef.current = null;
    };
  }, [onOpenProject]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-[#FAFAFA]"
      data-purpose="certificates-section"
      id="certificates"
      style={{ height: '350vh' }}
    >
      <div className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between max-w-[1400px] mx-auto px-4 sm:px-6 md:px-14 py-6 md:py-8 overflow-hidden select-none">
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
      </div>
    </section>
  );
}

export { Certificates as LandingPages };

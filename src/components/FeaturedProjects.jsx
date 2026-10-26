import React, { useEffect, useRef } from 'react';
import { initFlexCarousel } from '../utils/flex-carousel.js';
import { FEATURED_PROJECTS } from '../utils/projectsData.js';
import './FlexCarousel.css';

export default function FeaturedProjects({ onOpenProject }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let instance = null;
    try {
      instance = initFlexCarousel(container, {
        items: FEATURED_PROJECTS,
        preset: 'liquid',
        intro: 'rise',
        cardHeight: 0.5,
        gap: 12,
        squeeze: 0.2,
        focusOnClick: true,
        captions: true,
        onSelect: (index, item) => {
          onOpenProject(item);
        },
      });
    } catch (e) {
      console.error('Failed to initialize FlexCarousel:', e);
    }

    return () => {
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }
    };
  }, [onOpenProject]);

  return (
    <section
      className="w-full min-h-screen min-h-[100dvh] flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-14 py-8 md:py-12"
      data-purpose="featured-projects"
      id="projects"
    >
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
          FEATURED PROJECT
        </h2>
      </div>

      {/* Dynamic Projects Content Area with FlexCarousel */}
      <div id="projects-content" className="w-full">
        <div
          ref={containerRef}
          id="flex-carousel-container"
          className="rounded-3xl border border-neutral-200 bg-[#EFEFEF] overflow-hidden shadow-inner h-[60vh] md:h-[68vh] min-h-[480px] w-full relative"
        >
          {/* FlexCarousel WebGL mounts here */}
        </div>
      </div>
    </section>
  );
}

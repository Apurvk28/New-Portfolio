import React from 'react';
import { CardsParallax } from './ui/scroll-cards.jsx';
import { FEATURED_PROJECTS } from '../utils/projectsData.js';

export default function FeaturedProjects({ onOpenProject }) {
  return (
    <section
      className="w-full min-h-screen min-h-[100dvh] flex flex-col justify-center max-w-[1400px] mx-auto px-4 sm:px-6 md:px-14 py-8 md:py-12"
      data-purpose="featured-projects"
      id="projects"
    >
      {/* Header: exact previous font and layout with scroll-down hint below */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 font-sans">
          FEATURED PROJECTS
        </h2>
        <div className="flex items-center gap-2 mt-2 text-xs md:text-sm font-mono tracking-widest uppercase text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse"></span>
          <span>Scroll down to explore</span>
          <span className="inline-block animate-bounce">↓</span>
        </div>
      </div>

      {/* Dynamic Projects Content Area with CardsParallax */}
      <div id="projects-content" className="w-full">
        <CardsParallax
          items={FEATURED_PROJECTS}
          onSelect={(project) => {
            if (onOpenProject) {
              onOpenProject(project);
            }
          }}
        />
      </div>
    </section>
  );
}

import React from "react";

// Image component compatible with Next.js Image API for Vite / React environments
const Image = ({ src, alt = "Background", className = "", ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

// Card component with sticky parallax scroll stacking
// ONLY the project name is displayed on the card at bottom-left, with a static background image
const Card = ({
  title,
  color = "#111111",
  textColor = "#ffffff",
  i = 0,
  src,
  onSelect,
  project,
}) => {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-2 sm:px-4 md:p-0">
      <div
        onClick={() => onSelect && onSelect(project || { title, src })}
        className="relative flex flex-col w-full max-w-[850px] aspect-[16/10] sm:aspect-[16/10] md:aspect-auto md:h-[480px]
        rounded-[18px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden shadow-2xl border border-white/10 mx-auto
        cursor-pointer select-none"
        style={{
          backgroundColor: color,
          zIndex: i + 1,
        }}
      >
        {/* Static Background Image (No scroll motion, no hover scaling) */}
        <div className="absolute inset-0 z-0">
          <Image
            className="w-full h-full object-cover object-center"
            src={src}
            alt={title || "Project Preview"}
          />
          {/* Vignette gradient overlay for bottom-left title contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </div>

        {/* ONLY Project Name - Bottom-left of card with responsive font size */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-12 z-10">
          <span className="font-bold relative text-3xl sm:text-5xl md:text-7xl">
            <span
              className="relative z-10 font-tiemposHeadline font-black tracking-tight"
              style={{ color: textColor }}
            >
              {title}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * CardsParallax displays cards in a sticky vertical scroll stacking layout
 */
const CardsParallax = ({ items = [], onSelect }) => {
  return (
    <div className="min-h-screen">
      {items.map((project, i) => (
        <Card
          key={`p_${i}`}
          {...project}
          i={i}
          project={project}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export { CardsParallax, Card, Image };

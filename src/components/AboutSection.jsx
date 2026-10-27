import React, { useEffect, useRef } from 'react';

export default function AboutSection({ onOpenContact, onOpenResume }) {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const mediaBlurRef = useRef(null);
  const mediaOverlayRef = useRef(null);
  const titleFirstRef = useRef(null);
  const titleRestRef = useRef(null);
  const dateTagRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const mediaContentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ASPECT_RATIO = 1024 / 546;
    let isMobile = window.innerWidth < 768;
    let rafScheduled = false;

    function applyFrame(progress) {
      const isMobile = window.innerWidth < 768;
      const startW = isMobile ? 280 : 300;
      const startH = isMobile ? 360 : 400;

      const maxWByViewport = window.innerWidth * 0.94;
      const maxWByHeight = window.innerHeight * 0.86 * ASPECT_RATIO;
      const endW = Math.min(maxWByViewport, maxWByHeight);
      const endH = isMobile
        ? Math.min(window.innerHeight * 0.88, 650)
        : endW / ASPECT_RATIO;

      const currentW = startW + progress * (endW - startW);
      const currentH = startH + progress * (endH - startH);
      const textTranslateX = (progress * (isMobile ? 180 : 150)).toFixed(1);

      // Hardware accelerated unblur
      if (mediaBlurRef.current) {
        if (progress < 0.45) {
          mediaBlurRef.current.style.visibility = 'visible';
          mediaBlurRef.current.style.opacity = Math.max(0, 1 - progress * 2.3).toFixed(3);
        } else {
          mediaBlurRef.current.style.opacity = '0';
          mediaBlurRef.current.style.visibility = 'hidden';
        }
      }

      // Media container sizing
      if (mediaContainerRef.current) {
        mediaContainerRef.current.style.width = `${currentW.toFixed(1)}px`;
        mediaContainerRef.current.style.height = `${currentH.toFixed(1)}px`;
        const borderOpacity = (0.1 + (1 - progress) * 0.25).toFixed(2);
        mediaContainerRef.current.style.borderColor = `rgba(255, 255, 255, ${borderOpacity})`;
      }

      // Ambient background image fade
      if (bgImgRef.current) {
        bgImgRef.current.style.opacity = Math.max(0, 1 - progress * 1.3).toFixed(3);
      }

      // Media overlay contrast
      if (mediaOverlayRef.current) {
        mediaOverlayRef.current.style.opacity = Math.max(0.3, 0.8 - progress * 0.4).toFixed(3);
      }

      // Title words translate outward and fade
      const titleOpacity = Math.max(0, 1 - progress * 1.6).toFixed(3);
      if (titleFirstRef.current) {
        titleFirstRef.current.style.transform = `translateX(-${textTranslateX}vw) translateZ(0)`;
        titleFirstRef.current.style.opacity = titleOpacity;
      }
      if (titleRestRef.current) {
        titleRestRef.current.style.transform = `translateX(${textTranslateX}vw) translateZ(0)`;
        titleRestRef.current.style.opacity = titleOpacity;
      }

      // Subtitles translate outward and fade quickly
      const subOpacity = Math.max(0, 1 - progress * 2.8).toFixed(3);
      if (dateTagRef.current) {
        dateTagRef.current.style.transform = `translateX(-${textTranslateX}vw)`;
        dateTagRef.current.style.opacity = subOpacity;
      }
      if (scrollPromptRef.current) {
        scrollPromptRef.current.style.transform = `translateX(${textTranslateX}vw)`;
        scrollPromptRef.current.style.opacity = subOpacity;
      }

      // Content reveals smoothly near finish
      if (mediaContentRef.current) {
        if (progress >= 0.70) {
          const contentFade = Math.min(1, (progress - 0.70) / 0.30);
          mediaContentRef.current.style.opacity = contentFade.toFixed(3);
          mediaContentRef.current.style.pointerEvents = contentFade > 0.4 ? 'auto' : 'none';
          mediaContentRef.current.style.transform = `translateY(${((1 - contentFade) * 12).toFixed(1)}px)`;
        } else {
          mediaContentRef.current.style.opacity = '0';
          mediaContentRef.current.style.pointerEvents = 'none';
          mediaContentRef.current.style.transform = 'translateY(15px)';
        }
      }
    }

    function renderFrame() {
      rafScheduled = false;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = section.offsetHeight - windowHeight;

      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      let target = 0;
      if (scrolled > 0) {
        const rawRatio = scrolled / totalDist;
        target = Math.min(Math.max(rawRatio / 0.9, 0), 1);
      }

      applyFrame(target);
    }

    function onScroll() {
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(renderFrame);
      }
    }

    function onResize() {
      isMobile = window.innerWidth < 768;
      renderFrame();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    renderFrame();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0D0D0D] text-white"
      id="about"
      style={{ minHeight: '200vh' }}
    >
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex flex-col items-center justify-start z-10">
        {/* Background Ambient with dynamic opacity */}
        <div
          ref={bgImgRef}
          id="sem-bg-img"
          className="absolute inset-0 z-0 h-full w-full pointer-events-none transition-opacity duration-150 ease-out"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <img
            src="/assets/about_starry_castle_hq.jpg"
            alt="Monochrome Starry Night Castle Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        {/* Centered Interactive Stage Container */}
        <div className="container mx-auto flex flex-col items-center justify-start relative z-10 w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
            {/* Expanding Media Card */}
            <div
              ref={mediaContainerRef}
              id="sem-media-container"
              className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl transition-none bg-[#07090E]"
              style={{
                width: '300px',
                height: '400px',
                maxWidth: '95vw',
                maxHeight: '85vh',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255,255,255,0.35)',
                willChange: 'width, height',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-xl flex items-center justify-center bg-[#07090E]">
                {/* Crisp Base Image */}
                <img
                  id="sem-media-img"
                  src="/assets/about_floating_light_hq.png"
                  alt="Apurv Khairnar - Ascendance & Digital Craft"
                  className="w-full h-full object-cover rounded-xl transition-none"
                  style={{
                    transform: 'scale(1.02) translateZ(0)',
                    transformOrigin: 'center',
                    backfaceVisibility: 'hidden',
                  }}
                />
                {/* Pre-blurred Layer for GPU Unblur */}
                <img
                  ref={mediaBlurRef}
                  id="sem-media-blur"
                  src="/assets/about_floating_light_hq.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl transition-none pointer-events-none"
                  style={{
                    filter: 'blur(18px)',
                    transform: 'scale(1.08) translateZ(0)',
                    transformOrigin: 'center',
                    opacity: 1,
                    willChange: 'opacity',
                    backfaceVisibility: 'hidden',
                  }}
                />
                {/* Gradient Overlay */}
                <div
                  ref={mediaOverlayRef}
                  id="sem-media-overlay"
                  className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/85 rounded-xl transition-opacity duration-150 pointer-events-none"
                ></div>

                {/* Minimal Aesthetic About Info - Perimeter Layout */}
                <div
                  ref={mediaContentRef}
                  id="sem-media-content"
                  className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-7 md:p-9 pointer-events-none opacity-0 transition-all duration-300 select-none overflow-y-auto no-scrollbar"
                >
                  {/* Top Perimeter */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 sm:pb-3 shrink-0">
                    <h3 className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-tight text-white max-w-xl">
                      CRAFTING DISTINCTIVE DIGITAL EXPERIENCES THAT PUSH BOUNDARIES.
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase text-neutral-400 shrink-0">
                      BASED IN INDIA &bull; WORLDWIDE
                    </span>
                  </div>

                  {/* Center Zone: OPEN */}
                  <div className="flex-1 pointer-events-none min-h-2 sm:min-h-4 md:min-h-[120px]"></div>

                  {/* Bottom Perimeter */}
                  <div className="pt-2.5 sm:pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 shrink-0">
                    <div className="max-w-xl space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-neutral-300">
                          DISCIPLINE &amp; CRAFT
                        </span>
                        <div className="h-px bg-white/15 w-4 sm:w-6"></div>
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                          UI/UX &bull; WEB DESIGN &bull; WEBFLOW &bull; FIGMA
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-medium leading-relaxed tracking-wider uppercase text-neutral-300">
AI-first Full-Stack (MERN) Web Developer with hands-on experience building production-ready web applications using React.js, Node.js, Express.js, MongoDB, and TypeScript. Experienced in integrating AI tools and APIs (Gemini, Claude, and Cursor) throughout the development lifecycle, from rapid prototyping to delivering AI-powered features, with a strong focus on RESTful API design and scalable backend architecture.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-1.5 md:pt-0 flex-wrap">
                      <button
                        onClick={onOpenContact}
                        className="pointer-events-auto px-5 py-2.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                      >
                        <span>GET IN TOUCH</span>
                        <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenResume}
                        className="pointer-events-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/40 hover:border-white text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 inline-flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                      >
                        <span>VIEW RESUME</span>
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <a
                        href="#projects"
                        className="pointer-events-auto px-5 py-2.5 rounded-full border border-neutral-500 hover:border-white text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        PROJECTS
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitles that translate outward */}
              <div className="flex flex-col items-center text-center relative z-10 mt-4 pointer-events-none">
                <p
                  ref={dateTagRef}
                  id="sem-date"
                  className="text-xl md:text-2xl text-neutral-300 font-semibold tracking-wider uppercase transition-none drop-shadow"
                >
                  BACKGROUND &amp; VISION
                </p>
                <p
                  ref={scrollPromptRef}
                  id="sem-scroll-prompt"
                  className="text-neutral-400 font-medium text-xs tracking-widest uppercase transition-none mt-1 drop-shadow"
                >
                  SCROLL TO EXPAND
                </p>
              </div>
            </div>

            {/* Splitting Title Header */}
            <div
              className="flex items-center justify-center text-center gap-2 sm:gap-4 w-full relative z-10 pointer-events-none flex-col"
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
            >
              <h2
                ref={titleFirstRef}
                id="sem-title-first"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight transition-none drop-shadow-2xl"
                style={{ willChange: 'transform, opacity' }}
              >
                ABOUT
              </h2>
              <h2
                ref={titleRestRef}
                id="sem-title-rest"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight transition-none drop-shadow-2xl"
                style={{ willChange: 'transform, opacity' }}
              >
                ME
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

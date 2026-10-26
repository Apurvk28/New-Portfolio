import React, { useEffect, useRef } from 'react';

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const hudProgressRef = useRef(null);
  const hudPhaseRef = useRef(null);
  const jumpButtonsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const hudProgress = hudProgressRef.current;
    const hudPhase = hudPhaseRef.current;
    const dateBgs = stage.querySelectorAll('.exp-date-bg');
    const jumpButtons = jumpButtonsRef.current;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentTranslateX = 0;
    let targetTranslateX = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let isTicking = false;
    let isMounted = true;

    function getDimensions() {
      const totalDist = section.offsetHeight - window.innerHeight;
      const stageWidth = stage.scrollWidth;
      const maxTranslate = Math.max(0, stageWidth - window.innerWidth);
      return { totalDist, maxTranslate };
    }

    let { totalDist, maxTranslate } = getDimensions();

    function renderFrame() {
      if (!isMounted) return;
      isTicking = false;

      if (prefersReducedMotion) {
        return;
      }

      // Smooth inertia lerp (0.09 factor)
      currentProgress += (targetProgress - currentProgress) * 0.09;
      currentTranslateX += (targetTranslateX - currentTranslateX) * 0.09;

      // 1. Move Horizontal Camera / Stage
      stage.style.transform = `translate3d(${currentTranslateX.toFixed(2)}px, 0, 0)`;

      // 2. Parallax Drift for Large Background Typography Dates
      dateBgs.forEach((dateEl) => {
        const factor = parseFloat(dateEl.getAttribute('data-parallax-factor') || '0.12');
        const dateOffset = -currentTranslateX * factor;
        dateEl.style.transform = `translate3d(${dateOffset.toFixed(2)}px, 0, 0)`;
      });

      // 4. Update HUD Progress Bar
      if (hudProgress) {
        hudProgress.style.width = `${(currentProgress * 100).toFixed(1)}%`;
      }

      // 5. Update HUD Phase Title across the 3 educational phases
      if (hudPhase) {
        if (currentProgress < 0.20) {
          hudPhase.textContent = 'EDUCATION & ACADEMIC FOUNDATIONS';
        } else if (currentProgress < 0.50) {
          hudPhase.textContent = 'SECONDARY (10TH) — SEMS TAHARABAD';
        } else if (currentProgress < 0.78) {
          hudPhase.textContent = 'HIGHER SECONDARY (12TH) — KVN NAIK ARTS, COMMERCE & SCIENCE COLLEGE';
        } else {
          hudPhase.textContent = 'B.E. IN AI & DATA SCIENCE — ISBM PUNE';
        }
      }

      // 6. Highlight active bottom jump button
      jumpButtons.forEach((btn) => {
        if (!btn) return;
        const btnTarget = parseFloat(btn.getAttribute('data-target-progress') || '0');
        const isCurrent = Math.abs(currentProgress - btnTarget) < 0.18;
        if (isCurrent) {
          btn.classList.add('text-white', 'bg-white/20', 'border-white/40');
          btn.classList.remove('text-neutral-500', 'border-white/5');
        } else {
          btn.classList.remove('text-white', 'bg-white/20', 'border-white/40');
          btn.classList.add('text-neutral-500', 'border-white/5');
        }
      });

      // Keep loop active until settle
      if (
        Math.abs(targetTranslateX - currentTranslateX) > 0.1 ||
        Math.abs(targetProgress - currentProgress) > 0.001
      ) {
        requestAnimationFrame(renderFrame);
        isTicking = true;
      }
    }

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;

      if (totalDist <= 0) return;

      const rawProgress = scrolled / totalDist;
      targetProgress = Math.min(Math.max(rawProgress, 0), 1);
      targetTranslateX = -targetProgress * maxTranslate;

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(renderFrame);
      }
    }

    function onResize() {
      ({ totalDist, maxTranslate } = getDimensions());
      if (prefersReducedMotion) {
        stage.style.transform = 'none';
      }
      onScroll();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleJump = (targetProgressRatio) => {
    const section = sectionRef.current;
    if (!section) return;
    const totalDist = section.offsetHeight - window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const targetScroll = sectionTop + targetProgressRatio * totalDist;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#070709] text-white overflow-visible"
      data-purpose="experience-section"
      id="experience"
      style={{ height: '380vh' }}
    >
      {/* Sticky 100vh Theater / Viewport Window */}
      <div
        id="exp-sticky-viewport"
        className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-[#070709] flex flex-col justify-between select-none"
      >
        {/* Layer 0: Background Ambient Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        {/* Top Minimalist Editorial HUD Bar */}
        <header className="relative z-30 w-full px-6 md:px-14 pt-6 pb-4 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-md bg-[#070709]/80">
          <div className="flex items-center gap-4">
            <span
              ref={hudPhaseRef}
              id="exp-hud-phase"
              className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400"
            >
              EDUCATION &amp; ACADEMIC FOUNDATIONS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 sm:w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={hudProgressRef}
                id="exp-hud-progress"
                className="h-full bg-white transition-all duration-75 w-0"
              ></div>
            </div>
          </div>
        </header>

        {/* Center: Massive Horizontal Spatial Canvas */}
        <div className="relative z-20 flex-1 w-full overflow-hidden flex items-center">
          <div
            ref={stageRef}
            id="exp-horizontal-stage"
            className="flex items-center h-full will-change-transform transition-none"
            style={{ width: '390vw' }}
          >
            {/* ================= INTRO ENVIRONMENT (0vw - 90vw) ================= */}
            <div className="exp-panel flex-shrink-0 w-[90vw] md:w-[80vw] px-8 md:px-16 lg:px-24 flex flex-col justify-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[10px] font-semibold tracking-widest uppercase text-neutral-300 mb-6">
                  <span>ACADEMIC FOUNDATIONS</span>
                </div>
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.88] mb-8">
                  MY EDUCATION<br />JOURNEY
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl font-normal">
                  Academic benchmarks, computational foundations, and deep engineering specialization.
                </p>
              </div>
            </div>

            {/* ================= CHAPTER 01: 10TH (90vw - 190vw) ================= */}
            <div className="exp-panel relative flex-shrink-0 w-[105vw] md:w-[100vw] px-8 md:px-16 lg:px-24 flex flex-col justify-center">
              <div
                className="exp-date-bg absolute -top-10 sm:-top-16 right-8 md:right-20 text-[10vw] md:text-[12vw] font-black uppercase text-white tracking-tighter select-none pointer-events-none will-change-transform"
                style={{ opacity: 0.035 }}
                data-parallax-factor="0.10"
              >
                2020
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
                    2020
                  </span>
                  <span className="h-[1px] w-12 bg-white/20"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-white">
                    SEMS TAHARABAD
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-semibold uppercase text-neutral-300">
                    89% BOARD EXAM
                  </span>
                </div>

                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6">
                  SCHOOL<br />EDUCATION (10TH)
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
                  Built a strong academic foundation with an 89% score in the board examinations. Demonstrated high proficiency and analytical skills in core subjects, particularly Mathematics and Science. Developed strong communication and leadership abilities through active participation in public speaking and leading student teams. This early phase sparked a deep interest in technology and refined the foundational discipline needed for advanced studies.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-3xl mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">PERFORMANCE</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">89% aggregate in secondary board examinations</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">CORE DOMAIN</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Analytical focus in Mathematics &amp; Science</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">LEADERSHIP</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Student team leadership &amp; public speaking</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= CHAPTER 02: 12TH (190vw - 290vw) ================= */}
            <div className="exp-panel relative flex-shrink-0 w-[105vw] md:w-[100vw] px-8 md:px-16 lg:px-24 flex flex-col justify-center">
              <div
                className="exp-date-bg absolute -top-10 sm:-top-16 right-8 md:right-20 text-[10vw] md:text-[12vw] font-black uppercase text-white tracking-tighter select-none pointer-events-none will-change-transform"
                style={{ opacity: 0.035 }}
                data-parallax-factor="0.10"
              >
                2022
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
                    2020 — 2022
                  </span>
                  <span className="h-[1px] w-12 bg-white/20"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-white">
                    KVN NAIK ARTS, COMMERCE AND SCIENCE COLLEGE, NASHIK
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-semibold uppercase text-neutral-300">
                    BIFOCAL COMPUTER SCIENCE
                  </span>
                </div>

                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6">
                  HIGHER<br />SECONDARY (12TH)
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
                  Specialized in the Science stream with Physics, Chemistry, Mathematics, and Computer Science as a bifocal subject. Maintained a strong academic record while mastering core computational fundamentals and exploring new concepts in technology and the environment. Strengthened logical reasoning through advanced coursework and hands-on programming exercises. This period solidified a highly competitive edge and laid the technical groundwork for an engineering career.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-3xl mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">SPECIALIZATION</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">PCM with Bifocal Computer Science</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">COMPUTING</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Foundations of programming &amp; software logic</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">PREPARATION</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Technical groundwork for AI engineering studies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= CHAPTER 03: B.E. (290vw - 390vw) ================= */}
            <div className="exp-panel relative flex-shrink-0 w-[105vw] md:w-[100vw] px-8 md:px-16 lg:px-24 flex flex-col justify-center">
              <div
                className="exp-date-bg absolute -top-10 sm:-top-16 right-8 md:right-20 text-[10vw] md:text-[12vw] font-black uppercase text-white tracking-tighter select-none pointer-events-none will-change-transform"
                style={{ opacity: 0.035 }}
                data-parallax-factor="0.10"
              >
                2026
              </div>

              <div className="relative z-10 max-w-4xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400">
                    2022 — 2026
                  </span>
                  <span className="h-[1px] w-12 bg-white/20"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-white">
                    ISBM COLLEGE OF ENGINEERING, PUNE
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/20 text-[10px] font-semibold uppercase text-neutral-300">
                    8.00 CGPA
                  </span>
                </div>

                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6">
                  B.E. IN AI &amp;<br />DATA SCIENCE
                </h3>

                <p className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-8">
                  Diving deep into Artificial Intelligence and Data Science engineering while maintaining an 8.00 CGPA. Building robust full-stack applications using modern tech stacks, including React, Node.js, and MongoDB. Actively participating in high-stakes project competitions and hackathons to translate theoretical data architectures into functional software. Combines strong academic benchmarks with hands-on development to build scalable, data-driven applications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-3xl mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">ACADEMICS</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">8.00 CGPA in Artificial Intelligence &amp; Data Science</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">TECH STACK</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Full-Stack MERN, Python, AI APIs &amp; Data Models</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">HACKATHONS</div>
                    <div className="text-xs sm:text-sm text-neutral-200 font-medium leading-snug">Competitive project builds &amp; rapid engineering</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Minimalist Editorial Navigation */}
        <footer className="relative z-30 w-full px-6 md:px-14 py-4 flex items-center justify-between border-t border-white/[0.08] backdrop-blur-md bg-[#070709]/80">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              ref={(el) => (jumpButtonsRef.current[0] = el)}
              type="button"
              className="exp-jump-btn text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-white/20 text-white bg-white/10 transition-all hover:bg-white/20"
              data-target-progress="0.25"
              onClick={() => handleJump(0.25)}
            >
              10TH (SEMS)
            </button>
            <button
              ref={(el) => (jumpButtonsRef.current[1] = el)}
              type="button"
              className="exp-jump-btn text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-white/5 text-neutral-500 hover:text-white transition-all hover:border-white/20"
              data-target-progress="0.55"
              onClick={() => handleJump(0.55)}
            >
              12TH (KVN NAIK)
            </button>
            <button
              ref={(el) => (jumpButtonsRef.current[2] = el)}
              type="button"
              className="exp-jump-btn text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-md border border-white/5 text-neutral-500 hover:text-white transition-all hover:border-white/20"
              data-target-progress="0.88"
              onClick={() => handleJump(0.88)}
            >
              B.E. (ISBM PUNE)
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

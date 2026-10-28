/**
 * WorksWheel - 3D Vertical Drum & Ring Portfolio Index Component
 * Vanilla JavaScript Implementation of the WorksWheel React Component
 */

const CARD_H = 0.38; // front card height, of the stage
const CARD_MAX_W = 0.34; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights - and everything below likewise
const LENS = 2.7; // perspective distance
const RING_R = 1.38; // ring radius - expanded to give clean clearance for center label
const BOW = 1.82;
const TITLE = 0.10; // ring label and front-card title
const INDEX = 0.038; // the index down the right-hand side
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.14;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (deg) => (deg * Math.PI) / 180;
const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export const DEFAULT_WORKS = [
  {
    title: "Claude 101",
    subtitle: "Anthropic AI Architecture & Engineering",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: "https://verify.skilljar.com/c/2q4m6csrnvpj",
    image: "/assets/certificates/Claude 101.png",
    src: "/assets/certificates/Claude 101.png",
    href: "#claude-101"
  },
  {
    title: "Generative AI",
    subtitle: "Deep Learning, Transformers & Diffusion Models",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: null,
    image: "/assets/certificates/GEN AI .png",
    src: "/assets/certificates/GEN AI .png",
    href: "#generative-ai"
  },
  {
    title: "Large Language Models",
    subtitle: "Fine-Tuning, PEFT/LoRA & Vector Embeddings",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: "https://verify.letsupgrade.in/certificate/LUELLMJUN125238",
    image: "/assets/certificates/LLM.png",
    src: "/assets/certificates/LLM.png",
    href: "#large-language-models"
  },
  {
    title: "Model Context Protocol",
    subtitle: "Agentic Tooling & System Interoperability",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: "https://verify.skilljar.com/c/k66ahipzjsty",
    image: "/assets/certificates/MCP.png",
    src: "/assets/certificates/MCP.png",
    href: "#model-context-protocol"
  },
  {
    title: "Full-Stack MERN",
    subtitle: "MongoDB, Express.js, React & Node.js",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: "https://30dc.graphy.com/verify-certificate?serialno=CKFLES7P",
    image: "/assets/certificates/MERN.png",
    src: "/assets/certificates/MERN.png",
    href: "#full-stack-mern"
  },
  {
    title: "RAG Architecture",
    subtitle: "Vector Databases, Hybrid Search & Hallucination Guardrails",
    category: "OFFICIAL CERTIFICATION",
    isCertificate: true,
    verifyUrl: "https://www.guvi.in/share-certificate/KA718U7x1959y0J352",
    image: "/assets/certificates/RAG.png",
    src: "/assets/certificates/RAG.png",
    href: "#rag-architecture"
  }
];

export function initWorksWheel(container, options = {}) {
  if (!container) return null;

  const items = options.items || DEFAULT_WORKS;
  const label = options.label || "Certificates";
  const action = options.action !== undefined ? options.action : "View";
  const onSelect = options.onSelect || null;
  const onNavigate = options.onNavigate || null;

  const count = items.length;
  const last = Math.max(count - 1, 0);

  let turn = 0;
  let target = 0;
  let active = 0;
  let stage = { w: container.clientWidth || 800, h: container.clientHeight || 600 };
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build DOM Structure
  container.innerHTML = "";
  container.classList.add("relative", "w-full", "h-full", "overflow-hidden", "select-none");

  const section = document.createElement("section");
  section.setAttribute("aria-label", label);
  section.className = "relative w-full h-full min-h-[24rem] overflow-hidden select-none bg-transparent text-neutral-900";

  // Stage (perspective container)
  const stageEl = document.createElement("div");
  stageEl.tabIndex = 0;
  stageEl.role = "listbox";
  stageEl.setAttribute("aria-label", label);
  stageEl.className = "absolute inset-0 cursor-grab touch-pan-y outline-none focus-visible:outline-2 focus-visible:outline-neutral-900 focus-visible:-outline-offset-4 active:cursor-grabbing";

  // Wheel (preserve-3d anchor)
  const wheelEl = document.createElement("div");
  wheelEl.className = "absolute top-1/2 left-1/2 pointer-events-none";
  wheelEl.style.transformStyle = "preserve-3d";

  // Cards
  const cardRefs = [];
  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.id = `works-wheel-${i}`;
    card.role = "option";
    card.setAttribute("aria-selected", i === 0 ? "true" : "false");
    card.className = "group absolute cursor-pointer pointer-events-auto [backface-visibility:hidden]";
    card.style.transformStyle = "preserve-3d";
    card.style.willChange = "transform, opacity";

    const face = document.createElement("div");
    face.className = "relative block w-full h-full overflow-hidden rounded-2xl bg-white border border-neutral-300/80 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_28px_50px_-10px_rgba(0,0,0,0.22)] hover:border-neutral-500";
    face.style.willChange = "transform";
    face.style.transformOrigin = "center center";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.draggable = false;
    img.className = "w-full h-full object-cover select-none pointer-events-none";
    img.loading = "eager";

    face.appendChild(img);

    // Subtle gradient overlay for card readability
    const gradientOverlay = document.createElement("div");
    gradientOverlay.className = "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent";
    face.appendChild(gradientOverlay);

    // Bottom subtle info badge on card
    const cardInfo = document.createElement("div");
    cardInfo.className = "pointer-events-none absolute left-3.5 bottom-3.5 right-3.5 flex items-center justify-between z-10";
    cardInfo.innerHTML = `
      <span class="text-[11px] font-mono tracking-wider text-white drop-shadow-sm font-semibold truncate max-w-[65%] pointer-events-none">
        ${item.title}
      </span>
      <button type="button" aria-label="View ${item.title} certificate" class="view-cert-trigger pointer-events-auto bg-white/95 hover:bg-white text-neutral-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 group-hover:scale-105 active:scale-95 transition-all cursor-pointer">
        ${action} ↗
      </button>
    `;
    face.appendChild(cardInfo);

    const viewBtn = cardInfo.querySelector(".view-cert-trigger");
    if (viewBtn) {
      const handleTrigger = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (onSelect) {
          onSelect(i, item);
        } else if (window.openProjectModal) {
          window.openProjectModal(item);
        } else if (item.href && item.href.startsWith("http")) {
          window.open(item.href, "_blank");
        }
      };

      viewBtn.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
      });
      viewBtn.addEventListener("click", handleTrigger);
    }

    card.appendChild(face);

    // Click on card
    card.addEventListener("click", (e) => {
      if (dragDelta > 6) return; // Ignore drag clicks
      if (active === i) {
        if (onSelect) {
          onSelect(i, item);
        } else if (window.openProjectModal) {
          window.openProjectModal(item);
        } else if (item.href && item.href.startsWith("http")) {
          window.open(item.href, "_blank");
        }
      } else {
        if (onNavigate) {
          onNavigate(i + 1);
        } else {
          to(i + 1);
        }
      }
    });

    wheelEl.appendChild(card);
    cardRefs.push(card);
  });

  stageEl.appendChild(wheelEl);
  section.appendChild(stageEl);

  // Center ring label ("Certificates")
  const labelEl = document.createElement("div");
  labelEl.className = "pointer-events-none absolute inset-0 grid place-items-center tracking-tight font-black uppercase text-center text-neutral-900 select-none z-10 transition-opacity duration-300";
  labelEl.textContent = label.replace(/'?26/g, "").trim();
  section.appendChild(labelEl);

  // Front-card title - cleanly centered above the drum on mobile, elegant side headline on desktop
  const titleEl = document.createElement("div");
  titleEl.className = "pointer-events-none absolute top-2 sm:top-4 left-0 right-0 text-center md:top-1/2 md:left-[7%] md:right-auto md:text-left md:-translate-y-1/2 tracking-tight font-black uppercase text-neutral-900 opacity-0 select-none z-10 max-w-[90%] md:max-w-[38%] mx-auto md:mx-0 leading-[1.1] transition-opacity duration-300";
  titleEl.textContent = items[0] ? items[0].title : "";
  section.appendChild(titleEl);

  // Side Index List - shown cleanly on desktop viewports where space allows
  const indexList = document.createElement("ol");
  indexList.className = "text-neutral-500 absolute hidden md:block top-[7%] right-[3%] text-right leading-[1.75] z-20 space-y-0.5 select-none font-mono";
  const indexButtons = [];

  items.forEach((item, i) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.title;
    btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-neutral-400 hover:text-neutral-900 block ml-auto";
    if (i === 0) {
      btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-neutral-900 font-bold block ml-auto underline decoration-2 underline-offset-4";
    }
    btn.addEventListener("click", () => {
      if (onNavigate) {
        onNavigate(i + 1);
      } else {
        to(i + 1);
      }
    });
    li.appendChild(btn);
    indexList.appendChild(li);
    indexButtons.push(btn);
  });
  section.appendChild(indexList);

  // Bottom helper pill
  const hintPill = document.createElement("div");
  hintPill.className = "pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-neutral-200 shadow-sm backdrop-blur-md text-[10px] md:text-[11px] font-mono text-neutral-600 uppercase tracking-wider";
  hintPill.innerHTML = `
    <svg class="w-3 h-3 text-neutral-500 animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>SCROLL TO CYCLE ↓</span>
  `;
  section.appendChild(hintPill);

  container.appendChild(section);

  // Geometry computation
  let currentMetrics = calculateMetrics();

  function calculateMetrics() {
    const w = stage.w || 800;
    const h = stage.h || 600;
    const isMobile = w < 768;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * (isMobile ? 0.58 : CARD_MAX_W));
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * (isMobile ? 1.62 : 1.42);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.76) / (cardW || 1), 0.16, 1)
      : 1;

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(isMobile ? 14 : 20, Math.min(cardH * TITLE, isMobile ? 18 : 34)),
      index: Math.max(10, cardH * INDEX),
    };
  }

  function applyMetrics() {
    currentMetrics = calculateMetrics();
    stageEl.style.perspective = `${currentMetrics.depth}px`;

    cardRefs.forEach((card) => {
      card.style.width = `${currentMetrics.cardW}px`;
      card.style.height = `${currentMetrics.cardH}px`;
      card.style.marginLeft = `${-currentMetrics.cardW / 2}px`;
      card.style.marginTop = `${-currentMetrics.cardH / 2}px`;
    });

    const isMobile = (stage.w || 800) < 768;
    labelEl.style.fontSize = `${currentMetrics.title}px`;
    titleEl.style.fontSize = `${isMobile ? Math.min(22, Math.max(16, currentMetrics.title)) : currentMetrics.title * 0.9}px`;
  }

  applyMetrics();

  // ResizeObserver
  const ro = new ResizeObserver(() => {
    stage = { w: stageEl.clientWidth, h: stageEl.clientHeight };
    applyMetrics();
  });
  ro.observe(stageEl);

  // Target steering
  function to(next) {
    target = clamp(next, 0, last + 1);
  }

  // Pointer drag interaction - forwards drag to window scroll seamlessly
  let isPointerDown = false;
  let dragStartY = 0;
  let dragDelta = 0;

  stageEl.addEventListener("pointerdown", (event) => {
    isPointerDown = true;
    dragStartY = event.clientY;
    dragDelta = 0;
  });

  stageEl.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    const diff = dragStartY - event.clientY;
    dragDelta += Math.abs(diff);
    if (dragDelta > 4 && typeof stageEl.setPointerCapture === "function") {
      try {
        if (!stageEl.hasPointerCapture(event.pointerId)) {
          stageEl.setPointerCapture(event.pointerId);
        }
      } catch (_) { }
    }
    if (dragDelta > 6) {
      window.scrollBy({ top: diff * 1.5, behavior: "auto" });
    }
    dragStartY = event.clientY;
  });

  const endDrag = (event) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    try {
      if (typeof stageEl.hasPointerCapture === "function" && stageEl.hasPointerCapture(event.pointerId)) {
        stageEl.releasePointerCapture(event.pointerId);
      }
    } catch (_) { }
  };

  stageEl.addEventListener("pointerup", endDrag);
  stageEl.addEventListener("pointercancel", endDrag);

  // Keyboard navigation
  stageEl.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      if (onNavigate) {
        onNavigate(Math.min(count, Math.round(target) + 1));
      } else {
        to(Math.min(count, Math.round(target) + 1));
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      if (onNavigate) {
        onNavigate(Math.max(0, Math.round(target) - 1));
      } else {
        to(Math.max(0, Math.round(target) - 1));
      }
    }
  });

  // UI Active State Update
  function updateActiveUI(near) {
    stageEl.setAttribute("aria-activedescendant", `works-wheel-${near}`);
    cardRefs.forEach((card, idx) => {
      card.setAttribute("aria-selected", idx === near ? "true" : "false");
    });

    indexButtons.forEach((btn, idx) => {
      if (idx === near) {
        btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-neutral-900 font-bold block ml-auto scale-105 underline decoration-2 underline-offset-4";
      } else {
        btn.className = "cursor-pointer transition-all duration-200 text-[11px] md:text-xs tracking-wider outline-none text-neutral-400 hover:text-neutral-900 block ml-auto";
      }
    });

    const counter = document.getElementById("works-wheel-counter");
    if (counter) {
      counter.textContent = `${String(near + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
    }

    if (items[near]) {
      titleEl.textContent = items[near].title;
    }
  }

  // Animation Loop (Single rAF pass writing direct DOM transforms)
  let frameId = 0;
  let isRunning = true;

  const draw = () => {
    if (!isRunning) return;
    frameId = requestAnimationFrame(draw);

    const gap = target - turn;
    if (Math.abs(gap) < 0.0005) {
      turn = target;
    } else {
      turn += gap * (reduced ? 1 : EASE);
    }

    const t = turn;
    const m = clamp(t, 0, 1);
    const pos = Math.max(0, t - 1);

    const { ringR, ringScale, drumR, bow } = currentMetrics;

    if (wheelEl) {
      wheelEl.style.transform = `translateZ(${-m * drumR}px)`;
    }

    for (let i = 0; i < count; i++) {
      const d = i - pos;
      const drumDeg = d * STEP;
      const card = cardRefs[i];
      if (card) {
        card.style.transform = place(
          d * (360 / count),
          drumDeg,
          ringR,
          drumR,
          bow,
          m
        );
        card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
      }
      const face = card ? card.firstElementChild : null;
      if (face) {
        face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }
    }

    if (labelEl) labelEl.style.opacity = String(1 - m);
    if (titleEl) titleEl.style.opacity = String(m);

    const near = clamp(Math.round(pos), 0, last);
    if (near !== active) {
      active = near;
      updateActiveUI(near);
    }
  };

  frameId = requestAnimationFrame(draw);

  return {
    to,
    setAcquired: () => {},
    next: () => {
      const nextVal = Math.min(count, Math.round(target) + 1);
      if (onNavigate) onNavigate(nextVal);
      else to(nextVal);
    },
    prev: () => {
      const prevVal = Math.max(0, Math.round(target) - 1);
      if (onNavigate) onNavigate(prevVal);
      else to(prevVal);
    },
    getActive: () => active,
    destroy: () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
    }
  };
}

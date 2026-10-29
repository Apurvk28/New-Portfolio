import fableVideo from '../projects/video/fable_video.mov';

export const FEATURED_PROJECTS = [
  {
    src: '/assets/projects/fable.png',
    image: '/assets/projects/fable.png',
    video: fableVideo,
    alt: 'Fable',
    title: 'Fable',
    subtitle: 'Autonomous AI Agent Workshop & Execution Platform',
    description: 'Developer-focused MERN platform for authoring, configuring, and running autonomous AI agents. Features transparent ReAct (Reasoning + Acting) execution inspection with full step telemetry, deterministic tool sandboxes (safe AST, math, string, and time evaluation), and immutable execution snapshots for reproducible audit trails.',
    tag: 'Autonomous AI Agents',
    color: '#0F172A',
    textColor: '#FFFFFF',
    link: null,
    github: 'https://github.com/Apurvk28/fable',
    category: 'AI & AGENTIC SYSTEMS',
    deliverables: [
      'Autonomous ReAct Execution Engine with Loop Telemetry',
      'Deterministic Tool Sandboxes (Safe AST, Math & Time Evaluation)',
      'White-Box Execution Traces (Step Duration & Token Breakdown)',
      'Immutable Agent Configuration Snapshots & Multi-Tenant Scoping',
      'AI-Assisted Natural Language Agent Blueprint Generator'
    ],
    tools: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Groq LPU', 'Tailwind CSS', 'Vite'],
    stats: 'Sub-second agent execution on Groq LPU with multi-turn ReAct loops and 100% auditable execution traces.'
  },
  {
    src: '/assets/projects/wagr.png',
    image: '/assets/projects/wagr.png',
    alt: 'Wagr.io',
    title: 'Wagr.io',
    subtitle: 'AI-Powered Social Prediction Exchange',
    description: 'State-of-the-art fintech prediction exchange platform where users forecast real-world outcomes across Tech, Finance, Politics, and Crypto with zero financial risk using Market Exchange Points (MXP). Combines automated AI market sentiment analysis powered by Groq LLMs with dynamic odds recalculation, calendar contract lifecycles, and client-side financial PDF reports.',
    tag: 'Fintech & Prediction Markets',
    color: '#0B192C',
    textColor: '#FFFFFF',
    link: null,
    github: 'https://github.com/Apurvk28/wagr',
    category: 'FINTECH & PREDICTION MARKETS',
    deliverables: [
      'Automated AI Market Sentiment & Probability Recalculation Engine',
      'Risk-Free Virtual Token Economy (Market Exchange Points - MXP)',
      'Daily Calendar (12:05 AM - 11:00 PM) & Long-Term Contract Lifecycles',
      'Client-Side Formatted PDF Financial Reporting Engine (jsPDF)',
      'Interactive UI with Vinyl Music Player & Real-Time Price Shift Logs'
    ],
    tools: ['React 18', 'TypeScript', 'Node.js', 'Groq LLM', 'Tailwind CSS', 'jsPDF', 'Framer Motion'],
    stats: 'Dynamic AI-driven odds shifts between 1% and 99% with automated Groq LLM news headline impact analysis.'
  },
  {
    src: '/assets/projects/fincept.png',
    image: '/assets/projects/fincept.png',
    alt: 'Fincept',
    title: 'Fincept',
    subtitle: 'Multi-Agent Investment Intelligence System',
    description: 'Institutional-grade investment intelligence platform designed to empower retail investors. Employs a multi-agent AI architecture powered by Google Gemini (PortfolioAgent, AnalysisAgent, NewsAgent, JargonAgent, and Orchestrator) that consolidates multi-broker portfolios (CSV/Excel/PDF), performs automated geopolitical news mapping with self-correcting critic loops, and delivers personalized capital allocation advice.',
    tag: 'Quantitative Finance & Multi-Agent AI',
    color: '#17153B',
    textColor: '#FFFFFF',
    link: null,
    github: 'https://github.com/RutuGhatge/Fincept',
    category: 'QUANTITATIVE FINANCE & AI',
    deliverables: [
      'Multi-Agent Orchestration Framework (Analysis, Critique & Refinement)',
      'Institutional Multi-Broker Portfolio Aggregation (CSV/Excel/PDF)',
      'Autonomous Geopolitical News Intelligence & Holdings Impact Mapping',
      'Interactive Jargon Decoder & Context-Aware Financial Explanations',
      'Capital Allocation Optimizer ("Allocate" Suggestion Engine)'
    ],
    tools: ['FastAPI', 'Google Gemini AI', 'React 18', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    stats: 'Multi-agent reasoning pipeline with self-correcting critic loops and unified multi-broker statement reconciliation.'
  },
  {
    src: '/assets/projects/dlm.png',
    image: '/assets/projects/dlm.png',
    alt: 'DLM',
    title: 'DLM',
    subtitle: 'Autonomous GenAI Document Lifecycle Management',
    description: 'Autonomous enterprise document management agent designed to govern the full lifecycle of business documents (invoices, contracts, and regulatory filings) with minimal human intervention. Integrates OCR-based Intelligent Document Processing (IDP), BPMN 2.0 workflow orchestration for approvals and escalations, and Retrieval-Augmented Generation (RAG) for policy-grounded document creation.',
    tag: 'Generative AI & Workflow Automation',
    color: '#1E201E',
    textColor: '#FFFFFF',
    link: null,
    github: 'https://github.com/DocumentLifeManagement/DLM-gen-ai',
    category: 'GENERATIVE AI & BPMN',
    deliverables: [
      'Automated Ingestion Pipeline Supporting Email, API & Document Uploads',
      'OCR & NLP Intelligent Data Extraction with Confidence Scoring',
      'Policy-Grounded Dynamic Document Generation (DOCX, HTML, PDF via RAG)',
      'BPMN 2.0 Orchestrated Approval, Escalation & Exception Handling Workflows',
      'Role-Based Access Control (RBAC), Retention Policies & Immutable Audit Trails'
    ],
    tools: ['Python', 'FastAPI', 'React', 'BPMN 2.0 (Camunda)', 'Pinecone / FAISS', 'Tesseract / Google Vision', 'PostgreSQL'],
    stats: 'End-to-end autonomous document lifecycle processing with OCR confidence validation and policy-grounded RAG.'
  }
];

export const LANDING_PAGES = [
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

export const STATIC_PROJECTS = {
  solar: {
    category: 'APP DESIGN',
    title: 'SOLAR PANEL MOBILE APP',
    description: 'An intelligent energy management application that allows users to monitor real-time photovoltaic output, battery reserve statuses, and grid export rates.',
    deliverables: ['Real-time IoT Telemetry Interface', 'Dark Mode High-Contrast UI', 'Custom Interactive Solar Graphs', 'Battery Degradation Predictor'],
    tools: ['Figma', 'React Native', 'Tailwind', 'SwiftUI'],
    stats: '428.4 kWh daily monitoring capacity with 99.8% precision telemetry.'
  },
  furniture: {
    category: 'FURNITURE APP',
    title: 'OUR GROUNDBREAKING FURNITURE',
    description: 'A minimalist architectural furniture e-commerce experience designed for curated designer objects, featuring augmented reality preview and fluid one-tap checkout.',
    deliverables: ['Editorial Product Showcase', 'Minimal Cart Flow', 'Haptic Interactions', 'AR Object Viewer'],
    tools: ['Figma', 'Three.js', 'Next.js', 'Stripe'],
    stats: 'Featured piece: Hand-carved Wood Chair ($140.00).'
  },
  atelier: {
    category: 'WEB DESIGN',
    title: 'ATELIER MONOCHROME STUDIO',
    description: 'A bespoke editorial web portfolio for an international Scandinavian architecture practice. Built with subtle typography gradients, fluid scroll interactions, and monolithic layout grids.',
    deliverables: ['Editorial Layout System', 'Custom Typography Styling', 'Full Responsive CMS', 'Scroll-linked Animations'],
    tools: ['Figma', 'Webflow', 'GSAP', 'Barba.js'],
    stats: 'Awarded Site of the Day for Editorial Excellence.'
  },
  nexus: {
    category: 'WEB APPLICATION',
    title: 'NEXUS AI ANALYTICS PLATFORM',
    description: 'A mission-critical observability and analytics console for distributed systems. Real-time telemetry, cluster health maps, and predictive query cost forecasting.',
    deliverables: ['Real-time Stream Canvas', 'Data Visualization System', 'Keyboard-Driven Command Palette', 'Micro-interactions'],
    tools: ['React', 'TypeScript', 'Tailwind', 'D3.js'],
    stats: 'Processes over 1.2M queries per second at 12ms average latency.'
  }
};

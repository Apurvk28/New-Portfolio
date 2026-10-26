import React, { useState, useEffect } from 'react';

export default function Navigation({ onOpenContact }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'experience', 'certificates'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'experience', label: 'EDUCATION' },
    { id: 'certificates', label: 'CERTIFICATES' },
  ];

  return (
    <>
      <header
        className="relative z-40 bg-[#FAFAFA] transition-all duration-300 w-full pt-6 pb-4 px-6 md:px-14 max-w-[1400px] mx-auto flex items-center justify-between"
        data-purpose="site-navigation"
      >
        {/* Brand Wordmark */}
        <a className="group font-extrabold text-xl tracking-tight text-black flex items-center" href="#home">
          <span>Apurv</span>
          <span className="inline-block w-2 h-2 bg-black rounded-full ml-1 transition-transform group-hover:scale-150 duration-200"></span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/95 border border-[#E2E2E2] rounded-full shadow-sm text-xs font-semibold tracking-wider text-neutral-600">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-${link.id}`}
                href={`#${link.id}`}
                className={`nav-link px-4 py-2 rounded-full border transition whitespace-nowrap ${
                  isActive
                    ? 'border-neutral-300 text-black'
                    : 'border-transparent hover:border-neutral-200 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Social & Menu Links */}
        <div className="flex items-center gap-1.5 md:gap-2 p-1.5 bg-white/95 border border-[#E2E2E2] rounded-full shadow-sm">
          {/* Instagram */}
          <a
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-neutral-700 hover:text-black"
            href="https://www.instagram.com/apurvk28"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect height="18" rx="5" ry="5" width="18" x="3" y="3"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-neutral-700 hover:text-black"
            href="https://x.com/KhairnarApurv"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-neutral-700 hover:text-black"
            href="https://www.linkedin.com/in/apurvk28"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-neutral-700 hover:text-black"
            href="https://github.com/Apurvk28"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 transition text-neutral-700 ml-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="4" x2="20" y1="7" y2="7"></line>
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="17" y2="17"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex justify-end ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target.id === 'mobile-drawer') setMobileMenuOpen(false);
        }}
      >
        <div
          id="mobile-drawer-content"
          className={`w-4/5 max-w-sm bg-white h-full p-8 flex flex-col justify-between transition-transform duration-300 shadow-2xl ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
              <span className="font-extrabold text-lg tracking-tight">Apurv•</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-black"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-4 mt-8 text-base font-bold tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-neutral-100 hover:text-neutral-500"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="py-2 text-left text-black hover:underline"
              >
                CONTACT
              </button>
            </nav>
          </div>
          <div className="pt-6 border-t border-neutral-200">
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">APURV KHAIRNAR</p>
            <p className="text-xs text-neutral-600">Full Stack Developer & Designer</p>
          </div>
        </div>
      </div>
    </>
  );
}

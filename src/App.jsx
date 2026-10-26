import React, { useState, useCallback, useEffect } from 'react';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import AboutSection from './components/AboutSection.jsx';
import FeaturedProjects from './components/FeaturedProjects.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import Certificates from './components/LandingPages.jsx';
import Footer from './components/Footer.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import ContactModal from './components/ContactModal.jsx';
import ResumeModal from './components/ResumeModal.jsx';
import ToastContainer from './components/ToastContainer.jsx';

export default function App() {
  const [toasts, setToasts] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [contactService, setContactService] = useState('Full Stack Web Project');

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always redirect to main landing page on page load / refresh
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const handleOpenContact = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const handleOpenResume = useCallback(() => {
    setIsResumeModalOpen(true);
  }, []);

  const handleOpenProject = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="min-h-screen text-[#111] bg-[#FAFAFA]">
      <ToastContainer toasts={toasts} />

      <Navigation onOpenContact={handleOpenContact} />

      <Hero />

      <AboutSection
        onOpenContact={handleOpenContact}
        onOpenResume={handleOpenResume}
      />

      {/* Projects section positioned above Experience section */}
      <FeaturedProjects onOpenProject={handleOpenProject} />

      <ExperienceSection />

      {/* Certificates section (renamed from landing pages) */}
      <Certificates onOpenProject={handleOpenProject} />

      <Footer onOpenContact={handleOpenContact} />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

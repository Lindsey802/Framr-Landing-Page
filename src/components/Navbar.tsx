import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { FramrLogo } from './brand/FramrLogo';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (open) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
  }, [open]);

  // Handle resize
  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (window.innerWidth > 767) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Handle escape key
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <nav className={`navbar absolute top-0 left-0 right-0 z-20 transition-all duration-300 ${scrolled ? 'py-0' : 'py-1'}`}>
      <div className="navbar-container">
        <a href="/" className="flex items-center gap-2.5"><FramrLogo size={isMobile ? 26 : 28} className="shrink-0" /><span className="text-sm font-medium tracking-tight text-black">Framr</span></a>
        
        {/* Desktop links */}
        <ul className="navbar-links hidden md:flex items-center">
          <li className="group relative">
            <a href="#features" className="flex items-center gap-1">
              Features <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </a>
          </li>
          <li><a href="#use-cases">Use Cases</a></li>
          <li><a href="#integrations">Integrations</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>

        {/* Desktop CTA */}
        <div className="navbar-cta hidden md:flex items-center">
          <a href="/login" className="nav-login">Log in</a>
          <a href="/signup" className="nav-signup">Get Started →</a>
        </div>

        {/* Mobile hamburger */}
        <button 
          className="navbar-hamburger md:hidden" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <ul>
          <li><a href="#features" onClick={() => setOpen(false)}>Features</a></li>
          <li><a href="#use-cases" onClick={() => setOpen(false)}>Use Cases</a></li>
          <li><a href="#integrations" onClick={() => setOpen(false)}>Integrations</a></li>
          <li><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a></li>
          <li className="pt-4 border-t border-[#F4F4F5]"><a href="/login" onClick={() => setOpen(false)}>Log in</a></li>
          <li><a href="/signup" onClick={() => setOpen(false)} className="nav-signup-mobile">Get Started →</a></li>
        </ul>
      </div>
    </nav>
  );
}

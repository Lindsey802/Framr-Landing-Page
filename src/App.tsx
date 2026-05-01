import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { PromptBar } from './components/PromptBar';
import { LogoMarquee } from './components/LogoMarquee';
import { OnyxPlatform } from './components/OnyxPlatform';
import { BenchmarksSection } from './components/BenchmarksSection';
import { UseCasesSection } from './components/UseCasesSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FloatingHelpChat } from './components/FloatingHelpChat';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden pt-[72px]" id="app-root">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex h-[calc(100vh-72px)] min-h-[620px] w-full flex-col items-center justify-center overflow-hidden bg-white">
        {/* Background patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute inset-0 bg-grid pointer-events-none z-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)]"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-6 flex flex-col items-center gap-4 md:gap-6">
          <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-wide text-neutral-500">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-black" fill="currentColor" aria-hidden="true">
              <path d="M13 2 5 13h6l-1 9 9-13h-6z" />
            </svg>
            <span>12,000+ frames shipped this week</span>
          </p>

          <div className="relative">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,7vw,96px)] font-medium leading-[1.02] tracking-[-0.04em] text-black block"
              id="hero-title-1"
            >
              Frame anything.
            </motion.h1>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,7vw,96px)] font-medium leading-[1.02] tracking-[-0.04em] text-black block"
              id="hero-title-2"
            >
              Ship in seconds.
            </motion.h1>
          </div>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-2 text-lg text-neutral-500 font-medium max-w-xl mx-auto"
            id="hero-subhead"
          >
            Framr is the multi-agent AI platform that turns ideas into action.
          </motion.p>

          <div className="w-full max-w-2xl mx-auto -mt-4">
            <PromptBar />
          </div>
        </div>
      </section>

      <LogoMarquee />
      <OnyxPlatform />
      <BenchmarksSection />
      <UseCasesSection />
      <IntegrationsSection />
      <TestimonialsSection />

      <Footer />

      <FloatingHelpChat />

      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-50/50 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}

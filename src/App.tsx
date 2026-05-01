import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Logo } from './components/Logo';
import { PromptBar } from './components/PromptBar';
import { LogoMarquee } from './components/LogoMarquee';
import { OnyxPlatform } from './components/OnyxPlatform';
import { BenchmarksSection } from './components/BenchmarksSection';
import { UseCasesSection } from './components/UseCasesSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden" id="app-root">
      {/* Hero Section */}
      <section className="relative flex min-h-[600px] h-screen w-full flex-col items-center justify-center overflow-hidden bg-white md:h-screen">
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* Background patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute inset-0 bg-grid pointer-events-none z-0"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-6">
          <div className="relative mb-4">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(40px,6.5vw,96px)] font-semibold leading-[1.0] tracking-[-0.03em] text-black block"
              id="hero-title-1"
            >
              Frame anything.
            </motion.h1>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(40px,6.5vw,96px)] font-semibold leading-[1.0] tracking-[-0.03em] text-black block"
              id="hero-title-2"
            >
              Ship in seconds.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-4 mb-8 text-[clamp(16px,1.3vw,18px)] text-zinc-600 font-medium max-w-2xl mx-auto"
            id="hero-subhead"
          >
            Framr is the AI design copilot that turns ideas into frames.
          </motion.p>

          <div className="w-full max-w-2xl mx-auto">
            <PromptBar />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
            id="cta-row"
          >
            <button className="w-full sm:w-auto px-6 py-2.5 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg active:scale-95" id="hero-book-demo">
              Book a Demo
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-white text-zinc-900 border border-zinc-200 font-semibold rounded-xl hover:bg-zinc-50 transition-all active:scale-95" id="hero-try-free">
              Try for Free
            </button>
          </motion.div>
        </div>
      </section>

      <LogoMarquee />
      <OnyxPlatform />
      <BenchmarksSection />
      <UseCasesSection />
      <IntegrationsSection />
      <TestimonialsSection />

      <Footer />

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all z-50 group"
        id="floating-help"
      >
        <span className="absolute -top-12 right-0 bg-white text-black border border-zinc-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          How can we help?
        </span>
        <div className="relative">
          <span className="absolute inset-0 bg-white/20 blur-sm rounded-full animate-ping" />
          <Logo height={20} className="transform -rotate-12 group-hover:rotate-0 transition-transform" />
        </div>
      </motion.button>

      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-50/50 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}

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
      <section className="relative flex min-h-[600px] h-screen w-full flex-col items-center justify-center overflow-hidden bg-white pt-24 md:pt-32 md:h-screen">
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>

        {/* Background patterns */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute inset-0 bg-grid pointer-events-none z-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)]"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 w-full px-6 flex flex-col items-center gap-6 md:gap-8">
          <p className="mb-6 text-xs uppercase tracking-wide text-neutral-500">⚡ 12,000+ frames shipped this week</p>

          <div className="relative">
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,7vw,96px)] font-semibold leading-[1.02] tracking-[-0.04em] text-black block"
              id="hero-title-1"
            >
              Frame anything.
            </motion.h1>
            <motion.h1
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(56px,7vw,96px)] font-semibold leading-[1.02] tracking-[-0.04em] text-black block"
              id="hero-title-2"
            >
              Ship in seconds.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-5 text-lg text-neutral-500 font-medium max-w-xl mx-auto"
            id="hero-subhead"
          >
            Framr is the AI design copilot that turns ideas into frames.
          </motion.p>

          <div className="w-full max-w-2xl mx-auto">
            <PromptBar />
          </div>

          <a className="mt-2 text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900" id="cta-row" href="/demo">
            Or book a demo →
          </a>
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

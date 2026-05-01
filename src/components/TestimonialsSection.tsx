import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const partners = [
  { name: 'Brex', domain: 'brex.com' },
  { name: 'Thales', domain: 'thalesgroup.com' },
  { name: 'Roku', domain: 'roku.com' },
  { name: 'Sportradar', domain: 'sportradar.com' },
  { name: 'UC Berkeley', domain: 'berkeley.edu', isText: true },
];

export function TestimonialsSection() {
  const roiValue = useMotionValue(0);
  const springRoi = useSpring(roiValue, { damping: 50, stiffness: 300 });
  const displayRoi = useTransform(springRoi, (latest) => Math.round(latest));
  const [roiText, setRoiText] = useState(0);

  useEffect(() => {
    return displayRoi.on("change", (latest) => {
      setRoiText(latest);
    });
  }, [displayRoi]);

  return (
    <section className="py-24 bg-[#F4F4F5]" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Row 1: Content + Stats + Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Left: Heading */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-sm font-bold text-[#8A8A8A] uppercase tracking-wider mb-4">
              Join Industry Leaders
            </span>
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#111] leading-[1.1] tracking-tight">
              Stay ahead of competition<br />
              Enable your team with AI
            </h2>
          </motion.div>

          {/* Middle: ROI Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => roiValue.set(30)}
            className="lg:col-span-2 bg-[#0A0A0A] rounded-2xl p-8 flex flex-col justify-center aspect-[1/1.2]"
          >
            <div className="text-white text-5xl font-bold tracking-tighter">
              {roiText}x
            </div>
            <div className="text-white/70 text-sm font-medium mt-2 uppercase tracking-widest">
              ROI
            </div>
          </motion.div>

          {/* Right: Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4 bg-white border border-[#ECECEC] rounded-2xl p-8 flex flex-col shadow-sm relative group"
          >
            <div className="absolute top-6 right-6 text-zinc-300 group-hover:text-zinc-900 transition-colors cursor-pointer">
              <ArrowUpRight size={20} />
            </div>
            
            <div className="text-[32px] font-serif text-[#D4D4D8] leading-none mb-4 h-4">
              “
            </div>
            
            <p className="text-[14px] text-[#3F3F46] leading-relaxed mb-6 font-medium">
              Framr is answering thousands of questions a week at Ramp. We tried a variety of other AI tools but none had the same answer reliability as Framr. It's been a huge productivity boost as we continue to scale.
            </p>

            <div className="text-right text-[32px] font-serif text-[#D4D4D8] leading-none mb-6 -mt-4 h-4">
              ”
            </div>

            <div className="mt-auto pt-6 border-t border-[#F4F4F5] flex items-center justify-between">
              <img 
                src="https://logo.clearbit.com/ramp.com" 
                alt="Ramp" 
                className="h-5 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=ramp.com&sz=64`;
                }}
              />
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#111]">Tony Rios</div>
                <div className="text-[12px] text-[#71717A]">Director of Product Ops</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Customer Logos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center border-t border-[#ECECEC] pt-16">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="flex justify-center"
            >
              {partner.isText ? (
                <span className="text-xl font-serif text-[#111] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  UC Berkeley
                </span>
              ) : (
                <img
                  src={`https://logo.clearbit.com/${partner.domain}`}
                  alt={partner.name}
                  referrerPolicy="no-referrer"
                  className="h-7 object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=64`;
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

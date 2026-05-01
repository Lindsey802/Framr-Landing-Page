import React from 'react';
import { motion } from 'motion/react';
import { Gauge } from './Gauge';

const benchmarkData = [
  { pct: 64, competitor: "ChatGPT", color: "#C8E6C9" }, // light green
  { pct: 68.1, competitor: "Claude", color: "#F5D5C8" }, // pale peach
  { pct: 76, competitor: "Notion AI", color: "#D9D6E8" }, // pale lavender
];

export function BenchmarksSection() {
  return (
    <section className="py-24 bg-white" id="benchmarks">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Boundary Line */}
        <div className="w-full h-[1px] bg-[#ECECEC] mb-20" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Header Content */}
          <div className="lg:col-span-4 max-w-md">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold text-[#8A8A8A] uppercase tracking-[0.15em] block mb-4"
            >
              Benchmarks
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[36px] font-bold tracking-tight text-[#111111] mb-6 leading-[1.1]"
            >
              Answers you can trust
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#5A5A5A] text-[15px] leading-relaxed max-w-xs mb-10"
            >
              Tested on 99 real workplace questions across 220K internal documents. Scored blind by two independent LLM judges.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <button className="bg-[#111111] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:translate-y-[-2px] transition-all duration-300 active:scale-95 shadow-lg shadow-black/5 hover:shadow-black/10">
                See full results →
              </button>
            </motion.div>
          </div>

          {/* Gauges Grid */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-12 sm:gap-6">
              {benchmarkData.map((data) => (
                <div key={data.competitor} className="flex-1 w-full max-w-[240px]">
                  <Gauge 
                    percentage={data.pct} 
                    competitor={data.competitor} 
                    color={data.color} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Boundary Line */}
        <div className="w-full h-[1px] bg-[#ECECEC]" />
      </div>
    </section>
  );
}

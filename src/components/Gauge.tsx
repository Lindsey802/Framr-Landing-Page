import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'motion/react';

interface GaugeProps {
  percentage: number;
  competitor: string;
  color: string;
}

export function Gauge({ percentage, competitor, color }: GaugeProps) {
  // Semicircle measurements
  const radius = 90;
  const strokeWidth = 22;
  const normalizedRadius = radius;
  const circumference = Math.PI * normalizedRadius; // Length of semicircle arc

  // Animation for the arc
  const arcOffset = useSpring(circumference, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Animation for the number count-up
  const count = useSpring(0, {
    stiffness: 40,
    damping: 20
  });
  const displayCount = useTransform(count, (latest) => Math.round(latest * 10) / 10);
  const [value, setValue] = useState(0);

  useEffect(() => {
    return displayCount.on("change", (latest) => {
      setValue(latest);
    });
  }, [displayCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center group cursor-default"
      onViewportEnter={() => {
        arcOffset.set(circumference - (percentage / 100) * circumference);
        count.set(percentage);
      }}
    >
      <div className="relative w-full max-w-[220px] aspect-[2/1.2] flex items-center justify-center">
        <svg
          viewBox="0 0 200 110"
          className="w-full h-full transition-all duration-500"
        >
          {/* Background Arc (Muted color) */}
          <motion.path
            d="M 10,100 A 90,90 0 0 1 190,100"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
          />
          
          {/* Foreground Arc (Framr Win Rate) */}
          <motion.path
            d="M 10,100 A 90,90 0 0 1 190,100"
            fill="none"
            stroke="#111111"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: arcOffset,
            }}
          />
        </svg>

        {/* Percentage Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="flex items-baseline justify-center">
             <motion.span className="text-[40px] font-bold text-[#111] tracking-tighter tabular-nums">
               {value}%
             </motion.span>
          </div>
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block -mt-1">
            win rate
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
        <div className="flex items-center gap-1">
          <span className="text-[#111]">●</span>
          <span className="text-[#111] font-bold">Framr</span>
        </div>
        <span className="text-zinc-300 mx-0.5">vs</span>
        <div className="flex items-center gap-1">
          <span style={{ color: color }}>●</span>
          <span className="text-zinc-400">{competitor}</span>
        </div>
      </div>
    </motion.div>
  );
}

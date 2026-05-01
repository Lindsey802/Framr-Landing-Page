import React from 'react';
import { motion } from 'motion/react';
import * as Logos from './logos';

const row1 = [
  { name: 'Perplexity', Component: Logos.Perplexity },
  { name: 'Uber', Component: Logos.Uber },
  { name: 'Airbnb', Component: Logos.Airbnb },
  { name: 'Slack', Component: Logos.Slack },
  { name: 'GitHub', Component: Logos.GitHub },
  { name: 'OpenAI', Component: Logos.OpenAI },
  { name: 'Vercel', Component: Logos.Vercel },
  { name: 'Linear', Component: Logos.Linear },
  { name: 'Notion', Component: Logos.Notion },
  { name: 'Figma', Component: Logos.Figma },
];

const row2 = [
  { name: 'Raycast', Component: Logos.Raycast },
  { name: 'Arc', Component: Logos.Arc },
  { name: 'Ramp', Component: Logos.Ramp },
  { name: 'Loom', Component: Logos.Loom },
  { name: 'Stripe', Component: Logos.Stripe },
  { name: 'Spotify', Component: Logos.Spotify },
  { name: 'Discord', Component: Logos.Discord },
  { name: 'Webflow', Component: Logos.Webflow },
  { name: 'Shopify', Component: Logos.Shopify },
  { name: 'Intercom', Component: Logos.Intercom },
];

export function LogoMarquee() {
  return (
    <section className="py-20 bg-white border-y border-zinc-100 overflow-hidden" id="logo-marquee">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-[12px] font-mono uppercase tracking-[0.2em] text-zinc-500">
          Powering design teams at 500+ companies
        </p>
      </div>

      {/* Row 1: Left scrolling, 40s */}
      <div className="relative flex overflow-hidden group">
        <div 
          className="flex animate-marquee group-hover:pause gap-16 items-center py-4"
          style={{ animationDuration: '40s' }}
        >
          {[...row1, ...row1].map((brand, i) => (
            <LogoItem key={i} name={brand.name} Component={brand.Component} />
          ))}
        </div>
        
        {/* Edge masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* Row 2: Right scrolling, 50s */}
      <div className="relative flex overflow-hidden group mt-8">
        <div 
          className="flex animate-marquee-reverse group-hover:pause gap-16 items-center py-4"
          style={{ animationDuration: '50s' }}
        >
          {[...row2, ...row2].map((brand, i) => (
            <LogoItem key={i} name={brand.name} Component={brand.Component} />
          ))}
        </div>
        
        {/* Edge masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  );
}

function LogoItem({ name, Component }: { name: string, Component: React.FC<React.SVGProps<SVGSVGElement>>, key?: React.Key }) {
  return (
    <motion.div 
      whileHover={{ y: -2, scale: 1.05 }}
      className="flex items-center gap-3 cursor-default group/item transition-all"
    >
      <Component className="h-8 w-auto flex-shrink-0" />
      <span className="text-[20px] font-semibold tracking-tight text-zinc-700 group-hover/item:text-zinc-900 transition-colors whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntegrationLogo {
  name: string;
  domain: string;
}

const logos: IntegrationLogo[] = [
  // Row 1
  { name: 'Slack', domain: 'slack.com' },
  { name: 'Gmail', domain: 'gmail.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'SharePoint', domain: 'microsoft.com' },
  { name: 'Productboard', domain: 'productboard.com' },
  // Row 2
  { name: 'Microsoft Teams', domain: 'microsoft.com' },
  { name: 'Google Drive', domain: 'drive.google.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'GitLab', domain: 'gitlab.com' },
  { name: 'Jira', domain: 'atlassian.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'Sentry', domain: 'sentry.io' },
  // Row 3 (first cell empty)
  { name: 'EMPTY', domain: '' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Zendesk', domain: 'zendesk.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Confluence', domain: 'atlassian.com' },
  { name: 'Coda', domain: 'coda.io' },
  { name: 'Asana', domain: 'asana.com' },
];

const Logo = ({ domain, name, isPulse }: { domain: string; name: string; isPulse: boolean }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [
    `https://cdn.brandfetch.io/${domain}/w/64/h/64`,
    `https://logo.clearbit.com/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  ];

  return (
    <motion.img
      src={sources[srcIndex]}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setSrcIndex(i => Math.min(i + 1, sources.length - 1))}
      animate={isPulse ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.08 }}
      className="w-8 h-8 object-contain"
    />
  );
};

export function IntegrationsSection() {
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * logos.length);
      if (logos[randomIndex].name !== 'EMPTY') {
        setPulseIndex(randomIndex);
        setTimeout(() => setPulseIndex(null), 1000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#FAFAFA]" id="integrations">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-[#ECECEC] rounded-2xl p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-4"
            >
              <h2 className="text-[32px] font-bold text-[#111] leading-[1.15] tracking-tight mb-4">
                Framr connects to all your apps
              </h2>
              <p className="text-[#5A5A5A] text-[15px] leading-relaxed max-w-[360px] mb-8">
                Plug-and-play, syncs updates in real time, and respects fine grained access controls.
              </p>
              <button className="group relative flex items-center gap-2 px-5 py-2.5 bg-white border border-[#111] rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[#111] hover:text-white">
                See All Connectors
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </motion.div>

            {/* Right Logo Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 border-l border-t border-[#ECECEC]">
                {logos.map((logo, idx) => {
                  const isPulse = pulseIndex === idx;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: idx * 0.04, 
                        duration: 0.4,
                        scale: {
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }
                      }}
                      className={`
                        relative aspect-square flex items-center justify-center 
                        border-r border-b border-[#ECECEC]
                        transition-colors duration-200 hover:bg-[#F5F5F5]
                        ${logo.name === 'EMPTY' ? 'hidden lg:flex' : 'flex'}
                      `}
                    >
                      {logo.name !== 'EMPTY' && (
                        <Logo domain={logo.domain} name={logo.name} isPulse={isPulse} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

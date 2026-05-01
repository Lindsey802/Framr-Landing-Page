import React from 'react';
import { motion } from 'motion/react';
import { Users, Code, TrendingUp, Headphones } from 'lucide-react';

interface UseCase {
  title: string;
  body: string;
  icon?: React.ElementType;
  iconColor?: string;
  isTitle?: boolean;
  isEmpty?: boolean;
}

const useCases: UseCase[] = [
  {
    title: "Use Cases",
    body: "Improve productivity for every department",
    isTitle: true
  },
  {
    title: "Company Wide",
    body: "Empower every member with secure access to GenAI and knowledge",
    icon: Users,
    iconColor: "text-black"
  },
  {
    title: "Engineering",
    body: "Ship faster with Generative AI and full context",
    icon: Code,
    iconColor: "text-[#7C3AED]"
  },
  {
    title: "Sales",
    body: "Close more deals with instant access to every conversation and product update",
    icon: TrendingUp,
    iconColor: "text-[#16A34A]"
  },
  {
    title: "Support",
    body: "Answer questions confidently across your entire product",
    icon: Headphones,
    iconColor: "text-[#2563EB]"
  },
  {
    title: "",
    body: "",
    isEmpty: true
  }
];

export function UseCasesSection() {
  return (
    <section className="py-24 bg-white" id="use-cases">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#ECECEC] rounded-2xl overflow-hidden bg-white">
          {useCases.map((useCase, idx) => (
            <div 
              key={idx}
              className={`
                relative flex flex-col p-10 min-h-[220px]
                border-r border-b border-[#ECECEC]
                ${useCase.isEmpty ? 'invisible md:visible border-none bg-transparent' : 'bg-white'}
              `}
            >
              {!useCase.isEmpty && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6, ease: "easeOut" }}
                  className="h-full flex flex-col relative z-10"
                >
                  {useCase.isTitle ? (
                    <div className="space-y-4">
                      <span className="text-[13px] font-bold text-[#8A8A8A] uppercase tracking-wider block">
                        {useCase.title}
                      </span>
                      <h2 className="text-[28px] font-bold text-[#111] leading-tight max-w-[280px]">
                        {useCase.body}
                      </h2>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-[18px] font-semibold text-[#111] mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-[#5A5A5A] text-[14px] leading-relaxed max-w-[280px]">
                        {useCase.body}
                      </p>
                      {useCase.icon && (
                        <div className="mt-auto pt-6">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.2 }}
                            className={`${useCase.iconColor}`}
                          >
                            <useCase.icon size={22} strokeWidth={2} />
                          </motion.div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Hover Overlay */}
                  {!useCase.isTitle && (
                    <div className="absolute inset-0 bg-[#FAFAFA] opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none -z-10" />
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

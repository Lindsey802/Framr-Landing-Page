import { motion } from 'motion/react';
import { Search, Globe, Image, Database, Plus, Share2, MessageSquare, ShieldCheck, Settings2, FileText, Slack, Github, Info, ChevronRight, MoreVertical, Sparkles } from 'lucide-react';
import { OpenAI, ClaudeLogo, GeminiLogo, DeepSeekLogo, AzureLogo, MetaLogo } from './logos';
import { Logo } from './Logo';

export function OnyxPlatform() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="onyx-platform">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900">
            The Onyx Platform
          </h2>
        </div>

        {/* Bento Grid Container */}
        <div className="relative border border-zinc-200 rounded-[32px] overflow-hidden bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Top Row: Feature Rich & Reliable Responses */}
            <div className="p-8 border-b border-r border-zinc-200 col-span-1">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">Feature Rich</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Deep research, MCP, code interpreter, web search, and other advanced chat features.
              </p>
              <p className="text-zinc-500 leading-relaxed mt-4 text-sm">
                Encourage collaboration with chat sharing, user feedback, and usage analytics.
              </p>
            </div>
            <div className="p-8 border-b border-zinc-200 col-span-1">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">Reliable Responses</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Answers grounded in your team's knowledge. Onyx combines hybrid-search, advanced RAG, contextual retrieval, and LLM-based knowledge graphs for the most accurate responses.
              </p>
            </div>
            {/* Spacer/Grid filler for top row col 3 */}
            <div className="border-b border-zinc-200 hidden md:block bg-zinc-50/30" />

            {/* Middle Section: The Main Visualization Area */}
            <div className="col-span-full relative min-h-[600px] bg-white">
              {/* Internal Graph Grid */}
              <div className="absolute inset-0 opacity-40 pointer-events-none" 
                   style={{ 
                     backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                     backgroundSize: '32px 32px' 
                   }} 
              />

              {/* Visualization Elements */}
              <div className="relative h-full w-full p-8 flex flex-col md:flex-row items-center justify-between gap-8 py-20">
                
                {/* Left Element: Search UI */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full max-w-[340px] bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-zinc-100">
                    <p className="text-sm text-zinc-400 mb-4">How can Onyx help you today?</p>
                    <div className="flex items-center gap-2">
                       <Plus className="w-4 h-4 text-zinc-400" />
                       <MoreVertical className="w-4 h-4 text-zinc-400" />
                       <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                         <Search className="w-3.5 h-3.5" />
                         Deep Research
                       </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    {[
                      { icon: Search, label: 'Document Search' },
                      { icon: Image, label: 'Image Generation' },
                      { icon: Globe, label: 'Web Search' },
                      { icon: Search, label: 'Deep Research', active: true },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-blue-50/50 text-zinc-900 font-medium' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                        <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-600' : 'text-zinc-400'}`} />
                        <span className="text-xs">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Center Element: Content Workspace */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="hidden lg:block w-full max-w-[420px] bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b border-zinc-100 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-zinc-900 border-t-zinc-200 animate-spin-slow flex items-center justify-center p-1">
                       <div className="w-full h-full bg-zinc-900 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 bg-zinc-100 rounded-full w-3/4" />
                      <div className="h-2 bg-zinc-50 rounded-full w-1/2" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                       <div className="h-2 bg-zinc-100 rounded-full w-full" />
                       <div className="h-2 bg-zinc-100 rounded-full w-11/12" />
                       <div className="h-2 bg-zinc-100 rounded-full w-4/5" />
                       <div className="h-2 bg-zinc-50 rounded-full w-full" />
                    </div>
                    {/* Source Card Overlay */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm relative overflow-hidden group">
                       <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                             <Logo height={18} />
                             <span className="text-[10px] font-bold text-zinc-800 uppercase tracking-wider">Onyx: Open Source AI Assistant</span>
                          </div>
                          <Plus className="w-3.5 h-3.5 text-zinc-400" />
                       </div>
                       <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                         Onyx is the open source generative AI platform connected to your company's docs, apps, and knowledge base.
                       </p>
                       <div className="flex items-center justify-between">
                         <div className="flex gap-2">
                            <Share2 className="w-3 h-3 text-zinc-400" />
                            <MessageSquare className="w-3 h-3 text-zinc-400" />
                         </div>
                         <div className="flex items-center gap-2 px-2 py-1 bg-zinc-50 rounded-md text-[9px] font-medium text-zinc-600">
                           <Search className="w-2.5 h-2.5" />
                           All Sources
                         </div>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Element: Menus */}
                <div className="relative w-full max-w-[280px] h-[300px]">
                  {/* Model Menu */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute top-0 right-0 w-[240px] bg-white border border-zinc-200 rounded-2xl shadow-xl z-20 pb-4"
                  >
                    <div className="p-3 border-b border-zinc-100">
                       <div className="flex items-center gap-2 text-blue-600">
                         <Database className="w-4 h-4" />
                         <span className="text-xs font-semibold">GPT-5.4</span>
                       </div>
                    </div>
                    <div className="p-2 space-y-1">
                       {[
                         { Component: ClaudeLogo, label: 'Claude Opus 4.6' },
                         { Component: GeminiLogo, label: 'Gemini 3.1 Pro' },
                         { Component: DeepSeekLogo, label: 'DeepSeek V3' },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer group">
                           <item.Component className="w-4 h-4" />
                           <span className="text-[11px] text-zinc-600 group-hover:text-zinc-900">{item.label}</span>
                         </div>
                       ))}
                    </div>
                    <div className="mt-2 px-4 space-y-2">
                       <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Select Model</p>
                       <Settings2 className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </motion.div>

                  {/* Connectors Menu - Peeking Behind */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-10 -right-10 w-[240px] bg-white border border-zinc-200 rounded-2xl shadow-2xl z-10"
                  >
                    <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <Plus className="w-4 h-4 text-zinc-400" />
                         <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Connectors</span>
                       </div>
                       <Plus className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="p-2 space-y-1">
                      {[ 
                        { icon: Database, label: 'Google Drive', color: 'text-amber-500' },
                        { icon: Slack, label: 'Slack', color: 'text-purple-600', active: true },
                        { icon: ShieldCheck, label: 'Jira', color: 'text-blue-600' },
                        { icon: Github, label: 'Github', color: 'text-zinc-900' },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-blue-50/50' : 'hover:bg-zinc-50'}`}>
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <span className={`text-xs ${item.active ? 'text-zinc-900 font-medium' : 'text-zinc-600'}`}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
            </div>

            {/* Bottom Row: Customizable and Empty Space */}
            <div className="md:col-start-3 p-8 border-t border-l border-zinc-200">
              <h3 className="text-2xl font-semibold mb-4 text-zinc-900">Customizable</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                Flexible configuration options for LLM providers, search settings, connected apps, access controls, and much more.
              </p>
            </div>
            {/* Filler for the rest of bottom row */}
            <div className="md:col-start-1 md:col-end-3 border-t border-zinc-200 hidden md:block bg-zinc-50/30" />
          </div>
        </div>
      </div>
    </section>
  );
}

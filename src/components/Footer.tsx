import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-black text-zinc-500 py-20 border-t border-zinc-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <Logo height={28} invert className="mb-6 opacity-80" />
            <p className="max-w-xs text-sm leading-relaxed mb-8">
              The AI design copilot that turns ideas into high-fidelity frames. Design anything, ship in seconds.
            </p>
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer">𝕏</div>
               <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer">in</div>
               <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer">gh</div>
            </div>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">Product</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">Resources</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white">Docs</a></li>
                <li><a href="#" className="hover:text-white">Guide</a></li>
                <li><a href="#" className="hover:text-white">Figma Plugin</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">Company</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold mb-6">Legal</h4>
             <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-900 text-xs">
           <p>© 2026 Framr Labs Inc. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
              <span className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
                 All systems operational
              </span>
           </div>
        </div>
      </div>
    </footer>
  );
}

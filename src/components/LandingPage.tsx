import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Aperture, Camera, MapPin, Wand2, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background selection:bg-primary/30">
      
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial Gradient Orbs - New Colors */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3E8AEA]/30 rounded-full blur-[150px] -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#64AE87]/20 rounded-full blur-[150px] translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#D48849]/15 rounded-full blur-[120px]" style={{ animationDelay: '4s' }}></div>
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15] grid-animate" 
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }} 
        />
        
        {/* Noise/Stars overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
          }}
        />
      </div>

      {/* Language Imprints - Floating text */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <div className="language-float absolute top-[10%] left-[5%] text-6xl font-bold tracking-tighter">
          Téléporter
        </div>
        <div className="language-float absolute top-[20%] right-[10%] text-5xl font-bold tracking-tighter" style={{ animationDelay: '2s' }}>
          瞬間移動
        </div>
        <div className="language-float absolute top-[40%] left-[15%] text-7xl font-bold tracking-tighter" style={{ animationDelay: '4s' }}>
          Teletransportar
        </div>
        <div className="language-float absolute bottom-[30%] right-[8%] text-6xl font-bold tracking-tighter" style={{ animationDelay: '6s' }}>
          순간이동
        </div>
        <div className="language-float absolute bottom-[15%] left-[12%] text-5xl font-bold tracking-tighter" style={{ animationDelay: '8s' }}>
          Teleportieren
        </div>
      </div>

      {/* Top Banner - Powered by */}
      <div className="relative z-50 border-b border-white/5 bg-gradient-to-r from-[#3E8AEA]/5 via-[#64AE87]/5 to-[#D48849]/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2">
          <span className="text-xs text-secondary">Powered by</span>
          <a 
            href="https://fal.ai/models/fal-ai/nano-banana-pro/edit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all group"
          >
            <Zap className="w-3 h-3 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
            <span className="text-xs font-semibold text-white group-hover:text-white/90 transition-colors">Nano Banana Pro</span>
          </a>
          <span className="text-xs text-secondary/60">via</span>
          <a 
            href="https://fal.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-[8px] font-bold text-white">F</span>
            </div>
            <span className="text-xs font-medium text-secondary group-hover:text-white transition-colors">fal.ai</span>
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-[#3E8AEA] to-[#64AE87] rounded-lg flex items-center justify-center shadow-lg shadow-[#3E8AEA]/20">
            <Aperture className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">SelfieAt</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-secondary">
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <button 
          onClick={onStart}
          className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-white ring-1 ring-white/5 hover:ring-white/20"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        {/* Floating multilingual text background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Top left corner */}
          <div className="absolute top-10 left-10 text-5xl font-bold text-white/5 animate-text-float">Paris</div>
          <div className="absolute top-24 left-32 text-4xl font-bold text-white/4 animate-text-float delay-100">東京</div>
          
          {/* Top right corner */}
          <div className="absolute top-16 right-12 text-6xl font-bold text-white/3 animate-text-float delay-200">नई दिल्ली</div>
          <div className="absolute top-36 right-32 text-5xl font-bold text-white/4 animate-text-float delay-500">서울</div>
          
          {/* Bottom left corner */}
          <div className="absolute bottom-20 left-8 text-5xl font-bold text-white/4 animate-text-float delay-400">São Paulo</div>
          <div className="absolute bottom-36 left-24 text-6xl font-bold text-white/5 animate-text-float delay-700">القاهرة</div>
          
          {/* Bottom right corner */}
          <div className="absolute bottom-24 right-16 text-6xl font-bold text-white/5 animate-text-float delay-300">موسكو</div>
          <div className="absolute bottom-40 right-36 text-5xl font-bold text-white/4 animate-text-float delay-800">北京</div>
          <div className="absolute bottom-12 right-8 text-4xl font-bold text-white/3 animate-text-float delay-1000">Mumbai</div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 pb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-mint-300 selection:bg-blue-400 selection:text-black drop-shadow-[0_0_40px_rgba(62,138,234,0.8)] drop-shadow-[0_0_80px_rgba(62,138,234,0.6)] drop-shadow-[0_0_120px_rgba(62,138,234,0.4)]">Teleport</span> <br /> 
            your <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-mint-300 via-orange-300 to-orange-400 selection:bg-mint-400 selection:text-black drop-shadow-[0_0_30px_rgba(100,174,135,0.5)]">self(ies)</span> <br />
            <span className="text-white/50">anywhere.</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
            Upload a selfie, choose any location, and watch AI seamlessly merge you into stunning new scenes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#3E8AEA] via-[#64AE87] to-[#D48849] bg-[length:200%_100%] animate-shimmer-button text-white rounded-full font-semibold text-lg transition-all shadow-[0_0_40px_rgba(62,138,234,0.6)] hover:shadow-[0_0_60px_rgba(62,138,234,0.8)] flex items-center gap-2 ring-2 ring-[#3E8AEA]/30 hover:ring-[#3E8AEA]/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              Teleport Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              
              {/* Animated pulsing ring */}
              <span className="absolute inset-0 rounded-full ring-2 ring-[#3E8AEA]/20 animate-ping"></span>
            </button>
          </div>
        </motion.div>

        {/* Example Showcase - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-24 max-w-6xl w-full"
        >
          <div className="text-center mb-12">
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#3E8AEA]/10 to-[#64AE87]/10 border border-white/10 text-xs font-medium text-white mb-4 backdrop-blur-sm"
            >
              ✨ See It In Action
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              One Photo. <span className="bg-gradient-to-r from-[#3E8AEA] via-[#64AE87] to-[#D48849] bg-clip-text text-transparent">Infinite Destinations.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-secondary"
            >
              Upload once, teleport anywhere, instantly generate stunning variations.
            </motion.p>
          </div>

          {/* Visual Flow with Enhanced Animations */}
          <div className="relative flex items-center justify-center gap-8 flex-wrap lg:flex-nowrap p-8 rounded-3xl bg-gradient-to-br from-white/[0.02] to-white/[0.01] border border-white/5">
            
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="absolute w-32 h-32 bg-[#3E8AEA]/10 rounded-full blur-3xl top-10 left-10 animate-pulse-slow"></div>
              <div className="absolute w-32 h-32 bg-[#64AE87]/10 rounded-full blur-3xl bottom-10 right-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Input Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center relative z-10"
            >
              <div className="relative group">
                {/* Animated ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E8AEA] via-[#64AE87] to-[#D48849] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse-slow"></div>
                
                {/* Rotating border gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3E8AEA] via-[#64AE87] to-[#D48849] opacity-0 group-hover:opacity-100 transition-opacity animate-spin-slow" style={{ animation: 'spin 8s linear infinite' }}></div>
                
                <div className="relative w-48 h-64 rounded-2xl bg-black border-2 border-white/10 overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/example-input.png" 
                    alt="Example selfie input" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Scan line effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="scan-line-showcase absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3E8AEA] to-transparent"></div>
                  </div>
                </div>
              </div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-sm font-semibold text-white flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Original Selfie
              </motion.span>
            </motion.div>

            {/* Enhanced Animated Arrows with Flow */}
            <div className="relative flex flex-col gap-6 mx-4">
              {/* AI Processing Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#3E8AEA]/20 to-[#64AE87]/20 border border-white/10 backdrop-blur-md"
              >
                <span className="text-xs font-medium text-white flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D48849] animate-pulse" />
                  AI Processing
                </span>
              </motion.div>

              {/* Top Arrow - Paris */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center gap-2 group/arrow"
              >
                <svg width="100" height="40" viewBox="0 0 100 40" className="overflow-visible">
                  <defs>
                    <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#3E8AEA', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#3E8AEA', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow1">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 10 20 Q 50 5, 85 15"
                    fill="none"
                    stroke="url(#arrowGrad1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow1)"
                    className="arrow-flow"
                  />
                  <polygon points="85,15 80,12 80,18" fill="#3E8AEA" filter="url(#glow1)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </polygon>
                  
                  {/* Animated dots along path */}
                  <circle r="2" fill="#3E8AEA">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 10 20 Q 50 5, 85 15" />
                  </circle>
                </svg>
                <span className="text-xs font-medium text-[#3E8AEA] px-2 py-1 rounded bg-[#3E8AEA]/10 border border-[#3E8AEA]/20 group-hover/arrow:scale-110 transition-transform">
                  📍 Paris
                </span>
              </motion.div>

              {/* Bottom Arrow - Tokyo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-2 group/arrow"
              >
                <svg width="100" height="40" viewBox="0 0 100 40" className="overflow-visible">
                  <defs>
                    <linearGradient id="arrowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#64AE87', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#64AE87', stopOpacity: 1 }} />
                    </linearGradient>
                    <filter id="glow2">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M 10 20 Q 50 35, 85 25"
                    fill="none"
                    stroke="url(#arrowGrad2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow2)"
                    className="arrow-flow"
                  />
                  <polygon points="85,25 80,22 80,28" fill="#64AE87" filter="url(#glow2)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </polygon>
                  
                  {/* Animated dots along path */}
                  <circle r="2" fill="#64AE87">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M 10 20 Q 50 35, 85 25" />
                  </circle>
                </svg>
                <span className="text-xs font-medium text-[#64AE87] px-2 py-1 rounded bg-[#64AE87]/10 border border-[#64AE87]/20 group-hover/arrow:scale-110 transition-transform">
                  📍 Tokyo
                </span>
              </motion.div>
            </div>

            {/* Output Images - Enhanced */}
            <div className="flex flex-col gap-4 relative z-10">
              {/* Paris Result */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#3E8AEA]/40 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-40 h-52 rounded-xl bg-black border-2 border-[#3E8AEA]/30 overflow-hidden shadow-2xl group-hover:scale-105 group-hover:border-[#3E8AEA]/60 transition-all duration-500">
                  <img 
                    src="/example-paris.png" 
                    alt="Paris result example" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Location badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full border border-[#3E8AEA]/30">
                    <span className="text-[10px] text-[#3E8AEA] font-semibold">🗼 Paris</span>
                  </div>
                  
                  {/* Watermark */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10">
                    <span className="text-[8px] text-white/80 font-semibold">SelfieAt.ai</span>
                  </div>
                </div>
              </motion.div>

              {/* Tokyo Result */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative group"
                style={{ perspective: '1000px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#64AE87]/40 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative w-40 h-52 rounded-xl bg-black border-2 border-[#64AE87]/30 overflow-hidden shadow-2xl group-hover:scale-105 group-hover:border-[#64AE87]/60 transition-all duration-500">
                  <img 
                    src="/example-tokyo.png" 
                    alt="Tokyo result example" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Location badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full border border-[#64AE87]/30">
                    <span className="text-[10px] text-[#64AE87] font-semibold">🗾 Tokyo</span>
                  </div>
                  
                  {/* Watermark */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10">
                    <span className="text-[8px] text-white/80 font-semibold">SelfieAt.ai</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced How It Works - More Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full"
        >
          {[
            {
              icon: Camera,
              title: 'Upload Your Selfie',
              desc: 'Start by uploading a clear photo of yourself or capture one instantly',
              color: 'from-[#3E8AEA]/20 to-[#64AE87]/20',
              iconColor: 'text-[#3E8AEA]',
              borderColor: 'border-[#3E8AEA]/20',
              glowColor: 'group-hover:shadow-[#3E8AEA]/20',
              step: '01'
            },
            {
              icon: MapPin,
              title: 'Pick Your Locations',
              desc: 'Choose up to 2 dream destinations anywhere in the world',
              color: 'from-[#64AE87]/20 to-[#D48849]/20',
              iconColor: 'text-[#64AE87]',
              borderColor: 'border-[#64AE87]/20',
              glowColor: 'group-hover:shadow-[#64AE87]/20',
              step: '02'
            },
            {
              icon: Wand2,
              title: 'Watch AI Magic',
              desc: 'Our AI instantly merges you into photorealistic scenes in seconds',
              color: 'from-[#D48849]/20 to-[#3D4437]/20',
              iconColor: 'text-[#D48849]',
              borderColor: 'border-[#D48849]/20',
              glowColor: 'group-hover:shadow-[#D48849]/20',
              step: '03'
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              className={`p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border ${item.borderColor} hover:from-white/[0.06] hover:to-white/[0.02] transition-all group relative overflow-hidden hover:border-white/20 shadow-lg ${item.glowColor} hover:-translate-y-1`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative">
                {/* Large step number background */}
                <div className="absolute -top-4 -right-4 text-8xl font-bold text-white/[0.02] select-none">
                  {item.step}
                </div>
                
                {/* Icon with animation */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-1 ring-white/10 shadow-lg`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-secondary text-sm leading-relaxed group-hover:text-white/70 transition-colors">{item.desc}</p>
              </div>
              
              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-white/20 border-t border-white/5">
        <p>&copy; 2025 SelfieAt. All rights reserved.</p>
      </footer>
    </div>
  );
}

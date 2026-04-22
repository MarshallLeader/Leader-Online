import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Cpu, Zap, Monitor, Battery, Wifi, Shield, ChevronRight, Weight, MousePointer2, Sparkles, HardDrive, Layers, Box, Maximize2, Wind } from 'lucide-react';
import { useRef } from 'react';

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const laptopRotate = useTransform(smoothProgress, [0, 0.2], [0, -10]);
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-white font-sans selection:bg-sky-400/30 overflow-x-hidden relative">
      
      {/* Dynamic Background Graphics */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[20%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-sky-400/5 blur-[120px] rounded-full mix-blend-screen" />
        
        {/* Floating Geometric Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.3
            }}
            animate={{
              y: ["-10%", "110%"],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-12 h-12 border border-white/5 backdrop-blur-sm rounded-lg"
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 px-6 z-10">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sky-400 text-[10px] font-black tracking-[0.25em] uppercase hover:bg-white/10 transition-colors cursor-default"
            >
              <Sparkles size={14} /> <span>Crafted for Creators</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-[7vw] font-bold text-white leading-[0.88] tracking-tighter mix-blend-difference">
              SPEED IN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white/30">MOTION.</span>
            </h1>

            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">
              The SCE4-B1 Pro transcends portability. It's an extension of your creative will, wrapped in magnesium.
            </p>

            <div className="flex gap-4">
              <div className="flex items-end gap-2 group cursor-default">
                 <span className="text-4xl font-bold tracking-tighter">1.2</span>
                 <span className="text-xs text-slate-500 font-bold mb-1 group-hover:text-sky-400 transition-colors">KG</span>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div className="flex items-end gap-2 group cursor-default">
                 <span className="text-4xl font-bold tracking-tighter">14</span>
                 <span className="text-xs text-slate-500 font-bold mb-1 group-hover:text-sky-400 transition-colors">HRS</span>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <div className="flex items-end gap-2 group cursor-default">
                 <span className="text-4xl font-bold tracking-tighter">14"</span>
                 <span className="text-xs text-slate-500 font-bold mb-1 group-hover:text-sky-400 transition-colors">FHD+</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative flex justify-center order-1 lg:order-2 self-center">
            <motion.div 
              style={{ rotate: laptopRotate }}
              className="relative w-full max-w-[700px] group"
            >
              <div className="absolute inset-0 bg-sky-500/20 blur-[100px] rounded-full group-hover:bg-sky-500/40 transition-colors duration-1000" />
              
              <div className="relative aspect-[16/10] bg-zinc-950 border-[6px] border-zinc-800 rounded-2xl overflow-hidden shadow-2xl glass-effect">
                {/* 3D-ish Laptop Screen Rendering with Visuals */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black p-1">
                   <div className="w-full h-full relative overflow-hidden rounded-xl">
                      {/* Technical Blueprint Overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:20px_20px]" />
                      
                      {/* Hero Hardware Visual */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <motion.div 
                           animate={{ 
                             rotateY: [0, 10, 0, -10, 0],
                             rotateX: [0, 5, 0, -5, 0]
                           }}
                           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                           className="w-[80%] h-[80%] border border-sky-400/20 rounded-2xl backdrop-blur-sm bg-sky-500/5 relative group/screen"
                         >
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                               <div className="flex justify-between items-start">
                                  <div className="flex flex-col gap-1">
                                     <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Core Status</div>
                                     <div className="text-2xl font-bold italic">OPTIMIZED</div>
                                  </div>
                                  <Cpu className="text-sky-400 animate-pulse" size={32} />
                               </div>
                               
                               <div className="space-y-4">
                                  <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                                     <motion.div 
                                       animate={{ x: ["-100%", "100%"] }}
                                       transition={{ duration: 2.5, repeat: Infinity }}
                                       className="absolute inset-0 bg-sky-400 shadow-[0_0_10px_#38bdf8]" 
                                     />
                                  </div>
                                  <div className="flex justify-between text-[8px] font-bold text-slate-500">
                                     <span>MULTI-THREADING</span>
                                     <span>SYNC ACTIVE</span>
                                  </div>
                               </div>
                            </div>
                            {/* Inner Screen Graphic */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-sky-500/10 rounded-full animate-ping opacity-20" />
                         </motion.div>
                      </div>
                      
                      {/* Screen Reflections */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                   </div>
                </div>
                
                {/* Floating UI Interaction Icons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none"
                >
                   <div className="flex justify-end pt-2">
                      <div className="px-3 py-1 bg-sky-400/20 backdrop-blur-xl border border-sky-400/40 rounded-full text-[8px] font-bold uppercase tracking-widest text-sky-400">
                        System Active
                      </div>
                   </div>
                </motion.div>
              </div>
              
              {/* Laptop Camera Soft-Light Ring Visualization */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 -translate-y-full flex items-center justify-center">
                 <div className="relative group">
                    <div className="absolute inset-[-10px] bg-white/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Sparkles className="text-white/20 group-hover:text-white transition-colors" size={12} />
                 </div>
                 <div className="absolute bottom-0 w-32 h-[2px] bg-sky-400 shadow-[0_0_10px_#38bdf8] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>

              {/* Refinement Shadow */}
              <div className="absolute -bottom-6 left-[5%] right-[5%] h-8 bg-black/60 blur-xl rounded-[100%] scale-y-50" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature: Integrated Ring Light Technical Demo */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
           <div className="relative order-2 lg:order-1">
              {/* Technical Schematic of the Ring Light */}
              <div className="relative aspect-square max-w-[500px] mx-auto border border-white/5 rounded-[4rem] bg-white/[0.02] backdrop-blur-3xl overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {/* Ring Visualization */}
                    <div className="w-64 h-64 border-8 border-sky-500/10 rounded-full flex items-center justify-center relative">
                       <motion.div 
                         animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-[-20px] border-2 border-dashed border-sky-400/20 rounded-full" 
                       />
                       <div className="w-52 h-52 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] rounded-full animate-pulse" />
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white shadow-[0_0_20px_#fff] rounded-full" />
                       
                       {/* Labels */}
                       <div className="absolute -right-20 top-1/2 -translate-y-1/2 flex items-center gap-4">
                          <div className="h-px w-12 bg-slate-700" />
                          <div className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase">Bezel Light Array</div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Internal Texture */}
                 <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/techtexture/1000/1000')] bg-cover mix-blend-overlay grayscale" />
                 
                 <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-white/40">
                    <div className="flex gap-2">
                       <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                       <span className="text-[8px] font-black uppercase tracking-widest">Active Illumination</span>
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest">5000K Temp</span>
                 </div>
              </div>
           </div>
           
           <div className="order-1 lg:order-2">
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-sky-400" />
                    <span className="text-sky-400 text-[10px] font-black uppercase tracking-widest">Photography Grade</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 italic">The Studio<br/><span className="text-sky-400">In Bezel.</span></h2>
                 <p className="text-slate-400 text-xl leading-relaxed font-light mb-10">
                    An array of high-CRI LEDs integrated directly into the display bezel. Soft, professional lighting that follows you from the office to the coffee shop.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-colors">
                       <Sparkles size={24} className="text-sky-400 mb-4" />
                       <div className="text-lg font-bold">Auto-Hype</div>
                       <div className="text-xs text-slate-500 tracking-widest uppercase mt-1">Smart Balancing</div>
                    </div>
                    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-colors">
                       <Zap size={24} className="text-sky-400 mb-4" />
                       <div className="text-lg font-bold">Low Energy</div>
                       <div className="text-xs text-slate-500 tracking-widest uppercase mt-1">Battery Optimized</div>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Graphic Feature: Architecture Schematic */}
      <section id="performance" className="py-40 px-6 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 space-y-12">
                 <div>
                    <h2 className="text-5xl font-bold tracking-tighter mb-4 italic">Pure Power.</h2>
                    <p className="text-slate-500 font-medium">Under the hood. A symphony of thermal engineering and raw silicon potential.</p>
                 </div>
                 <div className="space-y-6">
                    {[
                      { icon: <Wind size={18} />, title: "Hyper-Cooling", val: "30 CFM Flow" },
                      { icon: <Cpu size={18} />, title: "Intel® N100", val: "i7-1355U Ready" },
                      { icon: <Maximize2 size={18} />, title: "Thin Frame", val: "1.2kg Precision" }
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-6 group cursor-default">
                         <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-sky-400 group-hover:text-sky-400 transition-all">
                            {feat.icon}
                         </div>
                         <div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{feat.title}</div>
                            <div className="text-lg font-bold">{feat.val}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="lg:col-span-8">
                 {/* Internal Hardware schematic inspired by 3D views */}
                 <div className="relative aspect-[16/9] w-full rounded-[4rem] bg-[#030712] border border-white/5 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen" />
                    
                    {/* Floating Boards/Components Visualized as stylized blocks */}
                    <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                       <motion.div 
                         initial={{ rotateX: 45, rotateZ: -20, y: 100, opacity: 0 }}
                         whileInView={{ rotateX: 45, rotateZ: -20, y: 0, opacity: 1 }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         className="relative w-[60%] h-[60%] transform-gpu"
                       >
                          {/* Board 1 */}
                          <div className="absolute inset-0 border-2 border-sky-400/20 rounded-2xl bg-sky-400/5 shadow-[0_0_40px_rgba(56,189,248,0.1)] flex items-center justify-center group-hover:translate-z-10 transition-transform">
                             <div className="grid grid-cols-4 grid-rows-4 gap-2 w-[80%] h-[80%] opacity-20">
                                {[...Array(16)].map((_, i) => (
                                   <div key={i} className="bg-sky-400/50 rounded-sm" />
                                ))}
                             </div>
                          </div>
                          {/* Chip Layer */}
                          <motion.div 
                             animate={{ y: [-10, 0, -10] }}
                             transition={{ duration: 4, repeat: Infinity }}
                             className="absolute top-1/4 left-1/4 w-24 h-24 bg-sky-400 border border-white/40 rounded-xl shadow-[0_0_30px_#38bdf8] flex items-center justify-center"
                          >
                             <Cpu className="text-black" size={32} />
                          </motion.div>
                          
                          {/* Heat Sink Fins Visualization */}
                          <div className="absolute -right-10 top-0 bottom-0 w-20 flex flex-col justify-between opacity-30">
                             {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-2 bg-gradient-to-l from-sky-400 to-transparent rounded-full" />
                             ))}
                          </div>
                       </motion.div>
                    </div>
                    
                    <div className="absolute top-10 right-10 text-right">
                       <div className="text-[8px] font-black uppercase tracking-[0.5em] text-sky-400/60 mb-2">Internal Structure</div>
                       <div className="text-2xl font-bold tracking-tighter opacity-20 italic underline decoration-sky-400/50">SEC4-B1-PRO</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Graphical Spec Grid */}
      <section id="specs" className="py-40 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-32">
             <h2 className="text-5xl md:text-9xl font-bold tracking-[ -0.05em] mb-4">DNA.</h2>
             <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px]">Technical Components Mapping</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { id: "01", label: 'Processor', val: 'Intel® i7-1355U', icon: <Cpu />, sub: '12M Cache, up to 5.0 GHz' },
              { id: "02", label: 'Display', val: '14.1" 16:10 FHD+', icon: <Monitor />, sub: 'IPS Panel / 100% sRGB' },
              { id: "03", label: 'Build', val: 'Magnesium Alloy', icon: <Layers />, sub: 'Aerospace Grade Material' },
              { id: "04", label: 'Battery', val: '53.5Wh Smart Cell', icon: <Battery />, sub: 'Up to 14 Hours Life' },
              { id: "05", label: 'Ports', val: 'USB-C / HDMI 2.0', icon: <ChevronRight />, sub: 'Full Speed Connectivity' },
              { id: "06", label: 'I/O', val: 'Soft-Light Ring', icon: <Sparkles />, sub: 'Integrated Bezel Lighting' },
            ].map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] hover:bg-sky-500/[0.03] hover:border-sky-500/20 transition-all flex flex-col gap-6"
              >
                <div className="flex justify-between items-start">
                   <div className="text-sky-500 opacity-40 group-hover:opacity-100 transition-opacity">
                      {spec.icon}
                   </div>
                   <div className="text-slate-700 font-black text-xs font-mono group-hover:text-sky-400 transition-colors uppercase">{spec.id}</div>
                </div>
                <div>
                   <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{spec.label}</div>
                   <div className="text-2xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors whitespace-nowrap">{spec.val}</div>
                </div>
                <div className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">{spec.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases: Everyday Brilliance */}
      <section id="use-cases" className="py-40 px-6 z-10 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 italic">Breeze in Life.</h2>
             <p className="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px]">Engineered for your daily rhythm</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "The Modern Nomad", 
                desc: "At just 1.2kg, it disappears into your bag but stands out on your desk. The perfect companion for the coffee-shop office.",
                icon: <Wind className="text-sky-400" />
              },
              { 
                title: "The Library Titan", 
                desc: "14-hour battery life and whisper-quiet cooling. Grind through finals without hunting for a power outlet or disturbing your peers.",
                icon: <Battery className="text-sky-400" />
              },
              { 
                title: "The Zoom Master", 
                desc: "Professional soft-light ring built in. Look studio-ready in poorly lit home offices or late-night kitchen calls.",
                icon: <Sparkles className="text-sky-400" />
              },
              { 
                title: "The Daily Driver", 
                desc: "From 50+ browser tabs to light 4K editing. Intel Core power handles the chaos of everyday life with zero lag.",
                icon: <Layers className="text-sky-400" />
              }
            ].map((useCase, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] hover:bg-sky-500/[0.04] hover:border-sky-500/20 transition-all flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-8 border border-sky-400/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all">
                  {useCase.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-sky-400 transition-colors">{useCase.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium group-hover:text-slate-400 transition-colors">
                  {useCase.desc}
                </p>
                <div className="mt-auto pt-8 flex items-center gap-2 text-sky-400/40 text-[10px] font-black uppercase tracking-widest group-hover:text-sky-400 transition-colors">
                  Case Study {i + 1} <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Background Graphics Only */}

      {/* Footer Removed */}

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Inter:wght@200;300;400;500;600;700&family=JetBrains+Mono&display=swap');
        
        :root {
          --font-display: 'Outfit', sans-serif;
          --font-sans: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        body {
          background-color: #020617;
          color: white;
          font-family: var(--font-sans);
          cursor: crosshair;
        }

        .font-display { font-family: var(--font-display); }
        .font-mono { font-family: var(--font-mono); }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .translate-z-10 {
           transform: translateZ(40px);
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        * {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #38bdf844;
          color: white;
        }
      `}} />
    </div>
  );
}

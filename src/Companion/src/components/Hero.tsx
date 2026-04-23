import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Cpu, Zap, Battery } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" id="hero">
      {/* Immersive Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/40 to-brand-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=2400" 
          alt="Leader Companion Pro" 
          className="w-full h-full object-cover grayscale opacity-60"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Kinetic Typography Layer */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "circOut" }}
           className="mb-8"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] bg-white/5 backdrop-blur-md">
            New Release 2026
          </span>
        </motion.div>

        <motion.h1 
          className="text-huge tracking-tighter mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          COMPA<span className="text-white/20">NION</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-2xl font-light tracking-[0.2em] mb-16 uppercase"
        >
          High Performance • Ultra Portable • Professional
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap justify-center gap-12"
        >
          <div className="flex items-center gap-3">
             <Cpu className="w-5 h-5 text-brand-blue" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Intel Celeron</span>
          </div>
          <div className="flex items-center gap-3">
             <Zap className="w-5 h-5 text-brand-blue" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">UHD Graphics</span>
          </div>
          <div className="flex items-center gap-3">
             <Battery className="w-5 h-5 text-brand-blue" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Long Battery</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Explore</span>
        <ArrowDown className="w-4 h-4 text-white/20" />
      </motion.div>
    </section>
  );
}

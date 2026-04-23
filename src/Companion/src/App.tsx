/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from "./components/Hero";
import Features from "./components/Features";
import Specs from "./components/Specs";
import Gallery from "./components/Gallery";
import HardwareShowcase from "./components/HardwareShowcase";
import { Laptop, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-brand-dark selection:bg-brand-blue selection:text-white">
      {/* Visual background layers */}
      <div className="noise-overlay" />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Hero />
      
      <div className="relative z-10 space-y-[20vh] md:space-y-[40vh] pb-[40vh]">
        <Features />
        
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white text-black py-40">
           <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1.5 }}
             className="absolute inset-0 z-0"
           >
              <img 
                src="https://images.unsplash.com/photo-1611186871348-71ce4ea473a9?auto=format&fit=crop&q=80&w=2400" 
                className="w-full h-full object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
           </motion.div>

           <div className="container mx-auto px-6 relative z-10 text-center">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="uppercase tracking-[0.4em] text-xs font-black mb-8 block"
              >
                Precision Crafted
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-huge mb-16"
              >
                PURSUI<span className="text-gray-200">T</span> <br /> 
                OF PE<span className="text-blue-600">R</span>FECTION
              </motion.h2>
              <div className="flex justify-center gap-12 text-left uppercase text-[10px] font-bold tracking-widest opacity-60">
                 <div>/ 19.9MM THIN</div>
                 <div>/ METALLIC COATING</div>
                 <div>/ BACKLIT KEYS</div>
              </div>
           </div>
        </section>

        <HardwareShowcase />
        
        <Gallery />

        <Specs />

        <section className="section-container text-center py-[20vh]">
          <motion.div
             initial={{ opacity: 0, y: 100 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="max-w-4xl mx-auto"
          >
            <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter leading-none">
              OWN THE <br /> FUTURE.
            </h2>
            <p className="text-white/40 text-lg md:text-2xl mb-16 font-light leading-relaxed">
              Step into the new era of computing. The Leader Companion SCE5-H1 is ready for your next move.
            </p>
            <button className="px-16 py-6 bg-white text-black rounded-full font-bold text-xl hover:bg-brand-blue hover:text-white transition-all transform hover:scale-105 active:scale-95 group">
              Get Started <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </section>
      </div>

    </main>
  );
}

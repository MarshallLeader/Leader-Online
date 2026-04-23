import { motion, useScroll, useTransform } from "motion/react";
import { Cpu, Wind, Layers, Terminal, Activity } from "lucide-react";
import { useRef } from "react";

export default function HardwareShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="section-container overflow-hidden bg-brand-dark">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
             <motion.div 
               style={{ rotate, scale }}
               className="relative aspect-square md:aspect-auto h-[600px] w-full"
             >
                <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-151877066bb63-c24a57195455?auto=format&fit=crop&q=80&w=1600"
                  className="w-full h-full object-cover rounded-[3rem] grayscale opacity-40 border border-white/5 shadow-2xl relative z-10"
                  alt="Internal Hardware"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Tech Labels */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="absolute -top-10 -right-10 glass-card p-8 rounded-3xl z-20 hidden md:block"
                >
                   <Activity className="w-8 h-8 text-brand-blue mb-4" />
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Thermal Flow</div>
                   <div className="text-xl font-bold font-display uppercase tracking-tight">DUAL AIR-PASS</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl z-20 hidden md:block"
                >
                   <Cpu className="w-8 h-8 text-brand-blue mb-4" />
                   <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Processing</div>
                   <div className="text-xl font-bold font-display uppercase tracking-tight">OPTIMIZED PCB</div>
                </motion.div>
             </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-blue font-bold tracking-[0.4em] text-xs mb-6 block uppercase">Core Architecture</span>
              <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase">
                BUILT <br /> 
                <span className="text-white italic">FROM WITHIN</span>
              </h2>
              <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md">
                We believe performance starts at the motherboard. Every trace, ogni fan blade, and every resistor is placed with surgical precision for absolute endurance.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: "HEAT DISSIPATION", value: "34% MORE EFFECTIVE" },
                  { label: "DYNAMIC POWER", value: "INTEL CORE OPTIMIZED" },
                  { label: "MINIMALIST FOOTPRINT", value: "INTERNAL SPACE SAVING" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-default">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-brand-blue transition-colors">{item.label}</span>
                    <span className="text-sm font-bold skew-x-[-10deg]">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

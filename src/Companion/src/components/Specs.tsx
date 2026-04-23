import { motion } from "motion/react";

const specs = [
  { label: "Display", value: "15.6\" Full HD LED Backlit" },
  { label: "Processor", value: "Intel® Celeron® Series" },
  { label: "Graphics", value: "Intel® UHD Graphics" },
  { label: "OS", value: "Windows 11 Professional" },
  { label: "Chassis", value: "Metallic Finish Charcoal" },
  { label: "Weight", value: "Ultra-Light 1.6kg" },
  { label: "Profile", value: "19.9mm Tapered" },
  { label: "Battery", value: "High-Density Lithium Ion" },
];

export default function Specs() {
  return (
    <section className="section-container bg-white text-black" id="specs">
      <div className="container mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
           >
              <span className="text-blue-600 font-bold tracking-[0.4em] text-xs uppercase mb-6 block">Technical Specifications</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                THE <br /> MANIFESTO
              </h2>
           </motion.div>
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="max-w-md text-gray-500 text-lg md:text-xl font-light"
           >
             A complete breakdown of the hardware identity that defines the Companion SCE5-H1. Built for stability, refined for the modern world.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 mb-32">
           {specs.map((spec, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="flex justify-between items-baseline border-b border-gray-100 pb-8 group"
             >
                <div className="space-y-1">
                   <div className="text-[10px] font-bold tracking-widest text-gray-300 group-hover:text-blue-600 transition-colors uppercase">{spec.label}</div>
                   <div className="text-2xl md:text-4xl font-black tracking-tighter uppercase">{spec.value}</div>
                </div>
                <div className="text-gray-100 group-hover:text-blue-500 transition-colors font-mono text-[10px]">/{i.toString().padStart(2, '0')}</div>
             </motion.div>
           ))}
        </div>

        <div className="relative h-[400px] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
           <img 
             src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2400" 
             className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
             alt="Leader Design Philosophy"
             referrerPolicy="no-referrer"
           />
           <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-huge mix-blend-overlay">LEADER</span>
           </div>
        </div>
      </div>
    </section>
  );
}

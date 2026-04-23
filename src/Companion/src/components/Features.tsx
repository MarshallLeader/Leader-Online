import { motion, useScroll, useTransform } from "motion/react";
import { Monitor, Battery, Cpu, ShieldCheck, Maximize, MousePointer2, Layout, Zap, Tablet } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    title: "15.6 INCH PRECISION",
    subtitle: "VIVID VISUALS",
    description: "Full HD Anti-Glare Panel with stunning clarity and deep contrast, designed for professionals who demand visual excellence.",
    icon: Monitor,
    img: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "INTEL CORE POWER",
    subtitle: "SEAMLESS PERFORMANCE",
    description: "Equipped with Intel® Celeron® processors for efficient multitasking, heavy spreadsheets, and professional workflows.",
    icon: Cpu,
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "ENDLESS ENDURANCE",
    subtitle: "ALL-DAY MOBILITY",
    description: "Optimized battery life and 19.9mm ultra-thin profile make it the perfect companion for life on the move.",
    icon: Battery,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200",
    color: "from-emerald-400 to-teal-400"
  }
];

export default function Features() {
  return (
    <section className="relative" id="features">
      <div className="container mx-auto px-6 mb-32">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="text-center"
        >
          <span className="text-vertical absolute left-6 top-0 hidden md:block opacity-20">System Performance</span>
          <h2 className="text-huge text-gradient">FEATURES</h2>
        </motion.div>
      </div>

      <div className="space-y-[40vh]">
        {features.map((feature, idx) => (
          <FeatureRow key={idx} feature={feature} index={idx} />
        ))}
      </div>
    </section>
  );
}

interface FeatureRowProps {
  key?: number | string;
  feature: {
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    img: string;
    color: string;
  };
  index: number;
}

function FeatureRow({ feature, index }: FeatureRowProps) {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const xImage = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? ["10%", "-10%"] : ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={rowRef} className="container mx-auto px-6 relative">
      <motion.div 
        style={{ opacity }}
        className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
      >
        <div className="w-full md:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center mb-8 shadow-2xl`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-none uppercase">
              {feature.title}
            </h3>
            <p className="text-blue-500 font-bold tracking-[0.3em] text-xs mb-8 uppercase">{feature.subtitle}</p>
            <p className="text-white text-lg md:text-xl max-w-md leading-relaxed font-light">
              {feature.description}
            </p>
          </motion.div>
        </div>

        <div className="w-full md:w-1/2">
           <motion.div 
             style={{ x: xImage }}
             className="relative aspect-video rounded-[2rem] overflow-hidden group shadow-2xl"
           >
              <img 
                src={feature.img} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" 
                alt={feature.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-6 left-6 p-4 glass-card rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-1">MODULE_ID</span>
                 <span className="text-xs font-bold text-white uppercase">{feature.title}</span>
              </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

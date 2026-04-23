import { motion, useScroll, useTransform } from 'motion/react';
import { Cpu, Monitor, Battery, Wifi, Shield, HardDrive } from 'lucide-react';
import { useRef } from 'react';
import heroImage from '../assets/dbb72394-b7f0-492d-870e-58c527c00c6d.png';
import productImage from '../bbdf13c4-28e4-4691-8a9b-a709e76563e2.png';

// --- Components ---

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-brand-black overflow-hidden bg-mesh">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[20rem] md:text-[30rem] font-[900] leading-none text-outline select-none opacity-30">SCE5</h1>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 z-10"
        >
          <span className="text-brand-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The New Standard</span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-gradient">Companion SCE5-H1</h1>
          <p className="text-white max-w-xl mx-auto text-lg md:text-xl font-light">
            Elegance meets performance. A 15.6" notebook designed for those who demand more from their daily companion.
          </p>
        </motion.div>

        <motion.div
          style={{ scale, rotateX }}
          className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden laptop-shadow border border-slate-700/50"
        >
          <img
            src={heroImage}
            alt="Companion SCE5-H1 on desk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
          <div className="w-px h-12 bg-white" />
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, className = "" }: { icon: any, title: string, desc: string, className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-8 rounded-3xl glass flex flex-col justify-between ${className}`}
  >
    <div className="bg-brand-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
      <Icon className="text-brand-accent w-6 h-6" />
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-white text-xs uppercase tracking-widest font-medium leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const FeaturesBento = () => (
  <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
    <div className="mb-20">
      <h2 className="text-4xl md:text-6xl font-bold mb-6">Built for Excellence.</h2>
      <p className="text-white text-xl font-light">Every detail meticulously crafted for your workflow.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[600px]">
      <FeatureCard 
        icon={Monitor}
        title="15.6″ Full HD Display"
        desc="Crystal clear visuals with 1920x1080 resolution. Perfect for creative work and immersive entertainment."
        className="md:col-span-4"
      />
      <FeatureCard 
        icon={Cpu}
        title="Intel Core Power"
        desc="Swift and responsive compute power for multitasking."
        className="md:col-span-2"
      />
      <FeatureCard 
        icon={Battery}
        title="All Day Battery"
        desc="Go further without the charger. Efficient power management for the road."
        className="md:col-span-2"
      />
      <FeatureCard 
        icon={Shield}
        title="Leader Reliability"
        desc="Backed by Leader Computers' premium support and hardware quality assurance."
        className="md:col-span-4"
      />
    </div>
  </section>
);

const SpecsRibbon = () => (
  <div className="w-full bg-brand-gray py-12 border-y border-white/5 overflow-hidden whitespace-nowrap">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex gap-20 items-center justify-center text-3xl font-display font-medium opacity-20"
    >
      <span>FULL HD DISPLAY</span>
      <span>●</span>
      <span>INTEL CORE PROCESSOR</span>
      <span>●</span>
      <span>COMPANION SERIES</span>
      <span>●</span>
      <span>15.6 INCH POWERHOUSE</span>
      <span>●</span>
      <span>LEADER QUALITY</span>
      <span>●</span>
      <span>SCE5-H1 MODEL</span>
    </motion.div>
  </div>
);

const DetailedSpecs = () => {
  const specs = [
    { label: "Model", value: "SCE5-H1" },
    { label: "Screen Size", value: "15.6 Inch" },
    { label: "Resolution", value: "1920 x 1080 (FHD)" },
    { label: "Form Factor", value: "Slim & Portable" },
    { label: "Manufacturer", value: "Leader Computers" },
    { label: "Series", value: "Companion" },
  ];

  return (
    <section id="specs" className="py-32 px-6">
      <div className="max-w-4xl mx-auto bg-brand-gray rounded-[40px] p-12 border border-white/5">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-white">
          <HardDrive className="text-brand-accent" />
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
          {specs.map((spec, i) => (
            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white text-sm uppercase tracking-wider font-medium">{spec.label}</span>
              <span className="text-white font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PerformanceGrid = () => (
  <section id="performance" className="py-32 px-6 max-w-7xl mx-auto relative overflow-hidden bg-mesh rounded-[60px] my-10">
    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 blur-[120px] -z-10" />
    
    <div className="flex flex-col md:flex-row items-center gap-20">
      <div className="flex-1">
        <h2 className="text-4xl md:text-6xl font-black mb-10 text-gradient">Power that keeps pace with you.</h2>
        <div className="space-y-12">
          {[
            { label: "Multitasking Efficiency", val: 92, icon: Cpu },
            { label: "Visual Clarity", val: 88, icon: Monitor },
            { label: "Connectivity Speed", val: 95, icon: Wifi },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <item.icon className="text-brand-accent w-5 h-5" />
                  <span className="text-white font-bold text-xs uppercase tracking-widest opacity-70">{item.label}</span>
                </div>
                <span className="text-brand-accent font-black tracking-widest">{item.val}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.val}%` }}
                  transition={{ duration: 1.5, ease: "circOut", delay: i * 0.2 }}
                  className="h-full bg-brand-accent shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 relative aspect-square glass rounded-[60px] overflow-hidden flex items-center justify-center bg-brand-black">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        >
          <img
            src={productImage}
            alt="Companion SCE5-H1"
            className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(14,165,233,0.15)]"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="relative bg-mesh min-h-screen">
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="absolute left-12 bottom-12 z-50 hidden md:flex flex-col gap-1">
        <div className="h-[1px] w-24 bg-brand-accent"></div>
        <div className="text-[10px] font-bold tracking-widest uppercase opacity-50">Companion Series 2024</div>
      </div>

      <Hero />
      <SpecsRibbon />
      <FeaturesBento />
      
      <PerformanceGrid />

      <DetailedSpecs />
      
      <section className="py-20 text-center">
        <div className="w-24 h-[1px] bg-brand-accent mx-auto mb-10" />
        <h2 className="text-6xl md:text-[180px] font-black leading-none text-outline select-none uppercase tracking-tighter opacity-10">
          SCE5
        </h2>
      </section>

    </div>
  );
}

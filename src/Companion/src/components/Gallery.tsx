import { motion } from "motion/react";
import { Maximize2, ExternalLink } from "lucide-react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200",
    title: "EXECUTIVE SUITE",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200",
    title: "FIELD DYNAMICS",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1587614382346-4ec7063f9b28?auto=format&fit=crop&q=80&w=1200",
    title: "CREATIVE CORE",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200",
    title: "NIGHT FLOW",
    span: "md:col-span-1 md:row-span-1"
  }
];

export default function Gallery() {
  return (
    <section className="section-container" id="gallery">
      <div className="container mx-auto">
        <div className="mb-24">
           <motion.h2 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-vertical absolute right-6 top-0 hidden xl:block opacity-20"
           >
             GALLERY_COLLECTION_2026
           </motion.h2>
           <h2 className="text-gradient mb-8 leading-none font-black uppercase" style={{ fontSize: 'clamp(3rem, 18vw, 14rem)' }}>STORYBOARD</h2>
           <p className="text-white/40 text-lg md:text-2xl font-light max-w-2xl">
             Capturing the essence of the Companion series across diverse professional landscapes.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-auto md:h-[800px]">
           {images.map((img, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className={`relative group overflow-hidden rounded-[2.5rem] shadow-2xl ${img.span}`}
             >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:scale-110 group-hover:grayscale-0"
                  alt={img.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                   <div className="flex justify-between items-end">
                      <div className="space-y-2">
                         <span className="text-brand-blue font-bold tracking-[0.3em] text-[10px] uppercase">Environment</span>
                         <h3 className="text-3xl font-black tracking-tighter uppercase">{img.title}</h3>
                      </div>
                      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white border border-white/20">
                         <Maximize2 className="w-5 h-5" />
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

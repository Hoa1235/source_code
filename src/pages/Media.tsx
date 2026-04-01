import React from 'react';
import { Image as ImageIcon, PlayCircle } from 'lucide-react';

export const Media = (props: any) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
       <section className="reveal text-center">
          <h1 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Thư viện <span className="text-blue-600">Flowdex</span></h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Tư liệu hình ảnh và video về quy trình vận hành thực tế tại các Hub của chúng tôi.</p>
       </section>

       <section className="reveal grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
             <div key={i} className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 group cursor-pointer relative">
                <img 
                  src={`https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&id=${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  alt="Logistics"
                />
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <ImageIcon className="text-white w-8 h-8" />
                </div>
             </div>
          ))}
       </section>

       <section className="reveal max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-tighter">Video Demo & Quy trình</h2>
          <div className="aspect-video bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative group">
             <iframe 
                width="100%" height="100%" 
                src="https://www.youtube.com/embed/H07z7OaG87s" 
                title="Flowdex Logistics Process" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="opacity-80 group-hover:opacity-100 transition-opacity"
             ></iframe>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden">
                <PlayCircle className="w-20 h-20 text-white/50" />
             </div>
          </div>
       </section>
    </div>
  );
};

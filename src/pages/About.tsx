import React from 'react';
import { Globe, Package } from 'lucide-react';

export const About = (props: any) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 space-y-32">
       <section className="reveal text-center">
          <h1 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-none">Về chúng tôi & <br/> <span className="text-blue-600">Sứ mệnh Flowdex</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi là startup tiên phong trong việc mang AI và dữ liệu số vào ngành logistics truyền thống, giúp các forwarder chuyển mình trong kỷ nguyên số.
          </p>
       </section>

       <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center reveal">
          <div className="bg-slate-100 rounded-[4rem] h-[500px] flex items-center justify-center p-12 relative overflow-hidden">
             <Globe className="w-64 h-64 text-blue-600/10 absolute -bottom-10 -right-10 animate-spin-slow" />
             <div className="text-center relative z-10">
                <h3 className="text-8xl font-black text-blue-600 mb-4 tracking-tighter">99.9%</h3>
                <p className="font-black uppercase tracking-[0.3em] text-slate-900">Uptime Cam kết (SLA)</p>
             </div>
          </div>
          <div className="space-y-8">
             <h2 className="text-4xl font-black uppercase text-slate-900 tracking-tighter">Vấn đề & Giải pháp</h2>
             <div className="space-y-6">
                {[
                  { q: 'Vấn đề:', a: 'Sự đứt gãy thông tin giữa các bên và quản lý chứng từ thủ công gây lãng phí.' },
                  { q: 'Giải pháp Flowdex:', a: 'Hệ thống dữ liệu tập trung, tự động hóa quy trình từ Booking đến Giao hàng.' },
                  { q: 'Tầm nhìn:', a: 'Trở thành "não bộ" của mọi doanh nghiệp logistics tại Việt Nam.' }
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                     <div className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-2">{item.q}</div>
                     <p className="text-slate-600 font-medium">{item.a}</p>
                  </div>
                ))}
             </div>
          </div>
       </section>

       <section className="reveal">
          <h2 className="text-4xl font-black uppercase text-center mb-20 tracking-tighter">Dịch vụ trọng tâm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {['Last-mile Delivery', 'Fulfillment Center', 'COD & Finance', 'Return Handling'].map((s, i) => (
               <div key={i} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm text-center hover:bg-slate-900 group transition-all duration-500">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-all">
                    <Package className="w-6 h-6 text-blue-600 group-hover:text-white transition-all" />
                  </div>
                  <h4 className="font-black text-slate-900 mb-2 group-hover:text-white transition-all">{s}</h4>
                  <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-all">Chuẩn hóa dữ liệu vận hành cho từng quy trình cụ thể.</p>
               </div>
             ))}
          </div>
       </section>
    </div>
  );
};

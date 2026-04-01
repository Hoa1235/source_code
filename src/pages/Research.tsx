import React from 'react';
import { TrendingUp, Clock, DollarSign, Check } from 'lucide-react';
import { COMPETITORS_DATA } from '../constants';

export const Research = (props: any) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 space-y-32">
       <section className="reveal text-center">
          <h1 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-none">Nghiên cứu thị trường <br/> & <span className="text-blue-600">Dữ liệu thực tế</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed italic">
            "Logistics không chỉ là vận chuyển hàng hóa, đó là vận chuyển dữ liệu."
          </p>
       </section>

       <section className="reveal">
          <h2 className="text-3xl font-black uppercase mb-12 tracking-tighter">Đối thủ & Khác biệt</h2>
          <div className="overflow-x-auto rounded-[3rem] shadow-xl border border-slate-100">
             <table className="w-full text-left bg-white">
                <thead className="bg-slate-900 text-white">
                   <tr>
                      <th className="p-8 font-black uppercase text-xs tracking-widest">Tính năng</th>
                      <th className="p-8 font-black uppercase text-xs tracking-widest">Flowdex Intelligence</th>
                      <th className="p-8 font-black uppercase text-xs tracking-widest">Logistics Truyền thống</th>
                   </tr>
                </thead>
                <tbody>
                   {COMPETITORS_DATA.map((row, i) => (
                     <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="p-8 font-bold text-slate-900">{row.feature}</td>
                        <td className="p-8 text-blue-600 font-black">{row.flowdex}</td>
                        <td className="p-8 text-slate-400 font-medium italic">{row.traditional}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </section>

       <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 reveal">
          <div className="space-y-8">
             <h2 className="text-3xl font-black uppercase tracking-tighter">KPI Phân tích</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { i: TrendingUp, t: '20%', d: 'Tăng hiệu suất lao động' },
                  { i: Clock, t: '15ph', d: 'Thời gian xử lý chứng từ' },
                  { i: DollarSign, t: '15%', d: 'Tiết kiệm chi phí kho bãi' },
                  { i: Check, t: '99.8%', d: 'Độ chính xác dữ liệu' }
                ].map((k, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                     <k.i className="w-8 h-8 text-blue-600 mb-4" />
                     <div className="text-3xl font-black text-slate-900 mb-1">{k.t}</div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{k.d}</div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex flex-col justify-center">
             <h3 className="text-2xl font-black mb-6 uppercase text-blue-400">Thị trường Forwarder</h3>
             <p className="text-slate-400 leading-relaxed mb-10">Hiện nay hơn 70% forwarder Việt Nam vẫn sử dụng các phương thức thủ công để quản lý lô hàng. Đây là cơ hội khổng lồ để Flowdex thay đổi cục diện thị trường.</p>
             <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[70%]" />
             </div>
             <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Số hóa (30%)</span>
                <span>Tiềm năng (70%)</span>
             </div>
          </div>
       </section>
    </div>
  );
};

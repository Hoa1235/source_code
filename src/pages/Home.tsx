import React from 'react';
import { Search, BarChart3, ArrowRight, LayoutDashboard, ShieldCheck, Users, ChevronRight, Star, Quote } from 'lucide-react';
import { View } from '../types';
import { KPIS, FEEDBACK_DATA } from '../constants';

export const Home = ({setCurrentView, handleTrack, trackingId, setTrackingId}: any) => {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative pt-24 pb-48 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <h1 className="text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
              Flowdex — <span className="text-blue-600">Intelligence</span> for Logistics
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg">
              Nền tảng trí tuệ giúp doanh nghiệp logistics và forwarder vận hành bằng dữ liệu, tối ưu hóa chuỗi cung ứng toàn cầu.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all flex items-center group text-lg">
                Dùng thử miễn phí <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black border-2 border-slate-100 hover:border-blue-600 transition-all text-lg shadow-sm">
                Đăng ký demo
              </button>
            </div>
            <div className="mt-12 flex gap-10">
               <button onClick={() => setCurrentView(View.TRACKING)} className="flex items-center space-x-2 text-sm font-black text-slate-900 hover:text-blue-600 transition group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span>Track lô hàng</span>
               </button>
               <button onClick={() => setCurrentView(View.CONTACT)} className="flex items-center space-x-2 text-sm font-black text-slate-900 hover:text-blue-600 transition group">
                <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span>Nhận báo giá</span>
               </button>
            </div>
          </div>
          <div className="relative reveal delay-200">
            <div className="dashboard-preview rounded-[3rem] p-8 shadow-[0_60px_100px_-30px_rgba(30,64,175,0.4)] relative z-10 rotate-1 border-4 border-slate-100">
              <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center">
                   Flowdex Analytics v4.0
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-3">Shipments</div>
                  <div className="text-4xl font-black text-white">2.4k <span className="text-blue-500 text-sm">+8%</span></div>
                </div>
                <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50">
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-3">Efficiency</div>
                  <div className="text-4xl font-black text-green-400">92%</div>
                </div>
              </div>
              <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 h-56 flex items-end space-x-3">
                {[30, 60, 40, 80, 50, 95, 70, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl transition-all duration-1000" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-30 -z-10" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 reveal">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Vì sao chọn Flowdex</h2>
          <div className="w-20 h-2 bg-blue-600 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: LayoutDashboard, title: 'Dữ liệu tập trung', desc: 'Theo dõi trạng thái lô hàng, tiến độ vận chuyển trên một hệ thống duy nhất.' },
            { icon: ShieldCheck, title: 'Minh bạch & Kiểm soát', desc: 'Ghi nhận rõ ràng mọi booking, chứng từ, giảm thiểu sai sót vận hành.' },
            { icon: BarChart3, title: 'Tối ưu chi phí', desc: 'Phân tích tuyến đường và thời gian giúp lựa chọn phương án hiệu quả nhất.' },
            { icon: Users, title: 'B2B Optimized', desc: 'Thiết kế riêng cho Forwarder và doanh nghiệp xuất nhập khẩu quy mô lớn.' }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-all">
                <item.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 reveal">
        <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
           <div className="text-center mb-24 relative z-10">
              <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Quy trình 5 bước số hóa</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Vận hành chuẩn Flowdex Intelligence</p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
              {[
                { s: '01', t: 'Booking & Tạo đơn', d: 'Khởi tạo đơn hàng số.' },
                { s: '02', t: 'Xử lý chứng từ', d: 'Quản lý hồ sơ tự động.' },
                { s: '03', t: 'Vận chuyển', d: 'Theo dõi Real-time.' },
                { s: '04', t: 'Cập nhật AI', d: 'Cảnh báo thông minh.' },
                { s: '05', t: 'Hoàn tất & Báo cáo', d: 'Phân tích hiệu suất.' }
              ].map((step, i) => (
                <div key={i} className="text-center group">
                   <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-500 font-black text-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      {step.s}
                   </div>
                   <h4 className="font-bold text-white mb-4 text-lg">{step.t}</h4>
                   <p className="text-sm text-slate-400 leading-relaxed">{step.d}</p>
                </div>
              ))}
           </div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[100px] pointer-events-none" />
        </div>
      </section>

      {/* KPI Section */}
      <section className="max-w-7xl mx-auto px-4 reveal text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {KPIS.map((kpi, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
               <div className="text-6xl font-black mb-4 kpi-number leading-none">{kpi.value}</div>
               <div className="text-slate-900 font-black text-sm mb-2 uppercase tracking-widest">{kpi.label}</div>
               <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{kpi.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-slate-300 font-bold uppercase text-[10px] tracking-widest italic">Dữ liệu minh hoạ cho bản demo hệ thống</p>
      </section>

      {/* Mini Tracking */}
      <section className="max-w-4xl mx-auto px-4 reveal">
         <div className="bg-blue-600 rounded-[3rem] p-16 text-center shadow-2xl shadow-blue-100 relative overflow-hidden">
            <h2 className="text-4xl font-black text-white mb-10">Theo dõi lô hàng ngay</h2>
            <div className="max-w-xl mx-auto relative group">
              <input 
                type="text" 
                placeholder="Nhập mã vận đơn (ZEN123456)" 
                className="w-full pl-8 pr-48 py-6 rounded-2xl text-xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-xl"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button 
                onClick={() => handleTrack()}
                className="absolute right-2.5 top-2.5 bottom-2.5 bg-slate-900 text-white px-8 rounded-xl font-black hover:bg-slate-800 transition-all flex items-center shadow-lg"
              >
                Tra cứu
              </button>
            </div>
            <button onClick={() => setCurrentView(View.TRACKING)} className="mt-8 text-white/70 hover:text-white text-sm font-bold underline flex items-center justify-center mx-auto">
               Xem trang tracking chi tiết <ChevronRight className="ml-1 w-4 h-4" />
            </button>
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12" />
         </div>
      </section>

      {/* Detailed Realistic Testimonials */}
      <section className="max-w-7xl mx-auto px-4 reveal">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Khách hàng nói gì về Flowdex</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Hơn 500+ doanh nghiệp tin dùng trên toàn quốc</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {FEEDBACK_DATA.map((feedback, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-500 flex flex-col group relative">
              {/* Quote Icon Overlay */}
              <div className="absolute top-8 right-10 text-slate-50 opacity-0 group-hover:opacity-100 group-hover:text-blue-50 transition-all duration-500 -z-10">
                <Quote className="w-24 h-24" />
              </div>

              {/* Header: Stars & Metric */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex space-x-1">
                  {[...Array(feedback.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {feedback.metric}
                </div>
              </div>

              {/* Content */}
              <p className="italic text-slate-700 text-lg leading-relaxed font-medium mb-10 relative">
                “{feedback.quote}”
              </p>

              {/* Footer: Avatar & Info */}
              <div className="mt-auto pt-8 border-t border-slate-50 flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md ring-4 ring-slate-50">
                  <img src={feedback.avatar} alt={feedback.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">{feedback.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{feedback.role}</div>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">{feedback.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

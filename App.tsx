
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Package, MapPin, Truck, CheckCircle, Info, Copy, 
  Download, AlertCircle, ChevronRight, MessageSquare, 
  BarChart3, ShieldCheck, Globe, Zap, Users, PlayCircle,
  FileText, Mail, Phone, LayoutDashboard, ExternalLink,
  ArrowRight, Image as ImageIcon, Send, Bot, X, Check,
  Clock, TrendingUp, DollarSign, Star, Quote
} from 'lucide-react';
import { DEMO_SHIPMENTS, STATUS_STEPS, KPIS, COMPETITORS_DATA, FEEDBACK_DATA } from './constants';
import { ShipmentData, ShipmentStatus, View } from './types';
import AIAssistant from './components/AIAssistant';

// Simple ScrollReveal Animation Hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  
  useScrollReveal();

  const handleTrack = (id: string = trackingId) => {
    if (!id.trim()) return;
    setIsLoading(true);
    setError(null);
    setShipment(null);
    
    // Fake loading for realism
    setTimeout(() => {
      const result = DEMO_SHIPMENTS[id.toUpperCase()];
      if (result) {
        setShipment(result);
        setCurrentView(View.TRACKING);
      } else {
        setError("Không tìm thấy mã vận đơn. Vui lòng thử mã mẫu: ZEN123456");
        setCurrentView(View.TRACKING);
      }
      setIsLoading(false);
    }, 1000);
  };

  const navItems = [
    { label: 'Trang chủ', view: View.HOME },
    { label: 'Về chúng tôi', view: View.ABOUT },
    { label: 'Nghiên cứu', view: View.RESEARCH },
    { label: 'Thư viện', view: View.MEDIA },
    { label: 'Liên hệ', view: View.CONTACT }
  ];

  const maskInfo = (text: string) => {
    if (!text) return '';
    const parts = text.split('(');
    if (parts.length < 2) return text;
    const name = parts[0].trim();
    return `${name.substring(0, 3)}*** (${parts[1].replace(')', '')})`;
  };

  // --- HOME PAGE ---
  const renderHome = () => (
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

  const renderAbout = () => (
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

  const renderResearch = () => (
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

  const renderMedia = () => (
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

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
       <section className="reveal">
          <h1 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-none">Liên hệ <br/> <span className="text-blue-600">Tư vấn báo giá</span></h1>
          <p className="text-xl text-slate-500 mb-16 leading-relaxed">Chúng tôi cam kết phản hồi và gửi báo giá sơ bộ trong vòng 30 phút cho các yêu cầu ưu tiên.</p>
          
          <div className="space-y-12">
             <div className="flex items-center space-x-8 group">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <Mail className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Email</div>
                   <div className="text-xl font-black text-slate-900">contact@flowdex.com</div>
                </div>
             </div>
             <div className="flex items-center space-x-8 group">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Hotline</div>
                   <div className="text-xl font-black text-slate-900">+84 123 456 789</div>
                </div>
             </div>
             <div className="flex items-center space-x-8 group">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">Trụ sở</div>
                   <div className="text-xl font-black text-slate-900">Vietnam Logistics Park, Hanoi</div>
                </div>
             </div>
          </div>
       </section>

       <section className="reveal delay-200">
          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100">
             {contactSuccess ? (
               <div className="text-center py-20 animate-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                     <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Gửi thành công!</h3>
                  <p className="text-slate-500 mb-10">Đội ngũ Flowdex sẽ liên hệ lại trong ít phút.</p>
                  <button onClick={() => setContactSuccess(false)} className="text-blue-600 font-bold underline uppercase tracking-widest text-xs">Gửi yêu cầu khác</button>
               </div>
             ) : (
               <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Họ tên</label>
                        <input type="text" required placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">SĐT / Email</label>
                        <input type="text" required placeholder="090123*** / a@gmail.com" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold" />
                     </div>
                  </div>
                  <div>
                     <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Dịch vụ quan tâm</label>
                     <select className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold appearance-none">
                        <option>Last-mile Delivery</option>
                        <option>Fulfillment Services</option>
                        <option>Quản trị Forwarder</option>
                        <option>Tư vấn số hóa</option>
                     </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Tuyến vận chuyển</label>
                        <input type="text" placeholder="VD: US -> VN" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block tracking-widest">Khối lượng ước tính</label>
                        <input type="text" placeholder="VD: 500kg / tháng" className="w-full bg-slate-50 border-2 border-slate-50 px-6 py-4 rounded-2xl focus:border-blue-600 outline-none transition-all font-bold" />
                     </div>
                  </div>
                  <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                     <input type="checkbox" id="fast_quote" className="w-6 h-6 rounded-lg border-2 border-blue-300 text-blue-600 focus:ring-blue-600" />
                     <label htmlFor="fast_quote" className="text-sm font-black text-blue-900 cursor-pointer">Tôi cần báo giá GẤP trong 30 phút</label>
                  </div>
                  <button className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl shadow-2xl shadow-blue-100 hover:bg-blue-700 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center text-lg uppercase tracking-tighter">
                     Gửi yêu cầu ngay <Send className="ml-3 w-5 h-5" />
                  </button>
               </form>
             )}
          </div>
       </section>
    </div>
  );

  const renderTracking = () => (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-in fade-in duration-700">
       <div className="mb-20 text-center">
          <h2 className="text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Flowdex | <span className="text-blue-600">Trace & Track</span></h2>
          <div className="max-w-2xl mx-auto relative shadow-2xl rounded-[2.5rem] bg-white border-4 border-slate-50 p-2">
             <input 
               type="text" 
               placeholder="Mã vận đơn (ZEN123456...)" 
               className="w-full pl-8 pr-48 py-6 rounded-3xl text-xl font-bold focus:outline-none focus:ring-4 focus:ring-blue-100"
               value={trackingId}
               onChange={(e) => setTrackingId(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
             />
             <button 
               onClick={() => handleTrack()}
               disabled={isLoading}
               className="absolute right-3 top-3 bottom-3 bg-slate-900 text-white px-10 rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center"
             >
               {isLoading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : 'Tra cứu'}
             </button>
          </div>
       </div>

       {isLoading && (
         <div className="flex flex-col items-center py-20 space-y-6">
            <div className="w-20 h-20 border-8 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400 animate-pulse">Đang truy xuất dữ liệu vệ tinh...</p>
         </div>
       )}

       {error && !isLoading && (
         <div className="bg-white p-24 rounded-[4rem] shadow-2xl border border-red-50 text-center">
            <AlertCircle className="w-24 h-24 text-red-500 mx-auto mb-10" />
            <h3 className="text-4xl font-black mb-4">Mã không tồn tại</h3>
            <p className="text-slate-500 mb-12 text-lg">{error}</p>
            <button onClick={() => { setTrackingId('ZEN123456'); handleTrack('ZEN123456'); }} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-100">Dùng mã mẫu: ZEN123456</button>
         </div>
       )}

       {shipment && !isLoading && (
         <div className="space-y-10 animate-in slide-in-from-bottom-10 fade-in duration-700">
            {/* Main Info Card */}
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden relative">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-4">Lô hàng Quốc tế</div>
                    <h3 className="text-7xl font-black text-slate-900 mb-4 tracking-tighter">{shipment.id}</h3>
                    <div className="flex items-center text-slate-400 font-bold space-x-4">
                       <span className="flex items-center"><Globe className="w-5 h-5 mr-2 text-blue-600" /> {shipment.route}</span>
                       <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                       <span className="flex items-center"><Truck className="w-5 h-5 mr-2 text-blue-600" /> Express Air</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 lg:justify-end">
                     <button onClick={() => { navigator.clipboard.writeText(window.location.href); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }} className="flex items-center space-x-3 bg-slate-50 hover:bg-slate-100 px-8 py-5 rounded-2xl font-black transition-all">
                        {isCopied ? <><Check className="w-5 h-5 text-green-500" /> <span>Đã Copy link</span></> : <><Copy className="w-5 h-5" /> <span>Copy Link Tracking</span></>}
                     </button>
                     <button onClick={() => alert('Đang khởi tạo POD PDF...')} className="flex items-center space-x-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl">
                        <Download className="w-5 h-5 text-blue-400" /> <span>Download POD</span>
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                  <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Người gửi</div>
                     <div className="text-xl font-bold text-slate-900">{maskInfo(shipment.sender)}</div>
                  </div>
                  <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Người nhận</div>
                     <div className="text-xl font-bold text-slate-900">{maskInfo(shipment.receiver)}</div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl text-white shadow-2xl shadow-blue-100">
                     <div className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">Ngày giao dự kiến</div>
                     <div className="text-3xl font-black">{shipment.estimatedDelivery}</div>
                  </div>
               </div>

               {/* Timeline */}
               <div className="relative py-16">
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 -translate-y-1/2 rounded-full" />
                  <div className="flex justify-between items-center relative z-10">
                    {STATUS_STEPS.map((s, idx) => {
                       const currentIdx = STATUS_STEPS.indexOf(shipment.currentStatus);
                       const isDone = idx < currentIdx;
                       const isNow = idx === currentIdx;
                       return (
                         <div key={idx} className="flex flex-col items-center flex-1 px-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 ${isDone ? 'bg-green-500 text-white shadow-xl shadow-green-50 rotate-6' : isNow ? 'bg-blue-600 text-white scale-125 shadow-2xl ring-8 ring-blue-50' : 'bg-white border-4 border-slate-100 text-slate-200'}`}>
                               {isDone ? <Check className="w-7 h-7" /> : <Package className="w-6 h-6" />}
                            </div>
                            <div className={`mt-8 text-[10px] font-black uppercase text-center max-w-[80px] leading-tight ${isNow ? 'text-blue-600' : 'text-slate-400'}`}>{s}</div>
                         </div>
                       )
                    })}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               <div className="lg:col-span-2 bg-white rounded-[4rem] shadow-2xl border border-slate-50 p-12 md:p-20">
                  <h4 className="text-3xl font-black mb-16 uppercase tracking-tighter">Lịch sử di chuyển</h4>
                  <div className="space-y-12">
                     {shipment.history.map((h, i) => (
                       <div key={i} className="flex space-x-10 relative group">
                          {i !== shipment.history.length - 1 && <div className="absolute left-[13px] top-8 w-1 h-full bg-slate-50 group-hover:bg-blue-100 transition-colors" />}
                          <div className={`w-7 h-7 rounded-full border-4 border-white z-10 mt-1.5 ${i === 0 ? 'bg-blue-600 ring-8 ring-blue-50 animate-pulse' : 'bg-slate-200'}`} />
                          <div className="flex-1 pb-12">
                             <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-4">
                                <span className="text-2xl font-black text-slate-900">{h.status}</span>
                                <span className="text-xs font-black text-slate-400 uppercase bg-slate-50 px-4 py-2 rounded-full">{h.timestamp}</span>
                             </div>
                             <div className="flex items-center text-sm font-black text-slate-500 mb-6 uppercase tracking-widest">
                                <MapPin className="w-4 h-4 mr-2 text-blue-600" /> {h.location}
                             </div>
                             <p className="text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-8 rounded-[2rem] border-l-8 border-blue-600">{h.description}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-10">
                  <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden flex flex-col min-h-[500px]">
                     <div className="p-10 pb-0">
                        <h4 className="text-2xl font-black mb-2 uppercase tracking-tighter">Bản đồ Hub</h4>
                        <p className="text-sm font-bold text-slate-400">Hub hiện tại: <span className="text-blue-600">{shipment.hubLocation.name}</span></p>
                     </div>
                     <div className="flex-grow mt-10 bg-slate-50 relative">
                        <iframe 
                          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15677.6!2d${shipment.hubLocation.lng}!3d${shipment.hubLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1715690000000!5m2!1sen!2s`}
                          width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="grayscale contrast-125"
                        ></iframe>
                     </div>
                  </div>
                  <div className="bg-slate-900 rounded-[3rem] p-12 text-white flex items-center justify-between group cursor-pointer" onClick={() => setShowAI(true)}>
                     <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Support AI</div>
                        <div className="text-xl font-bold">Hỏi AI về kiện hàng</div>
                     </div>
                     <Bot className="w-12 h-12 text-blue-600 group-hover:scale-110 group-hover:rotate-12 transition-all" />
                  </div>
               </div>
            </div>
         </div>
       )}
    </div>
  );

  // Added return statement to fix 'void' return type error and correctly render the application
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView(View.HOME)}
          >
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <Zap className="text-white w-7 h-7 fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Flowdex</span>
          </div>

          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`text-sm font-black uppercase tracking-widest transition-colors ${currentView === item.view ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setCurrentView(View.TRACKING)}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
            >
              Tracking
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {currentView === View.HOME && renderHome()}
        {currentView === View.ABOUT && renderAbout()}
        {currentView === View.RESEARCH && renderResearch()}
        {currentView === View.MEDIA && renderMedia()}
        {currentView === View.CONTACT && renderContact()}
        {currentView === View.TRACKING && renderTracking()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <Zap className="text-blue-500 w-10 h-10 fill-blue-500" />
              <span className="text-3xl font-black tracking-tighter uppercase italic">Flowdex</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed font-medium">
              Kiến tạo tương lai cho ngành Logistics thông qua dữ liệu và trí tuệ nhân tạo. Đồng hành cùng Forwarder Việt Nam vươn tầm quốc tế.
            </p>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-8">Công ty</h5>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Về chúng tôi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tuyển dụng</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tin tức</li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-8">Hỗ trợ</h5>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Trung tâm trợ giúp</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tài liệu API</li>
              <li className="hover:text-white cursor-pointer transition-colors">Chính sách bảo mật</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-32 pt-12 border-t border-white/5 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
          © 2024 Flowdex Intelligence. All rights reserved.
        </div>
      </footer>

      {/* AI Assistant Modal */}
      {showAI && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl h-[80vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-8 flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-lg">Flowdex Support AI</h3>
                  <div className="flex items-center text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" /> Trực tuyến
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowAI(false)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <AIAssistant />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!showAI && (
        <button 
          onClick={() => setShowAI(true)}
          className="fixed bottom-10 right-10 w-20 h-20 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl shadow-blue-300 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all z-50 group"
        >
          <MessageSquare className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-4 border-white rounded-full" />
        </button>
      )}
    </div>
  );
};

export default App;

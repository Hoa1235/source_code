import React from 'react';
import { Mail, Phone, MapPin, Check, Send } from 'lucide-react';

export const Contact = ({contactSuccess, setContactSuccess}: any) => {
  return (
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
};

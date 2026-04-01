import React from 'react';
import { AlertCircle, Globe, Truck, Check, Copy, Download, MapPin, Package, Bot } from 'lucide-react';
import { STATUS_STEPS } from '../constants';
import { View } from '../types';

export const Tracking = ({trackingId, setTrackingId, handleTrack, isLoading, error, shipment, isCopied, setIsCopied, setShowAI, setCurrentView, maskInfo}: any) => {
  return (
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
};

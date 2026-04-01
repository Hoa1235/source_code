import React, { useState, useEffect } from 'react';
import { Zap, MessageSquare, Bot, X } from 'lucide-react';
import { View, ShipmentData } from './types';
import { DEMO_SHIPMENTS } from './constants';
import AIAssistant from './components/AIAssistant';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { Media } from './pages/Media';
import { Contact } from './pages/Contact';
import { Tracking } from './pages/Tracking';

export const useScrollReveal = () => {
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
        {currentView === View.HOME && <Home setCurrentView={setCurrentView} handleTrack={handleTrack} trackingId={trackingId} setTrackingId={setTrackingId} />}
        {currentView === View.ABOUT && <About />}
        {currentView === View.RESEARCH && <Research />}
        {currentView === View.MEDIA && <Media />}
        {currentView === View.CONTACT && <Contact contactSuccess={contactSuccess} setContactSuccess={setContactSuccess} />}
        {currentView === View.TRACKING && <Tracking trackingId={trackingId} setTrackingId={setTrackingId} handleTrack={handleTrack} isLoading={isLoading} error={error} shipment={shipment} isCopied={isCopied} setIsCopied={setIsCopied} setShowAI={setShowAI} setCurrentView={setCurrentView} maskInfo={maskInfo} />}
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

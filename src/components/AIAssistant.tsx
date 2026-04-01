
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, MessageSquare, Truck, DollarSign, Info, Clock, ShieldCheck, Headphones, Check } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Xin chào! Tôi là Trợ lý Chuyên gia từ Flowdex. Bạn đang cần hỗ trợ về báo giá vận chuyển, tra cứu đơn hàng hay tư vấn quy trình logistics? Tôi luôn sẵn sàng hỗ trợ bạn 24/7.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: 'Báo giá vận chuyển', icon: DollarSign },
    { label: 'Tra cứu đơn hàng', icon: Truck },
    { label: 'Tư vấn thủ tục', icon: Info },
    { label: 'Thời gian vận hành', icon: Clock }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = (customMsg || input).trim();
    if (!userMsg || isTyping) return;

    setInput('');
    
    // 1. Thêm tin nhắn của Khách hàng
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // 2. Phản hồi tự động ngay lập tức (Theo yêu cầu)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Xin chào, cảm ơn bạn đã liên hệ cho chúng tôi. Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ/phản hồi sớm nhất có thể nhé. Trong lúc chờ đợi, tôi (AI Consultant) sẽ giải đáp sơ bộ cho bạn ngay dưới đây:' 
      }]);
    }, 400);

    // 3. Gọi AI để tư vấn chi tiết
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Bạn là chuyên gia tư vấn Logistics cao cấp tại Flowdex. 
          Bối cảnh: Khách hàng đang chat qua website. 
          Nhiệm vụ: Tư vấn về giải pháp số hóa logistics, tracking, cước phí. 
          Phong cách: Chuyên nghiệp, am hiểu nghiệp vụ, tin cậy. 
          Hãy trả lời súc tích nhưng đầy đủ thông tin chuyên môn. 
          Luôn kết thúc bằng một câu mời gọi khách hàng để lại thông tin hoặc đặt câu hỏi tiếp theo.`,
        }
      });

      // Thêm phản hồi chi tiết từ AI
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.text || "Xin lỗi, tôi gặp chút gián đoạn kỹ thuật. Bạn vui lòng gửi lại yêu cầu nhé." 
        }]);
        setIsTyping(false);
      }, 1500);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Hệ thống tư vấn đang bận. Vui lòng để lại số điện thoại, chuyên viên sẽ gọi lại cho bạn ngay." }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Consultant Header Info */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kênh Tư Vấn Doanh Nghiệp (Official)</span>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
               <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Consultant" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {/* Sender Label */}
            <div className={`flex items-center space-x-2 mb-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
               <div className={`p-1.5 rounded-lg ${msg.role === 'user' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                  {msg.role === 'user' ? <User className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {msg.role === 'user' ? 'Khách hàng' : 'Chuyên gia Flowdex'}
               </span>
            </div>

            {/* Message Bubble */}
            <div className={`relative max-w-[85%] p-5 rounded-3xl shadow-sm border ${
              msg.role === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none border-slate-800 font-medium' 
                : 'bg-white text-slate-700 border-slate-100 rounded-tl-none ring-1 ring-slate-50'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              
              {/* Message Status for User */}
              {msg.role === 'user' && (
                <div className="flex justify-end mt-2">
                   <Check className="w-3 h-3 text-blue-400" />
                   <Check className="w-3 h-3 text-blue-400 -ml-1.5" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-pulse mb-4">
            <div className="flex items-center space-x-2 mb-2">
               <div className="p-1.5 rounded-lg bg-blue-50 text-blue-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Đang xử lý...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(action.label)}
              className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 transition-colors"
            >
              <action.icon className="w-3 h-3" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mô tả nhu cầu logistics của bạn..."
            className="flex-1 bg-transparent px-6 py-4 text-sm font-medium outline-none text-slate-800 placeholder-slate-400 w-full"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-full text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
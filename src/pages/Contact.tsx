import React from 'react';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const whatsappNumber = '+963937005789'; // Replace with your actual WhatsApp number
  const whatsappMessage = 'مرحباً، أود الاستفسار عن أجهزة الكمبيوتر المحمولة لديكم';
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">اتصل بنا</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-dark-400 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">العنوان</h3>
                <p className="text-dark-200">دمشق، سوريا</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">الهاتف</h3>
                <p className="text-dark-200" dir="ltr">+963 937 005 789</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-bold">البريد الإلكتروني</h3>
                <p className="text-dark-200">razioxstore@gmail.com</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="mt-8 w-full btn btn-primary flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            تواصل معنا عبر واتساب
          </button>
        </div>
        
        <div className="bg-dark-400 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block mb-2">الاسم</label>
              <input type="text" className="input" />
            </div>
            
            <div>
              <label className="block mb-2">البريد الإلكتروني</label>
              <input type="email" className="input" />
            </div>
            
            <div>
              <label className="block mb-2">الرسالة</label>
              <textarea className="input min-h-[150px]" />
            </div>
            
            <button type="submit" className="btn btn-primary w-full">
              إرسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
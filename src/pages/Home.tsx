import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop2, Search, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-primary">رازيو</span> لأجهزة الكمبيوتر المحمولة
        </h1>
        <p className="text-xl text-dark-200 mb-8">
          اكتشف أفضل أجهزة الكمبيوتر المحمولة في دمشق
        </p>
        <Link 
          to="/catalog"
          className="btn btn-primary text-lg"
        >
          تصفح اللابتوبات
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Laptop2 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">تشكيلة واسعة</h3>
          <p className="text-dark-200">
            مجموعة متنوعة من أفضل العلامات التجارية العالمية
          </p>
        </div>
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Search className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">بحث متقدم</h3>
          <p className="text-dark-200">
            ابحث حسب المواصفات والسعر والعلامة التجارية
          </p>
        </div>
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Star className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">خدمة متميزة</h3>
          <p className="text-dark-200">
            دعم فني متخصص ومساعدة في اختيار الجهاز المناسب
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
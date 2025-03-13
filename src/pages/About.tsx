import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">من نحن</h1>
        <p className="text-xl text-dark-200 max-w-2xl mx-auto">
          رازيو هو وجهتك الأولى لأجهزة الكمبيوتر المحمولة في دمشق. نقدم مجموعة واسعة من الأجهزة المحمولة من أفضل العلامات التجارية العالمية.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">ضمان الجودة</h3>
          <p className="text-dark-200">
            نقدم أجهزة عالية الجودة مع ضمان شامل وخدمة ما بعد البيع
          </p>
        </div>
        
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Award className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">خبرة واسعة</h3>
          <p className="text-dark-200">
            فريق متخصص يساعدك في اختيار الجهاز المناسب لاحتياجاتك
          </p>
        </div>
        
        <div className="bg-dark-400 p-6 rounded-xl text-center">
          <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">دعم متواصل</h3>
          <p className="text-dark-200">
            نقدم الدعم الفني على مدار الساعة لجميع عملائنا
          </p>
        </div>
      </div>

      <div className="bg-dark-400 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
        <p className="text-dark-200 mb-4">
          تأسست رازيو بهدف تقديم أفضل تجربة شراء لأجهزة الكمبيوتر المحمولة في دمشق. نحن نؤمن بأن كل شخص يستحق الحصول على جهاز يناسب احتياجاته وميزانيته.
        </p>
        <p className="text-dark-200">
          نحن نفخر بتقديم مجموعة واسعة من الخيارات مع خدمة عملاء استثنائية ودعم فني متخصص. هدفنا هو أن نكون الخيار الأول لكل من يبحث عن جهاز كمبيوتر محمول في سوريا.
        </p>
      </div>
    </div>
  );
};

export default About;
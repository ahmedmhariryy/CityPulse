

const Footer = () => {
  return (
    <footer dir="rtl" className="bg-slate-900 text-slate-300 py-12 px-6 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-black text-white text-lg">CityPulse</span>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-black text-sm">
              CP
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            منصة بلاغات محافظة القاهرة — نربط المواطن بالمسؤول بشفافية وكفاءة.
          </p>
        </div>

        <div>
          <h4 className="font-black text-white mb-4">الخدمات</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/report" className="hover:text-white transition-colors">
                تقديم بلاغ
              </a>
            </li>
            <li>
              <a href="/my-reports" className="hover:text-white transition-colors">
                متابعة بلاغاتي
              </a>
            </li>
            <li>
              <a href="/map" className="hover:text-white transition-colors">
                الخريطة الحية
              </a>
            </li>
            <li>
              <a href="/reports" className="hover:text-white transition-colors">
                التقارير
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white mb-4">المحافظة</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                عن المشروع
              </a>
            </li>
            <li>
              <a href="/teams" className="hover:text-white transition-colors">
                الفرق المختصة
              </a>
            </li>
            <li>
              <a href="/stats" className="hover:text-white transition-colors">
                إحصاءات الأداء
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                سياسة الخصوصية
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white mb-4">تواصل</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>info@qalyubia.gov.eg</li>
            <li>١٦٣٢٨</li>
            <li>محافظة القاهرة رمسيس</li>
            <li>الاثنين – الجمعة، ٨ص – ٤م</li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
        © ٢٠٢٦ CityPulse — محافظة القاهرة. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};

export default Footer;
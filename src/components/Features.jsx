export default function Features() {
    return (
        <section  className="py-20 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                المميزات
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                كل ما تحتاجه في منصة واحدة
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                نظام متكامل يربط المواطن بالجهة المختصة بسلاسة وشفافية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-teal-50 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-camera w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                    <circle cx="12" cy="13" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  إبلاغ لحظي بالصور
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  صوّر المشكلة وأرسل بلاغك في ثوانٍ مع تحديد تلقائي للموقع عبر
                  GPS
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-amber-50 text-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-zap w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  أولوية ذكية
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  نظام ذكي يحسب درجة الخطورة بناءً على نوع المشكلة وقربها من
                  المدارس والمستشفيات
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-blue-50 text-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  خريطة حرارية حية
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  شاهد توزيع البلاغات على خريطة تفاعلية وتحديد المناطق الأكثر
                  احتياجاً
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-purple-50 text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bell w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  تتبع فوري
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  استقبل إشعارات لحظية عند تحديث حالة بلاغك في كل مرحلة
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-rose-50 text-rose-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chart-column w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="M18 17V9"></path>
                    <path d="M13 17V5"></path>
                    <path d="M8 17v-3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  تحليلات متقدمة
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  لوحة تحكم إدارية شاملة بمؤشرات الأداء وتقارير الاستجابة لكل
                  دائرة
                </p>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-emerald-50 text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield w-7 h-7"
                    aria-hidden="true"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">
                  مؤشر الخطر العمراني
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  تقييم ديناميكي لمستوى خطورة كل منطقة بناءً على تراكم البلاغات
                  وسرعة الاستجابة
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}


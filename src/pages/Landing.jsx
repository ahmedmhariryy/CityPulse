import Footer from "../components/common/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import AuthRequiredModal from "../components/AuthRequiredModal";
import Navbar from "../components/common/Navbar";
import Features from './../components/Features';
import Testnomial from './../components/Testnomial';
const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
   const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);
  const handleCreateReportClick = () => {
    if (user) {
      navigate("/report");
    } else {
      setShowAuthModal(true);
    }
  };
  return (
    <>
      <div dir="rtl" className="min-h-screen font-main bg-white text-slate-900">
       <Navbar />
        <section className="pt-24 pb-20 px-6 bg-gradient-to-br from-slate-900 via-primary-darker to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt=""
              className="w-full h-full object-cover opacity-20"
              src="/images/hero-city.png"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-primary-darker/70 to-slate-900/90"></div>
          </div>
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-info rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-5xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-teal-400/10 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-teal-400/30 backdrop-blur mx-auto">
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
                className="w-4 h-4"
                aria-hidden="true"
              >
                <line x1="3" x2="21" y1="22" y2="22"></line>
                <line x1="6" x2="6" y1="18" y2="11"></line>
                <line x1="10" x2="10" y1="18" y2="11"></line>
                <line x1="14" x2="14" y1="18" y2="11"></line>
                <line x1="18" x2="18" y1="18" y2="11"></line>
                <polygon points="12 2 20 7 4 7"></polygon>
              </svg>
              منصة القاهرة الرقمية لإدارة البلاغات
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              صوتك يبني<span className="block text-primary mt-1">محافظتك</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              منصة ذكية تمكّن مواطني القاهرة من الإبلاغ عن مشكلات البنية
              التحتية، وتمنح الإدارة أدوات متطورة لمتابعة الحلول وقياس الأداء
              بشفافية كاملة.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={handleCreateReportClick}
                className="w-full sm:w-auto cursor-pointer px-8 py-4 text-lg font-black text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                ابدأ الإبلاغ الآن
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
                  className="lucide lucide-arrow-left w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-slate-200 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors backdrop-blur">
                شاهد كيف يعمل
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-primary">
                  ١٢,٨٤٠
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  بلاغ منذ الإطلاق
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-emerald-600">
                  ٨٩٪
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  معدل الحل الناجح
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-info">٢.٤</div>
                <div className="text-xs text-slate-400 font-bold">
                  ساعة متوسط الاستجابة
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-black mb-1 text-warning">٧</div>
                <div className="text-xs text-slate-400 font-bold">
                  مراكز مُغطّاة
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                التأثير الحقيقي
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                من البلاغ إلى الحل
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                آلاف المشاكل تم حلها بفضل مواطنين فاعلين ومنصة ذكية
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="طرق نظيفة وآمنة"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/street-clean.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">طرق نظيفة وآمنة</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    بعد كل بلاغ وكل إصلاح
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="فرق متخصصة سريعة الاستجابة"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/workers-team.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">
                    فرق متخصصة سريعة الاستجابة
                  </p>
                  <p className="text-xs text-white/70 mt-0.5">
                    ٤٣ موظف في ٥ أقسام
                  </p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md group relative">
                <img
                  alt="قبل وبعد"
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/images/before-after.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 right-0 left-0 p-5 text-white">
                  <p className="font-black text-sm">قبل وبعد</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    التحول الذي يصنعه كل بلاغ
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٨٩٪
                </div>
                <div className="text-xs font-black text-slate-700">
                  معدل الحل الناجح
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  من إجمالي البلاغات
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٢.٤ ساعة
                </div>
                <div className="text-xs font-black text-slate-700">
                  متوسط وقت الاستجابة
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  منذ لحظة البلاغ
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ٤٣ موظف
                </div>
                <div className="text-xs font-black text-slate-700">
                  في فرق متخصصة
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ٥ أقسام فنية
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center">
                <div className="text-2xl font-black text-primary-dark mb-1">
                  ١٢,٨٤٠
                </div>
                <div className="text-xs font-black text-slate-700">
                  بلاغ مُعالج
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  منذ إطلاق المنصة
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="py-20 px-6 bg-slate-50">
          <Features />
        </section>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                كيف يعمل
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                أربع خطوات وبلاغك وصل
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-10 right-[12.5%] left-[12.5%] h-0.5 bg-teal-100 z-0"></div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ١
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  سجّل أو سجّل الدخول
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  أنشئ حسابك بدقيقة واحدة فقط بالاسم والرقم القومي
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٢
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  صوّر وحدد الموقع
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  التقط صورة للمشكلة ويحدد التطبيق موقعك تلقائياً
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٣
                </div>
                <h3 className="font-black text-slate-800 mb-2">
                  اختر الفئة وأرسل
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  حدد نوع المشكلة واكتب وصفاً موجزاً ثم أرسل البلاغ
                </p>
              </div>
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-5 shadow-md shadow-primary/30">
                  ٤
                </div>
                <h3 className="font-black text-slate-800 mb-2">تابع وقيّم</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  استقبل تحديثات لحظية وقيّم الخدمة بعد الحل
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-[96%] mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm font-black text-primary uppercase tracking-wider mb-3 block">
                التغطية الجغرافية
              </span>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                ٧ مراكز تُغطيها المنصة
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                مراكز محافظة القاهرة كلها داخل شبكة CityPulse
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-red-50 border-danger/30 text-danger transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٣٤٢</div>
                <div className="text-lg font-black leading-tight mb-3">
                  مصر الجديدة 
                </div>
                <div className="text-xs opacity-80 font-bold">
                  92٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "92%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-orange-50 border-orange-300 text-orange-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٩٨</div>
                <div className="text-lg font-black leading-tight mb-3">
                  مدينة نصر
                </div>
                <div className="text-xs opacity-80 font-bold">
                  71٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "71%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-amber-50 border-warning/30 text-warning transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٥٦</div>
                <div className="text-lg font-black leading-tight mb-3">
                  رمسيس
                </div>
                <div className="text-xs opacity-80 font-bold">
                  58٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "58%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-yellow-50 border-yellow-300 text-yellow-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">١٣٤</div>
                <div className="text-lg font-black leading-tight mb-3">
                  المعادي
                </div>
                <div className="text-xs opacity-80 font-bold">
                  45٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "45%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-emerald-50 border-emerald-300 text-emerald-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٨٩</div>
                <div className="text-lg font-black leading-tight mb-3">
                  التجمع الاول
                </div>
                <div className="text-xs opacity-80 font-bold">
                  28٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "28%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-green-50 border-green-300 text-green-700 transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٦٧</div>
                <div className="text-lg font-black leading-tight mb-3">
                  التجمع الخامس 
                </div>
                <div className="text-xs opacity-80 font-bold">
                  22٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "22%", background: "currentColor" }}
                ></div>
              </div>
              <div className="rounded-3xl border-2 p-4 text-center hover:shadow-lg transition-all cursor-pointer bg-teal-50 border-primary/30 text-primary transform hover:-translate-y-1">
                <div className="text-5xl font-black mb-2">٤٥</div>
                <div className="text-lg font-black leading-tight mb-3">الشروق</div>
                <div className="text-xs opacity-80 font-bold">
                  15٪ مؤشر الخطر
                </div>
                <div className="mt-3 h-1.5 bg-current rounded-full opacity-20"></div>
                <div
                  className="mt-1 h-1.5 rounded-full opacity-90"
                  style={{ width: "15%", background: "currentColor" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
              <section id="testimonials">
          <Testnomial />
        </section>
        <section className="relative overflow-hidden py-24 px-6 text-center">
          <div className="absolute inset-0">
            <img
              alt=""
              className="w-full h-full object-cover"
              src="/images/gov-building.png"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-900/95 via-primary-darker/85 to-primary/40"></div>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 bg-teal-400/10 text-teal-300 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-teal-400/30 backdrop-blur mx-auto">
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
                className="w-4 h-4"
                aria-hidden="true"
              >
                <line x1="3" x2="21" y1="22" y2="22"></line>
                <line x1="6" x2="6" y1="18" y2="11"></line>
                <line x1="10" x2="10" y1="18" y2="11"></line>
                <line x1="14" x2="14" y1="18" y2="11"></line>
                <line x1="18" x2="18" y1="18" y2="11"></line>
                <polygon points="12 2 20 7 4 7"></polygon>
              </svg>
              محافظة القاهرة — مشروع التحول الرقمي
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              <span className="block text-white">ابدأ في تحسين</span>
              <span className="block text-primary">محيطك اليوم</span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
              انضم لآلاف مواطني القاهرة الذين يساهمون في بناء محافظة أفضل.
              صوتك يُحدث فرقاً حقيقياً.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur text-center"
              >
                ابدأ الان
              </Link>
              <a
                href="/about"
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur text-center"
              >
                تعرّف على المشروع
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <div
        role="region"
        aria-label="Notifications (F8)"
        tabIndex="-1"
        style={{ pointerEvents: "none" }}
      >
        <ol
          tabIndex="-1"
          className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
        ></ol>
      </div>
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() =>
          navigate("/login", { state: { from: { pathname: "/report" } } })
        }
      />
    </>
  );
};

export default Landing;

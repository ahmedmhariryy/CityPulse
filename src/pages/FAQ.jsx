import  { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function FAQ() {
  const [activeTab, setActiveTab] = useState('general');
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const tabs = [
    { id: 'privacy', label: 'الخصوصية', type: 'privacy' },
    { id: 'notifications', label: 'الإشعارات', type: 'notifications' },
    { id: 'followup', label: 'متابعة البلاغ', type: 'followup' },
    { id: 'report', label: 'تقديم البلاغ', type: 'report' },
    { id: 'general', label: 'عام', type: 'general' },
  ];

  const faqData = {
    general: [
      {
        id: 'g1',
        question: 'ما هو تطبيق CityPulse؟',
        answer: 'CityPulse هي منصة رقمية أطلقتها محافظة القليوبية لتمكين المواطنين من الإبلاغ عن مشكلات البنية التحتية كالحفر والكسر ومشاكل الصرف الصحي والإضاءة، وتمنح الإدارة أدوات متقدمة لمتابعة الحل وقياس الأداء.'
      },
      {
        id: 'g2',
        question: 'هل الخدمة مجانية للمواطنين؟',
        answer: 'نعم، خدمة CityPulse مجانية بالكامل لجميع مواطني محافظة القليوبية. لا توجد أي رسوم للتسجيل أو تقديم البلاغات.'
      },
      {
        id: 'g3',
        question: 'من يستطيع استخدام المنصة؟',
        answer: 'يمكن لجميع مواطني محافظة القليوبية والمقيمين فيها استخدام المنصة. يكفي أن يكون لديك رقم هاتف مصري للتسجيل.'
      },
      {
        id: 'g4',
        question: 'ما المشكلات التي يمكن الإبلاغ عنها؟',
        answer: 'تشمل الفئات: الطرق والأرصفة، مياه وصرف صحي، كهرباء وإنارة، نظافة وقمامة، حدائق ومناطق عامة، بنية تحتية عامة.'
      }
    ],
    report: [
      {
        id: 'r1',
        question: 'كيف أقدم بلاغاً جديداً؟',
        answer: "اضغط على 'ابدأ الإبلاغ الآن' من الصفحة الرئيسية أو 'بلاغ جديد' من لوحة التحكم. ستمر بثلاث خطوات بسيطة: تحديد الموقع والفئة، إضافة التفاصيل والصور، ثم المراجعة والإرسال."
      },
      {
        id: 'r2',
        question: 'هل يجب إضافة صورة للبلاغ؟',
        answer: 'الصورة اختيارية لكنها تُسرّع معالجة البلاغ بشكل كبير. البلاغات المصحوبة بصور تُحل بمعدل أسرع بـ٤٠٪ مقارنة بتلك بدون صور.'
      },
      {
        id: 'r3',
        question: 'ماذا يحدث بعد إرسال البلاغ؟',
        answer: 'يصل البلاغ فوراً لفريق الإدارة الذي يراجعه ويحدد أولويته ويعينه للفريق المختص خلال ساعات. ستصلك إشعارات في كل مرحلة.'
      },
      {
        id: 'r4',
        question: 'كم مرة يمكنني تقديم البلاغات؟',
        answer: 'لا يوجد حد لعدد البلاغات. يمكنك تقديم بلاغ عن أي مشكلة تراها في المحافظة. نحرص على عدم تكرار البلاغات لنفس المشكلة تلقائياً.'
      }
    ],
    followup: [
      {
        id: 'f1',
        question: 'كيف أتابع حالة بلاغي؟',
        answer: "سجّل الدخول واذهب إلى 'لوحة التحكم'. ستجد جميع بلاغاتك مع نسبة الإنجاز والحالة التففاضلية. يمكنك الضغط على أي بلاغ لرؤية سجل المراحل الكاملة."
      },
      {
        id: 'f2',
        question: 'ما معنى كل حالة؟',
        answer: 'مفتوح: البلاغ مُستلم ينتظر مراجعة. تم التعيين: جرى تعيينه لفريق. قيد التنفيذ: الفريق يعمل عليه. تم الحل: الإصلاح اكتمل. مغلق: تم التحقق والإغلاق.'
      },
      {
        id: 'f3',
        question: 'ما المدة المتوقعة لحل البلاغ؟',
        answer: 'يختلف حسب نوع المشكلة. الحالات الطارئة (كهرباء، مياه) خلال ٢٤ ساعة. الطرق والأرصفة ٣-٧ أيام. النظافة ١-٣ أيام. متوسط الاستجابة الكلي ٢.٤ ساعة.'
      }
    ],
    notifications: [
      {
        id: 'n1',
        question: 'كيف أستقبل الإشعارات？',
        answer: 'الإشعارات تصل عبر التطبيق مباشرة. في حال وجود رقم هاتف مسجل، يمكن استقبال إشعارات SMS عند التحديثات المهمة.'
      },
      {
        id: 'n2',
        question: 'هل يمكنني إيقاف الإشعارات؟',
        answer: 'نعم، من صفحة الإعدادات في لوحة التحكم يمكنك التحكم الكامل في أنواع الإشعارات التي تريد استقبالها.'
      }
    ],
    privacy: [
      {
        id: 'p1',
        question: 'هل بياناتي الشخصية محمية؟',
        answer: 'نعم، نلتزم بسياسة الخصوصية المصرية الكاملة. بياناتك لا تُشارك مع أي جهة خارجية. الهوية الشخصية لا تظهر للعامة.'
      },
      {
        id: 'p2',
        question: 'هل يمكن حذف حسابي؟',
        answer: 'يمكنك طلب حذف حسابك وجميع بياناتك الشخصية من خلال صفحة الإعدادات أو عبر التواصل مع فريق الدعم.'
      }
    ]
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const filteredFaqs = faqData[activeTab].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTabIcon = (type, isActive) => {
    const strokeColor = isActive ? '#ffffff' : '#00b097';
    
    switch (type) {
      case 'general':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'report':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'followup':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'notifications':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        );
      case 'privacy':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-main text-right" dir="rtl">
      <Navbar />

      
      <section className="relative overflow-hidden mt-16 bg-[radial-gradient(circle_at_center,_#0d3d3d_0%,_#072a33_45%,_#041626_100%)] text-white text-center pt-14 pb-12 px-4">
        <div className="relative z-10 max-w-3xl mx-auto">
          
          
          <div className="inline-flex items-center gap-2 bg-[#12343a]/70 backdrop-blur-md px-5 py-2 rounded-full text-[13px] font-medium mb-7 border border-white/10 transition-all duration-300 group">
            <span className="text-[#00b097] text-[14px] font-bold group-hover:text-white transition-colors duration-300">→</span>
            <Link to="/" className="text-[#00b097] font-semibold group-hover:text-white transition-colors duration-300">
              العودة للرئيسية
            </Link>
            
            <svg className="w-3.5 h-3.5 text-[#00b097] group-hover:text-white transition-colors duration-300 mx-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            
            <span className="text-[#00b097] font-bold bg-[#1a3c42] px-2 py-0.5 rounded-full text-[11px]">كل ما تريد معرفته</span>
          </div>

          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            <span className="text-white">الأسئلة </span>
            <span className="text-[#00b097] drop-shadow-[0_0_20px_rgba(0,176,151,0.35)]">الشائعة</span>
          </h2>
          
          <p className="text-gray-400/90 text-sm md:text-[19px] max-w-xl mx-auto mb-9 font-normal opacity-90">
            إجابات واضحة على أكثر الأسئلة التي يطرحها مواطنو القاهرة
          </p>

          {/* searsh*/}
          <div className="max-w-[550px] mx-auto relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة..." 
              className="w-full bg-[#1a3c42]/60 border border-white/10 rounded-xl py-3.5 pr-5 pl-12 text-white placeholder-gray-500/80 focus:outline-none focus:ring-2 focus:ring-[#00b097]/30 focus:border-[#00b097] text-[14px] transition-all duration-300 text-right shadow-inner"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#00b097] transition-colors duration-300">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <main className="max-w-4xl mx-auto px-4 py-12 -mt-6 relative z-20">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" dir="ltr">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setOpenFaq(null);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#00b097] text-white border-none shadow-sm' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {renderTabIcon(tab.type, isActive)}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className={`transition-all duration-200 rounded-xl border ${
                    isOpen 
                      ? 'bg-white border-[#00b097]/30 shadow-sm ring-1 ring-[#00b097]/20' 
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-right p-5 text-gray-800 hover:text-[#00b097] transition font-bold text-sm md:text-base"
                  >
                    <span className={isOpen ? 'text-[#072a33]' : 'text-gray-800'}>
                      {faq.question}
                    </span>
                    <span className={`transition-transform duration-300 ${isOpen ? 'text-[#00b097]' : 'text-gray-400'}`}>
                      {isOpen ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pt-1 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-50 bg-[#fafbfc]/50 rounded-b-xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100 shadow-sm text-sm">
              لا توجد نتائج تطابق بحثك في هذا القسم.
            </div>
          )}
        </div>

        
        <div className="mt-12 bg-gradient-to-r from-[#072a33] to-[#00b097] rounded-2xl p-8 text-center text-white shadow-md relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_50%)]"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">لم تجد إجابة لسؤالك؟</h3>
            <p className="text-gray-100 text-xs md:text-sm mb-6 font-light">فريقنا جاهز للمساعدة في أي وقت</p>
            
            
            <button onClick={() => {
              navigate('/contact') ;
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });

            }} className="cursor-pointer bg-white text-[#072a33] hover:bg-gray-50 hover:text-[#00b097] px-6 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-sm transition duration-200">
              <span>تواصل مع الدعم</span>
            </button>
          </div>
        </div>
      </main>

        <Footer />
    </div>
  );
}   
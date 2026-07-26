import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const IconCheck = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2.5 select-none shrink-0">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconEye = ({ show }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 hover:text-white transition-colors">
    {show ? (
      <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </>
    ) : (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "حقل البريد الإلكتروني مطلوب.";
    if (!emailRegex.test(value)) return "الرجاء إدخال بريد إلكتروني صحيح.";
    return '';
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "حقل كلمة المرور مطلوب.";
    if (value.length < 8) return "كلمة المرور يجب أن تكون 8 أحرف على الأقل.";
    return '';
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const currentErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  Object.keys(currentErrors).forEach(key => {
    if (!currentErrors[key]) delete currentErrors[key];
  });

  setErrors(currentErrors);
  if (Object.keys(currentErrors).length > 0) return;

  try {
    setLoading(true);
    
    const userData = await login(email, password);
    
    if (userData.role === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    } else {
      navigate(from || '/dashboard', { replace: true });
    }

  } catch (error) {
    const message = error.response?.data?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
    
   
    if (message.includes('deactivated')) {
      setErrors({
        general: 'تم تعطيل حسابك. يرجى التواصل مع الدعم للمساعدة.'
      });
    } else {
      setErrors({ general: message });
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen text-white font-main select-none bg-[radial-gradient(circle_at_center,_#0d3d3d_0%,_#072a33_45%,_#041626_100%)] flex items-center justify-center p-4 md:p-10">
      <style>{`
        input::-ms-reveal,
        input::-ms-clear { display: none !important; }
      `}</style>

      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#12343a] border border-white/10 rounded-2xl px-8 py-5 flex items-center gap-3 shadow-2xl">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-white font-medium">جاري تسجيل الدخول...</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] items-center px-2 md:px-6 lg:px-10 gap-12 md:gap-16 lg:gap-32 mx-auto">

        <div className="w-full max-w-[385px] mx-auto md:justify-self-start scale-[1.02] transition-transform">
          <div className="flex bg-[#16363a]/90 p-1 rounded-2xl mb-4 border border-white/5 shadow-md">
            <Link to="/register" className="flex-1 py-2.5 text-center text-sm font-semibold rounded-xl text-gray-400 hover:text-white transition-all">
              حساب جديد
            </Link>
            <div className="flex-1 py-2.5 text-center text-sm rounded-xl bg-primary text-white shadow-md font-bold cursor-default">
              تسجيل الدخول
            </div>
          </div>

          <div className="bg-[#12343a]/80 border border-white/10 p-6 rounded-[26px] backdrop-blur-2xl w-full shadow-2xl">
            <div className="text-center mb-5" dir="rtl">
              <h2 className="text-2xl font-bold text-white mb-1">أهلاً بعودتك</h2>
              <p className="text-xs text-gray-400">ادخل بياناتك للمتابعة</p>
            </div>

            <form className="space-y-4" dir="rtl" onSubmit={handleSubmit}>

              {errors.general && (
                <p className="text-sm text-red-400 text-center font-medium bg-red-400/10 py-2 px-3 rounded-xl">
                  {errors.general}
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300 font-medium block">البريد الإلكتروني</label>
                <input
                  type="text"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: validateEmail(e.target.value) });
                  }}
                  onBlur={() => setErrors({ ...errors, email: validateEmail(email) })}
                  className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 px-4 text-sm text-right font-sans text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-primary'}`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-400 font-medium mt-1 pr-1 leading-normal">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <a href="#" className="text-xs text-primary hover:text-primary-dark transition-colors">نسيت كلمة المرور؟</a>
                  <label className="text-sm text-gray-300 font-medium">كلمة المرور</label>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: validatePassword(e.target.value) });
                    }}
                    onBlur={() => setErrors({ ...errors, password: validatePassword(password) })}
                    className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 pl-11 pr-4 text-sm font-sans text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.password ? 'border-red-500/80 focus:border-red-500' : 'border-white/10 focus:border-primary'}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 focus:outline-none">
                    <IconEye show={showPassword} />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-400 font-medium mt-1 pr-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-2xl transition-all shadow-md text-sm mt-4 disabled:opacity-60"
              >
                دخول
              </button>
            </form>

            <div className="text-center my-3.5 text-xs text-gray-500">أو</div>
            <Link to="/register" className="block text-center w-full border border-white/10 hover:bg-white/5 text-white py-3 rounded-2xl transition-all text-sm font-medium">
              أنشئ حساباً جديداً
            </Link>

            <p className="text-[11px] text-center text-gray-500 mt-5" dir="rtl">
              بالمتابعة، أنت توافق على <span className="text-primary cursor-pointer">سياسة الخصوصية</span> و <span className="text-primary cursor-pointer">شروط الاستخدام</span>
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-start text-right space-y-6 w-full max-w-[550px] md:justify-self-end md:-mr-26 relative" dir="rtl">
          <Link to="/" className="absolute -top-6 right-0 flex flex-row items-center gap-3 select-none" dir="rtl">
            <div className="bg-primary text-white font-bold p-1 rounded-2xl text-base flex items-center justify-center min-w-[46px] h-[46px] shadow-sm">CP</div>
            <div className="flex flex-col text-right">
              <h1 className="text-lg font-bold tracking-wide leading-none">CityPulse</h1>
              <p className="text-xs text-primary mt-1 font-medium">محافظة القاهرة</p>
            </div>
          </Link>

          <div className="space-y-2 w-full mt-36">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              بلاغك يصنع<br />
              <span className="text-primary inline-block mt-0.5">الفارق</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              انضم لمجتمع المواطنين الفاعلين وشارك في بناء محافظة القاهرة بالإبلاغ عن المشكلات واقتراح الحلول.
            </p>
          </div>

          <ul className="space-y-4 text-[15px] text-gray-200 font-medium w-full">
            <li className="flex items-center text-primary"><IconCheck /><span className="text-white mr-1">إبلاغ فوري بصورة وموقع GPS</span></li>
            <li className="flex items-center text-primary transition-all"><IconCheck /><span className="text-white mr-1">متابعة حالة بلاغك أولاً بأول</span></li>
            <li className="flex items-center text-primary transition-all"><IconCheck /><span className="text-white mr-1">إشعارات لحظية عند الحل</span></li>
            <li className="flex items-center text-primary transition-all"><IconCheck /><span className="text-white mr-1">تقييم الخدمة وبناء سجل الأداء</span></li>
          </ul>

          <div className="grid grid-cols-3 gap-2.5 w-full pt-16">
            <div className="bg-[#12343a]/75 py-3 px-6 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">+١٢ ألف</p>
              <p className="text-[11px] text-gray-400 mt-1">مستخدم نشط</p>
            </div>
            <div className="bg-[#12343a]/75 p-3 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">٨٩٪</p>
              <p className="text-[11px] text-gray-400 mt-1">نسبة الحل</p>
            </div>
            <div className="bg-[#12343a]/75 p-3 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">٢.٤س</p>
              <p className="text-[11px] text-gray-400 mt-1">متوسط الاستجابة</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
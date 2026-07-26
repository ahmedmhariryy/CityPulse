import  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
const IconCheck = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block ml-2.5 select-none shrink-0"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconEye = ({ show }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/60 hover:text-white transition-colors"
  >
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

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const validateField = (name, value) => {
    const phoneRegex = /^(\+?\d{10,15})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "firstName":
        if (!value.trim()) return "حقل الاسم الأول مطلوب.";
        if (!nameRegex.test(value)) return "الاسم يجب أن يحتوي على حروف فقط.";
        return "";
      case "lastName":
        if (!value.trim()) return "حقل الاسم الثاني مطلوب.";
        if (!nameRegex.test(value)) return "الاسم يجب أن يحتوي على حروف فقط.";
        return "";
      case "phone":
        if (!value.trim()) return "حقل رقم الهاتف مطلوب.";
        if (!phoneRegex.test(value))
          return "الرجاء إدخال رقم هاتف صحيح (مصري أو دولي).";
        return "";
      case "email":
        if (!value.trim()) return "حقل البريد الإلكتروني مطلوب.";
        if (!emailRegex.test(value)) return "الرجاء إدخال بريد إلكتروني صحيح.";
        return "";
      case "password":
        if (!value.trim()) return "حقل كلمة المرور مطلوب.";
        if (value.length < 8)
          return "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
    }

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors({ ...errors, [name]: error });
  };

  const filledFieldsCount = Object.values(formData).filter(
    (value) => value.trim() !== "",
  ).length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) currentErrors[key] = error;
    });

    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) return;

    try {
      setLoading(true);

      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phone,
      });

      setIsSuccess(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "حدث خطأ ما، يرجى المحاولة في وقت لاحق",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-main select-none bg-[radial-gradient(circle_at_center,_#0d3d3d_0%,_#072a33_45%,_#041626_100%)] flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
      <style>{`
        input::-ms-reveal,
        input::-ms-clear { display: none !important; }
      `}</style>

      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#12343a] border border-white/10 rounded-2xl px-8 py-5 flex items-center gap-3 shadow-2xl">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-white font-medium">
              جاري إنشاء الحساب...
            </span>
          </div>
        </div>
      )}

      {isSuccess && (
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-[#12343a]/90 border border-primary/40 text-gray-100 px-6 py-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-3 border-t-4 border-t-primary max-w-sm w-full"
          dir="rtl"
        >
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-inner">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-wide">
            تم إنشاء الحساب بنجاح
          </span>
        </div>
      )}

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_1.1fr] items-center px-2 md:px-6 lg:px-10 gap-12 md:gap-16 lg:gap-32 mx-auto">
        <div className="w-full max-w-[385px] mx-auto md:justify-self-start scale-[1.02] transition-transform">
          <div className="flex bg-[#16363a]/90 p-1 rounded-2xl mb-4 border border-white/5 shadow-md">
            <div className="flex-1 py-2.5 text-center text-sm rounded-xl bg-primary text-white shadow-md font-bold cursor-default">
              حساب جديد
            </div>
            <Link
              to="/login"
              className="flex-1 py-2.5 text-center text-sm font-semibold rounded-xl text-gray-400 hover:text-white transition-all"
            >
              تسجيل الدخول
            </Link>
          </div>

          <div className="bg-[#12343a]/80 border border-white/10 p-6 rounded-[26px] backdrop-blur-2xl w-full shadow-2xl">
            <div
              className="flex items-center justify-between mb-5 px-0.5"
              dir="rtl"
            >
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full mx-0.5 transition-all duration-300 ${index <= filledFieldsCount ? "bg-primary" : "bg-[#274348]"}`}
                />
              ))}
            </div>

            <div className="text-center mb-5" dir="rtl">
              <h2 className="text-2xl font-bold text-white mb-1">
                معلوماتك الشخصية
              </h2>
            </div>

            <form className="space-y-3.5" dir="rtl" onSubmit={handleSubmit}>
              {errors.general && (
                <p className="text-sm text-red-400 text-center font-medium bg-red-400/10 py-2 px-3 rounded-xl">
                  {errors.general}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300 font-medium">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="أحمد"
                    className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 px-4 text-sm text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.firstName ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-400 font-medium pr-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm text-gray-300 font-medium">
                    الاسم الثاني
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="أحمد"
                    className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 px-4 text-sm text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.lastName ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-400 font-medium pr-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300 font-medium">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="01xxxxxxxxx"
                  className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 px-4 text-sm text-left font-sans text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.phone ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-primary"}`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-400 font-medium pr-1 leading-normal">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300 font-medium">
                  البريد الإلكتروني
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="example@mail.com"
                  className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 px-4 text-sm text-right font-sans text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.email ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-primary"}`}
                />
                {errors.email && (
                  <p className="text-[11px] text-red-400 font-medium pr-1 leading-normal">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm text-gray-300 font-medium">
                  كلمة المرور
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full bg-[#1a3c42]/90 border rounded-2xl py-3 pl-11 pr-4 text-sm font-sans text-gray-200 focus:outline-none transition-all placeholder:text-gray-500 ${errors.password ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-primary"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 focus:outline-none"
                  >
                    <IconEye show={showPassword} />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-400 font-medium pr-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-2xl transition-all shadow-md text-sm mt-4 disabled:opacity-60"
              >
                إنشاء حساب
              </button>
            </form>

            <p className="text-[11px] text-center text-gray-500 mt-5" dir="rtl">
              بالمتابعة، أنت توافق على{" "}
              <span className="text-primary cursor-pointer">
                سياسة الخصوصية
              </span>{" "}
              و{" "}
              <span className="text-primary cursor-pointer">
                شروط الاستخدام
              </span>
            </p>
          </div>
        </div>

        <div
          className="hidden md:flex flex-col items-start text-right space-y-6 w-full max-w-[550px] md:justify-self-end md:-mr-26 relative"
          dir="rtl"
        >
          <Link
            to="/"
            className="absolute -top-6 right-0 flex flex-row items-center gap-3 select-none"
            dir="rtl"
          >
            <div className="bg-primary text-white font-bold p-1 rounded-2xl text-base flex items-center justify-center min-w-[46px] h-[46px] shadow-sm">
              CP
            </div>
            <div className="flex flex-col text-right">
              <h1 className="text-lg font-bold tracking-wide leading-none">
                CityPulse
              </h1>
              <p className="text-xs text-primary mt-1 font-medium">
                محافظة القاهرة
              </p>
            </div>
          </Link>

          <div className="space-y-2 w-full mt-36">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              بلاغك يصنع
              <br />
              <span className="text-primary inline-block mt-0.5">الفارق</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              انضم لمجتمع المواطنين الفاعلين وشارك في بناء محافظة القاهرة
              بالإبلاغ عن المشكلات واقتراح الحلول.
            </p>
          </div>

          <ul className="space-y-4 text-[15px] text-gray-200 font-medium w-full">
            <li className="flex items-center text-primary transition-all">
              <IconCheck />
              <span className="text-white mr-1">
                إبلاغ فوري بصورة وموقع GPS
              </span>
            </li>
            <li className="flex items-center text-primary transition-all">
              <IconCheck />
              <span className="text-white mr-1">
                متابعة حالة بلاغك أولاً بأول
              </span>
            </li>
            <li className="flex items-center text-primary transition-all">
              <IconCheck />
              <span className="text-white mr-1">إشعارات لحظية عند الحل</span>
            </li>
            <li className="flex items-center text-primary transition-all">
              <IconCheck />
              <span className="text-white mr-1">
                تقييم الخدمة وبناء سجل الأداء
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-3 gap-2.5 w-full pt-16">
            <div className="bg-[#12343a]/75 py-3 px-2 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                +١٢ ألف
              </p>
              <p className="text-[11px] text-gray-400 mt-1">مستخدم نشط</p>
            </div>
            <div className="bg-[#12343a]/75 p-3 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                ٨٩٪
              </p>
              <p className="text-[11px] text-gray-400 mt-1">نسبة الحل</p>
            </div>
            <div className="bg-[#12343a]/75 p-3 rounded-2xl text-center border border-white/10 shadow-sm backdrop-blur-md">
              <p className="text-2xl font-extrabold text-primary tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]">
                ٢.٤س
              </p>
              <p className="text-[11px] text-gray-400 mt-1">متوسط الاستجابة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

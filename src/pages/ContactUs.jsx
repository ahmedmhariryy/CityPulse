import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiClock,
  FiHeadphones,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSend,
  FiChevronDown,
} from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

import Navbar from "../components/common/Navbar";
import { contactAPI } from '../api/api';



const stats = [
  {
    value: "< 24 س",
    label: "وقت الرد",
  },
  {
    value: "24/7",
    label: "دعم إلكتروني",
  },
  {
    value: "7",
    label: "مراكز خدمة",
  },
  {
    value: "98%",
    label: "رضا المستخدمين",
  },
];

const contactCards = [
  {
    title: "المقر الرئيسي",
    lines: ["ميدان المحافظة، رمسيس", "محافظة القاهرة"],
    icon: FiMapPin,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    title: "الهاتف والواتساب",
    lines: ["048-0000000", "واتساب: 01273749157"],
    icon: FiPhone,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "البريد الإلكتروني",
    lines: ["info@citypulse.gov.eg", "support@citypulse.gov.eg"],
    icon: FiMail,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    title: "ساعات العمل",
    lines: ["الأحد - الخميس: 8 ص - 4 م", "الدعم الإلكتروني: 24/7"],
    icon: FiClock,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

const subjects = [
  { value: "", label: "اختر الموضوع..." },
  { value: "follow_report", label: "متابعة حالة بلاغ" },
  { value: "new_complaint", label: "استفسار عن بلاغ جديد" },
  { value: "technical_support", label: "دعم فني" },
  { value: "suggestion", label: "اقتراح أو ملاحظة" },
  { value: "other", label: "أخرى" },
];

const faqs = [
  {
    question: "كيف أتابع حالة البلاغ؟",
    answer:
      "بعد تسجيل الدخول، اذهب إلى لوحة التحكم وستجد جميع بلاغاتك مع حالتها الحالية ونسبة الإنجاز.",
  },
  {
    question: "ما الوقت المتوقع للرد على الاستفسارات؟",
    answer:
      "يتم الرد على الاستفسارات الإلكترونية خلال ٢٤ ساعة في أيام العمل الرسمية.",
  },
  {
    question: "هل يمكنني الإبلاغ بدون تسجيل حساب؟",
    answer:
      "التسجيل ضروري لتتبع البلاغات وإرسال إشعارات التحديث إليك، لكنه يستغرق أقل من دقيقة.",
  },
];

const socialLinks = [
  {
    label: "فيسبوك",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "تويتر",
    href: "#",
    icon: FaTwitter,
  },
  {
    label: "يوتيوب",
    href: "#",
    icon: FaYoutube,
  },
];

const initialFormState = {
  fullName: "",
  phone: "",
  subject: "",
  message: "",
};

function ContactInfoCard({ title, lines, icon: Icon, iconColor, iconBg }) {
    
  return (
    <article className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div dir="rtl" className="flex items-start justify-between gap-4">
        <div className="text-right">
          <h3 className="mb-2 text-lg font-black text-slate-900">{title}</h3>

          <div className="space-y-1">
            {lines.map((line) => (
              <p key={line} className="text-sm leading-6 text-slate-500">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="text-2xl" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

function FormField({ label, name, error, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-bold text-slate-700">
        {label}
        <span className="mr-1 text-red-500">*</span>
      </label>

      {children}

      {error && (
        <p className="text-sm font-semibold text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(2);
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-black text-slate-900">أسئلة شائعة</h2>

      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-right transition-colors duration-300 hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold text-slate-800 sm:text-base">
                  {item.question}
                </span>

                <FiChevronDown
                  className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-teal-600" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-7 text-slate-500">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      <button
        type="button"
        onClick={() => {
            navigate("/faq");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

        }}
        className="cursor-pointer mx-auto mt-5 block text-sm font-black text-teal-600 transition-colors duration-300 hover:text-teal-700"
      >
        عرض كل الأسئلة الشائعة
      </button>
    </section>
  );
}

function SocialButton({ label, href, icon: Icon }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/60"
      aria-label={label}
    >
      <Icon className="text-lg" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export default function ContactUs() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "من فضلك أدخل الاسم الكامل";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "من فضلك أدخل رقم الهاتف";
    } else if (!egyptianPhoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "من فضلك أدخل رقم هاتف مصري صحيح مثل 01xxxxxxxxx";
    }

    if (!formData.subject) {
      newErrors.subject = "من فضلك اختر موضوع الاستفسار";
    }

    if (!formData.message.trim()) {
      newErrors.message = "من فضلك اكتب رسالتك";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "الرسالة يجب أن تحتوي على 10 أحرف على الأقل";
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);
    await contactAPI.submitContact(formData);
    setErrors({});
    setSuccessMessage('تم إرسال رسالتك بنجاح، وسيتم التواصل معك قريباً.');
    setFormData(initialFormState);
  } catch (error) {
    setErrors({ general: 'فشل إرسال الرسالة، حاول مرة أخرى.' });
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <main dir="rtl" className="min-h-screen bg-slate-50 pt-16 text-slate-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-950">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-cyan-300 blur-3xl" />
          </div>

          <div
            dir="ltr"
            className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-20 lg:grid-cols-2 lg:py-24"
          >
            <div
              dir="rtl"
              className="order-2 grid grid-cols-2 gap-4 sm:max-w-sm lg:order-1"
            >
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 sm:p-6"
                >
                  <p className="text-3xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-bold text-teal-100">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>

            <div dir="rtl" className="order-1 text-right lg:order-2">
              <nav
                className="mb-8 flex items-center gap-2 text-sm font-bold text-teal-200"
                aria-label="Breadcrumb"
              >
                <Link
                  to="/"
                  className="transition-colors duration-300 hover:text-white"
                >
                  العودة للرئيسية
                </Link>
                <FiArrowLeft aria-hidden="true" />
              </nav>

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-bold text-teal-100 backdrop-blur-md">
                <FiHeadphones aria-hidden="true" />
                <span>نحن هنا لمساعدتك</span>
              </div>

              <h1 className="text-5xl font-black leading-tight text-white sm:text-6xl">
                تواصل <span className="text-cyan-300">معنا</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-slate-200">
                فريق دعم CityPulse جاهز للإجابة على استفساراتك ومساعدتك في أي
                وقت.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="border-b border-slate-100 bg-slate-50 py-12">
          <div
            dir="rtl"
            className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactCards.map((card) => (
              <ContactInfoCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-white py-16 lg:py-20">
          <div
            dir="ltr"
            className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.4fr]"
          >
            {/* Left Side */}
            <aside dir="rtl" className="space-y-8">
              {/* Map Section */}
              <section className="overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
                <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-slate-900 p-8 text-center">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

                  <div className="relative z-10">
                    <FiMapPin className="mx-auto mb-4 text-5xl text-teal-400" />
                    <h2 className="text-xl font-black text-white">
                      ميدان المحافظة، رمسيس
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-400">
                      القاهرة مصر
                    </p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <FAQAccordion />

              {/* Social Media Section */}
              <section className="rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 p-8 text-center shadow-sm">
                <h2 className="text-2xl font-black text-white">
                  تابعنا على السوشيال ميديا
                </h2>

                <p className="mt-2 text-sm font-medium text-teal-100">
                  آخر أخبار المحافظة والتحديثات
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  {socialLinks.map((link) => (
                    <SocialButton key={link.label} {...link} />
                  ))}
                </div>
              </section>
            </aside>

            {/* Contact Form */}
            <section dir="rtl">
              <div
                dir="ltr"
                className="mb-8 flex items-center justify-end gap-4"
              >
                <div className="text-right" dir="rtl">
                  <h2 className="text-3xl font-black text-slate-950">
                    أرسل رسالتك
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-400">
                    يصلنا استفسارك خلال ساعات
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-sm">
                  <FiMessageSquare className="text-2xl" aria-hidden="true" />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
              >
                {successMessage && (
                  <div
                    className="mb-6 rounded-2xl border border-teal-100 bg-teal-50 px-5 py-4 text-sm font-bold text-teal-700"
                    role="status"
                  >
                    {successMessage}
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="الاسم الكامل"
                    name="fullName"
                    error={errors.fullName}
                  >
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="أحمد أحمد أحمد"
                      autoComplete="name"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-right text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                    />
                  </FormField>

                  <FormField
                    label="رقم الهاتف"
                    name="phone"
                    error={errors.phone}
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01xxxxxxxxx"
                      autoComplete="tel"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-right text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                    />
                  </FormField>
                </div>

                <div className="mt-5">
                  <FormField
                    label="موضوع الاستفسار"
                    name="subject"
                    error={errors.subject}
                  >
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-right text-sm font-medium text-slate-800 outline-none transition-all duration-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="mt-5">
                  <FormField
                    label="رسالتك"
                    name="message"
                    error={errors.message}
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب استفسارك أو ملاحظتك بالتفصيل..."
                      rows="7"
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-4 text-right text-sm font-medium text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-300 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                    />
                  </FormField>
                </div>

                <button
                  type="submit"
                  className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-teal-600 px-6 py-4 text-base font-black text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-500/30"
                >
                  <FiSend className="text-xl" aria-hidden="true" />
                  إرسال الرسالة
                </button>
              </form>
            </section>
          </div>
        </section>
      </main>

      <footer
        dir="rtl"
        className="bg-slate-950 py-6 text-center text-sm text-slate-400"
      >
        © ٢٠٢٥ CityPulse — محافظة القليوبية. جميع الحقوق محفوظة.
      </footer>
    </>
  );
}
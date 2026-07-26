import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reportAPI } from "../api/api";

import StepIndicator from "../components/StepIndicator";
import Step1Location from "../components/Step1Location";
import Step2Details from "../components/Step2Details";
import Step3Review from "../components/Step3Review";

const ReportForm = ({ onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    locationType: "موقعي الحالي",
    locationText: "",
    lat: null,
    lng: null,
    district: "قليوب",
    customDistrict: "",
    category: "",
    severity: "",
    description: "",
    isRecurring: "",
    photos: [],
  nearHospital: false,  
  nearSchool: false,
  });

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 5),
    }));
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

 const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("severity", formData.severity);
      formDataToSend.append("isRecurring", formData.isRecurring);
      formDataToSend.append("location[lat]", formData.lat ?? "");
      formDataToSend.append("location[lng]", formData.lng ?? "");
      formDataToSend.append(
        "location[district]",
        formData.district === "__other__" 
          ? formData.customDistrict || "غير محدد"
          : formData.district
      );
      formDataToSend.append(
        "location[address]",
        formData.locationText || formData.resolvedAddress || "",
      );
      formDataToSend.append("nearHospital", formData.nearHospital || false);
      formDataToSend.append("nearSchool", formData.nearSchool || false);

      formData.photos.forEach((photo) => {
        formDataToSend.append("images", photo);
      });

      await reportAPI.createReport(formDataToSend);

      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ، حاول تاني");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        dir="rtl"
        className="min-h-screen font-main bg-slate-50 flex items-center justify-center p-4"
      >
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            تم الإرسال بنجاح
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            شكراً لك! تم استلام بلاغك وسيقوم الفريق المختص بمراجعته في أقرب وقت.
          </p>
          <button
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                navigate("/dashboard");
              }
            }}
            className="w-full py-3.5 bg-primary text-white font-black rounded-xl hover:bg-primary-dark transition-colors"
          >
            الذهاب إلى لوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-[1100] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
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
              className="w-5 h-5"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <div>
            <h1 className="font-black text-slate-900">تقديم بلاغ جديد</h1>
            <p className="text-xs text-slate-400">
              محافظة القاهرة — CityPulse
            </p>
          </div>
        </div>
        <StepIndicator step={step} />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        <div className="space-y-6">
          {step === 1 && (
            <Step1Location
              formData={formData}
              updateForm={updateForm}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <Step2Details
              formData={formData}
              updateForm={updateForm}
              onPhotoUpload={handlePhotoUpload}
              onRemovePhoto={removePhoto}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <Step3Review
              formData={formData}
              agreeToTerms={agreeToTerms}
              setAgreeToTerms={setAgreeToTerms}
              error={error}
              loading={loading}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </main>

      {!isSubmitted && (
        <div className="fixed bottom-0 right-0 left-0 bg-white border-t border-slate-100 px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
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
                className="w-4 h-4 text-primary"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              <span>
                البلاغات الدقيقة تُحل أسرع بنسبة{" "}
                <span className="font-black text-primary-dark">٤٠٪</span>
              </span>
            </div>
            <p className="text-xs font-black text-slate-400">
              الخطوة {step} من 3
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportForm;

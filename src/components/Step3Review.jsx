const Step3Review = ({
  formData,
  agreeToTerms,
  setAgreeToTerms,
  error,
  loading,
  onSubmit,
  onBack,
}) => {
  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1">رقم البلاغ المتوقع</p>
            <h2 className="font-black text-slate-800 text-lg">سيُحدَّد بعد الإرسال</h2>
          </div>
          <div className="bg-danger/10 text-danger px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5">
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
              className="w-3.5 h-3.5"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            {formData.severity || "غير محددة"}
          </div>
        </div>

        <div className="p-0">
          <div className="flex flex-col divide-y divide-slate-100">
            <Row label="الفئة" value={formData.category || "—"} />
            <Row
              label="الموقع"
              value={
                formData.locationText ||
                formData.resolvedAddress ||
                (formData.lat
                  ? `${formData.lat.toFixed(5)}, ${formData.lng.toFixed(5)}`
                  : "غير محدد")
              }
            />
            <Row label="المركز" value={formData.district} />
            <Row label="درجة الخطورة" value={formData.severity || "—"} highlight="danger" />
            <Row label="الصور المرفقة" value={`${formData.photos.length} صورة`} />
          </div>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-2xl p-4 mb-6">
        <div className="flex items-start gap-3">
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
            className="w-5 h-5 text-warning shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <div>
            <h3 className="text-sm font-black text-warning mb-1">تنبيه قبل الإرسال</h3>
            <p className="text-xs font-bold text-warning/80 leading-relaxed">
              ستتلقى رسالة نصية على رقمك عند قبول البلاغ وعند كل تحديث. البلاغات الكاذبة
              تعرض صاحبها للمساءلة القانونية وفقاً للتشريعات المصرية.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 mb-4">
          <p className="text-sm font-bold text-danger text-center">{error}</p>
        </div>
      )}

      <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors mb-6 group">
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
            agreeToTerms ? "bg-primary border-primary" : "bg-white border-slate-300 group-hover:border-primary"
          }`}
        >
          {agreeToTerms && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          className="hidden"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        />
        <span className="text-sm font-bold text-slate-700 select-none">
          أقرّ بصحة المعلومات وأوافق على شروط الاستخدام
        </span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="w-1/3 py-4 text-base font-black text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl transition-colors shadow-sm"
        >
          تعديل
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreeToTerms || loading}
          className="w-2/3 py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span>جاري الإرسال...</span>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" x2="11" y1="2" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              إرسال البلاغ
            </>
          )}
        </button>
      </div>
    </>
  );
};

const Row = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
    <span className="text-sm font-bold text-slate-500">{label}</span>
    <span
      className={`text-sm font-black ${
        highlight === "danger" ? "text-danger" : "text-slate-800"
      }`}
    >
      {value}
    </span>
  </div>
);

export default Step3Review;
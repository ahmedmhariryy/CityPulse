const StepIndicator = ({ step }) => (
  <div className="max-w-3xl mx-auto px-4 pb-4">
    <div className="flex items-center gap-2 mb-2">
      <div
        className={`flex items-center gap-1.5 text-xs font-black transition-colors ${
          step >= 1 ? "text-primary-dark" : "text-slate-400"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
            step >= 1
              ? "border-primary text-primary bg-white"
              : "border-slate-300 text-slate-400"
          }`}
        >
          1
        </div>
        <span className="hidden sm:inline">الموقع والفئة</span>
      </div>

      <div
        className={`flex-1 h-0.5 rounded transition-all ${
          step >= 2 ? "bg-primary" : "bg-slate-200"
        }`}
      ></div>

      <div
        className={`flex items-center gap-1.5 text-xs font-black transition-colors ${
          step >= 2 ? "text-primary-dark" : "text-slate-400"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
            step >= 2
              ? "border-primary text-primary bg-white"
              : "border-slate-300 text-slate-400"
          }`}
        >
          2
        </div>
        <span className="hidden sm:inline">التفاصيل والصور</span>
      </div>

      <div
        className={`flex-1 h-0.5 rounded transition-all ${
          step >= 3 ? "bg-primary" : "bg-slate-200"
        }`}
      ></div>

      <div
        className={`flex items-center gap-1.5 text-xs font-black transition-colors ${
          step >= 3 ? "text-primary-dark" : "text-slate-400"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
            step >= 3
              ? "border-primary text-primary bg-white"
              : "border-slate-300 text-slate-400"
          }`}
        >
          3
        </div>
        <span className="hidden sm:inline">المراجعة والإرسال</span>
      </div>
    </div>
  </div>
);

export default StepIndicator;
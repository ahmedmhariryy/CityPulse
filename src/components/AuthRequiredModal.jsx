
export default function AuthRequiredModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="relative bg-[#0c2438] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 cursor-pointer hover:text-white transition"
          aria-label="إغلاق"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="text-white text-lg font-semibold pt-2">
          لازم تسجل دخول الأول
        </h2>
        <p className="text-white/70 text-sm">
          عشان تقدر تعمل تقرير، محتاج يكون عندك حساب وتكون مسجل دخول.
        </p>
        <button
          onClick={onLogin}
          className="w-full bg-primary cursor-pointer text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
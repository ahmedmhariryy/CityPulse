import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    setIsOpen(false);
    logout();
  };

  return (
    <nav
      dir="rtl"
      className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 bg-primary-dark rounded-lg flex items-center justify-center text-white font-black text-lg">
            CP
          </div>
          <div className="leading-tight">
            <span className="font-black text-primary-darker text-lg block leading-none">
              CityPulse
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider">
              محافظة القاهرة
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick("features")}
            className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors cursor-pointer"
          >
            المميزات
          </button>
          <button
            onClick={() => {
              handleNavClick("testimonials")
              
            }}
            className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors cursor-pointer"
          >
            آراء المواطنين
          </button>
          <Link
            to="/faq"
            className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors"
            onClick={() => {window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });}}
          >
            الأسئلة الشائعة
          </Link>
          <Link
            to="/contact"
            className="text-sm font-bold text-slate-600 hover:text-primary-dark transition-colors"
          >
            تواصل معنا
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-black text-sm">
                  {user.firstName?.charAt(0) || "U"}
                </div>
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  ></div>
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl border border-slate-100 shadow-lg z-20 py-2">
                    <div className="px-4 py-3 border-b border-slate-50">
                      <p className="font-black text-slate-800 text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to={
                        user?.role === "admin"
                          ? "/admin-dashboard"
                          : "/dashboard"
                      }
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      لوحة التحكم
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
              >
                ابدأ الآن
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {user && (
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-black">
                {user.firstName?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-black text-slate-800 text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => handleNavClick("features")}
            className="block text-sm font-bold text-slate-700 py-1 w-full text-right"
          >
            المميزات
          </button>
          <button
            onClick={() => handleNavClick("testimonials")}
            className="block text-sm font-bold text-slate-700 py-1 w-full text-right"
          >
            آراء المواطنين
          </button>
          <Link
            to="/faq"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-slate-700 py-1"
          >
            الأسئلة الشائعة
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-slate-700 py-1"
          >
            تواصل معنا
          </Link>
          {user ? (
            <>
              <Link
                to={user?.role === "admin" ? "/admin-dashboard" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-bold text-teal-600 py-1"
              >
                لوحة التحكم
              </Link>
              <button
                onClick={handleLogout}
                className="block text-sm font-bold text-red-600 py-1 w-full text-right"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center py-2 text-sm font-bold text-primary-dark border border-primary/30 rounded-lg"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex-1 text-center py-2 text-sm font-bold text-white bg-primary rounded-lg"
              >
                ابدأ الآن
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

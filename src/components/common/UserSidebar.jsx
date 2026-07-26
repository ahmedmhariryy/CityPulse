import { FiX, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const UserSidebar = ({ user, activeView, setActiveView, mobileOpen, setMobileOpen, navLinks, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-100 flex flex-col
        transition-transform duration-300 shadow-2xl lg:shadow-none
        lg:relative lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div 
          className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => {
            setMobileOpen(false);
            navigate('/');
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-black text-sm">
              CP
            </div>
            <div>
              <h2 className="text-slate-900 font-black text-base leading-none">CityPulse</h2>
              <p className="text-teal-600 text-[10px] font-bold mt-1">محافظة القاهرة</p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(false);
            }} 
            className="lg:hidden text-slate-400"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-slate-200 border-2 border-teal-100 flex items-center justify-center text-slate-500 font-black text-lg">
                {user?.firstName?.[0] || '؟'}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="font-black text-slate-800 text-sm">
                {user ? `${user.firstName} ${user.lastName}` : 'جاري التحميل...'}
              </p>
              <p className="text-xs text-teal-600 font-bold">مواطن نشط</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-3">
          {navLinks.map(link => {
            const active = activeView === link.key;
            const Icon = link.icon;
            return (
              <button
                key={link.key}
                onClick={() => { setActiveView(link.key); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-right ${
                  active ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {link.label}
                {link.badge && (
                  <span className={`mr-auto text-[10px] font-black px-2 py-0.5 rounded-md ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 shrink-0">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={onLogout}
          >
            <FiLogOut className="text-lg" />
            تسجيل الخروج
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
import BarChartIcon from "@mui/icons-material/BarChart";
import ArticleIcon from "@mui/icons-material/Article";
import MapIcon from "@mui/icons-material/Map";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail"
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';

const navItems = [
  { icon: <DashboardIcon />, label: "نظرة عامة", path: "/admin-dashboard" },
  { icon: <ArticleIcon />, label: "إدارة البلاغات", path: "/admin-dashboard/reports" },
  { icon: <PeopleIcon />, label: "المستخدمين", path: "/admin-dashboard/users" }, 
  { icon: <AccountTreeIcon />, label: "تجميع البلاغات", path: "/admin-dashboard/clustering" },
  { icon: <MapIcon />, label: "الخريطة الحية", path: "/admin-dashboard/map" },
  { icon: <BarChartIcon />, label: "التحليلات", path: "/admin-dashboard/analytics" },
  { icon: <MailIcon />, label: "الرسائل", path: "/admin-dashboard/contacts" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const getFullName = () => {
    if (!user) return 'أدمن';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName || user.lastName || 'أدمن';
  };

  const getRole = () => {
    if (!user) return 'مدير غرفة العمليات';
    if (user.role === 'admin') return 'مدير النظام';
    return 'مدير غرفة العمليات';
  };

  const getInitials = () => {
    if (!user) return 'أ';
    if (user.firstName) return user.firstName.charAt(0);
    if (user.lastName) return user.lastName.charAt(0);
    return 'أ';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        dir="rtl"
        className={`
          fixed lg:static inset-y-0 right-0 z-30
          bg-gray-900 text-white flex flex-col h-screen shrink-0
          transition-transform duration-300 w-64 lg:pt-0 pt-[72px]
          ${isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        <div 
          className="p-3 sm:p-4 border-b border-gray-700 flex items-center justify-between shrink-0 cursor-pointer hover:bg-gray-800 transition-colors"
          onClick={() => {
            setIsOpen(false);
            navigate('/');
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-lg text-white shrink-0"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              C
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm whitespace-nowrap">نبض المدينة</div>
              <div className="text-xs text-gray-400 whitespace-nowrap">لوحة القيادة</div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="text-gray-400 hover:text-white transition lg:hidden shrink-0"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <nav className="flex-1 p-2 sm:p-3 space-y-1 overflow-y-auto ">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <Avatar 
              src={user?.avatar} 
              alt={getFullName()}
              sx={{ 
                width: 40, 
                height: 40,
                bgcolor: 'var(--color-primary)',
                fontSize: '1rem'
              }}
            >
              {getInitials()}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap truncate">
                {getFullName()}
              </div>
              <div className="text-xs text-gray-400 whitespace-nowrap truncate">
                {getRole()}
              </div>
            </div>
          </div>
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg cursor-pointer transition-all
                ${location.pathname === item.path
                    ? "text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              style={
                location.pathname === item.path
                  ? { backgroundColor: "var(--color-primary)" }
                  : {}
              }
            >
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm min-w-0">
                <span className="shrink-0 text-lg sm:text-xl">{item.icon}</span>
                <span className="whitespace-nowrap truncate">{item.label}</span>
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 sm:p-4 border-t border-gray-700 shrink-0 space-y-3">
          

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
          >
            <LogoutIcon fontSize="small" />
            تسجيل الخروج
          </button>
        </div>
      </div>
    </>
  );
}
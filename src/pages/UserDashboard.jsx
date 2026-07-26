import { useState, useEffect } from "react";
import {
  FiGrid,
  FiFileText,
  FiMenu,
  FiPlus,
  FiMapPin,
  FiChevronLeft,
  FiSearch,
  FiImage,
  FiSettings,
} from "react-icons/fi";
import ReportForm from "./ReportForm";
import { useAuth } from "../context/useAuth";
import { reportAPI } from "../api/api";
import { mapReportForDisplay } from "../utils/reportDisplay";
import Settings from "../components/common/Settings";
import UserSidebar from "../components/common/UserSidebar";
import ReportDetail from "./ReportDetail";

const STATUS_STYLES = {
  processing: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
  },
  open: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    bar: "bg-slate-300",
  },
  resolved: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  assigned: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
};

const ReportRowSkeleton = () => (
  <div className="p-4 animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-xl bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-1/3" />
        <div className="h-2 bg-slate-100 rounded-full w-1/2" />
        <div className="h-1.5 bg-slate-100 rounded-full w-full" />
      </div>
    </div>
  </div>
);

const ReportRow = ({ report, onViewDetail }) => {
  const style = STATUS_STYLES[report.statusType] || STATUS_STYLES.open;

  return (
    <div
      className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
      onClick={() => {
    
        onViewDetail(report.rawId);
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
          {report.image ? (
            <img
              src={report.image}
              alt={report.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <FiImage className="w-5 h-5 text-slate-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="min-w-0">
              <span className="text-xs text-slate-400 font-black ml-1">
                {report.id}
              </span>
              <p className="font-black text-base text-slate-800 truncate">
                {report.title}
              </p>
            </div>
            <span
              className={`shrink-0 flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
              {report.status}
            </span>
          </div>

          <p className="text-sm text-slate-400 flex items-center gap-1 mb-2">
            <FiMapPin className="w-3 h-3" />
            {report.address}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${style.bar}`}
                style={{ width: `${report.progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-black text-slate-500 shrink-0">
              {report.progress}٪
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHeader = ({ setActiveView, user, stats }) => {
  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            أهلاً، {user?.firstName || "..."}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{today}</p>
        </div>
        <button
          onClick={() => setActiveView("new-report")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-black text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-sm"
        >
          <FiPlus className="w-4 h-4" />
          بلاغ جديد
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900 mb-1">
            {stats.total}
          </p>
          <p className="text-sm font-bold text-slate-500">إجمالي بلاغاتي</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900 mb-1">
            {stats.resolved}
          </p>
          <p className="text-sm font-bold text-slate-500">تم حلها</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm text-center">
          <p className="text-3xl font-black text-slate-900 mb-1">
            {stats.inProgress}
          </p>
          <p className="text-sm font-bold text-slate-500">قيد المعالجة</p>
        </div>
      </div>
    </div>
  );
};

const DashboardContent = ({
  setActiveView,
  reports,
  loading,
  onViewDetail,
}) => (
  <div className="space-y-6 pt-2">
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between">
        <h2 className="font-black text-slate-800 text-base">بلاغاتي الأخيرة</h2>
        <button
          onClick={() => setActiveView("reports")}
          className="text-xs font-black text-teal-600 hover:text-teal-700 flex items-center gap-1"
        >
          عرض الكل
          <FiChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="divide-y divide-slate-50">
        {loading ? (
          <>
            <ReportRowSkeleton />
            <ReportRowSkeleton />
            <ReportRowSkeleton />
          </>
        ) : reports.length > 0 ? (
          reports
            .slice(0, 5)
            .map((report) => (
              <ReportRow
                key={report.rawId}
                report={report}
                onViewDetail={onViewDetail}
              />
            ))
        ) : (
          <div className="text-center py-10 text-slate-500 font-bold">
            لا توجد بلاغات بعد — ابدأ بإرسال أول بلاغ
          </div>
        )}
      </div>
    </div>

    <div className="mt-4">
      <button
        onClick={() => setActiveView("new-report")}
        className="block bg-teal-600 hover:bg-teal-700 text-white rounded-2xl p-5 text-right transition-colors shadow-sm w-full"
      >
        <FiPlus className="w-6 h-6 mb-2" />
        <p className="font-black text-base">بلاغ جديد</p>
        <p className="text-teal-200 text-xs mt-0.5">سجّل مشكلة في منطقتك</p>
      </button>
    </div>
  </div>
);

const ReportsView = ({ reports, loading, onViewDetail }) => {
  const [search, setSearch] = useState("");
  const filtered = reports.filter(
    (r) =>
      r.title.includes(search) ||
      r.address.includes(search) ||
      r.id.includes(search),
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-xl font-black text-slate-900">سجل البلاغات</h2>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5">
        <FiSearch className="text-slate-400" />
        <input
          type="text"
          placeholder="ابحث في البلاغات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-slate-800 text-sm w-full font-semibold"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {loading ? (
            <>
              <ReportRowSkeleton />
              <ReportRowSkeleton />
              <ReportRowSkeleton />
            </>
          ) : filtered.length > 0 ? (
            filtered.map((report) => (
              <ReportRow
                key={report.rawId}
                report={report}
                onViewDetail={onViewDetail}
              />
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 font-bold">
              لا توجد بلاغات مطابقة
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await reportAPI.getMyReports();
      const mapped = response.data.data.map(mapReportForDisplay);
      setReports(mapped);
    } catch (err) {
      setError("تعذر تحميل البلاغات، حاول تاني");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReportCreated = () => {
    setActiveView("dashboard");
    fetchReports();
  };

  const handleViewDetail = (reportId) => {
    setSelectedReportId(reportId);
    setActiveView("report-detail");
  };

  const handleBackFromDetail = () => {
    setActiveView("reports");
    setSelectedReportId(null);
    fetchReports();
  };

  const stats = {
    total: reports.length,
    resolved: reports.filter((r) => r.statusType === "resolved").length,
    inProgress: reports.filter(
      (r) => r.statusType === "processing" || r.statusType === "assigned",
    ).length,
  };

  const navLinks = [
    { key: "dashboard", label: "لوحتي", icon: FiGrid, badge: null },
    {
      key: "reports",
      label: "بلاغاتي",
      icon: FiFileText,
      badge: reports.length ? String(reports.length) : null,
    },
    { key: "settings", label: "الإعدادات", icon: FiSettings, badge: null },
  ];

  if (activeView === "new-report") {
    return (
      <div
        className="h-screen overflow-y-auto bg-[#f8fafc]"
        dir="rtl"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <ReportForm onBack={handleReportCreated} />
      </div>
    );
  }

  if (activeView === "report-detail" && selectedReportId) {
    return (
      <div
        className="h-screen flex overflow-hidden bg-[#F8FAFC]"
        dir="rtl"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        <UserSidebar
          user={user}
          activeView="reports"
          setActiveView={setActiveView}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navLinks={navLinks}
          onLogout={logout}
        />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center shrink-0 lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-slate-600 p-1"
            >
              <FiMenu className="text-xl" />
            </button>
            <span className="text-slate-900 font-black text-sm mr-3">
              CityPulse
            </span>
          </header>
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <ReportDetail
              id={selectedReportId}
              onBack={handleBackFromDetail}
              isAdmin={false}
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen flex overflow-hidden bg-[#f8fafc]"
      dir="rtl"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <UserSidebar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navLinks={navLinks}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="lg:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-600 p-1"
          >
            <FiMenu className="text-xl" />
          </button>
          <span className="text-slate-900 font-black text-sm">CityPulse</span>
          <div className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-black text-xs">
            {user?.firstName || "..."}
          </div>
        </header>

        {activeView === "dashboard" && (
          <div className="bg-[#f8fafc] px-4 md:px-8 pt-4 md:pt-8 pb-4 shrink-0">
            <DashboardHeader
              setActiveView={setActiveView}
              user={user}
              stats={stats}
            />
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div
            className={`w-full ${activeView === "dashboard" ? "px-4 md:px-8 pb-8" : "p-4 md:p-8"}`}
          >
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl p-4 mb-4 text-center">
                {error}
              </div>
            )}
            {activeView === "dashboard" && (
              <DashboardContent
                setActiveView={setActiveView}
                reports={reports}
                loading={loading}
                onViewDetail={handleViewDetail}
              />
            )}
            {activeView === "reports" && (
              <ReportsView
                reports={reports}
                loading={loading}
                onViewDetail={handleViewDetail}
              />
            )}
            {activeView === "settings" && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEye,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiChevronRight,
  FiChevronLeft,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import { adminAPI } from "../../api/api";

const STATUS_LABELS = {
  Open: "مفتوح",
  Assigned: "تم التعيين",
  "In Progress": "قيد التنفيذ",
  Fixed: "تم الإصلاح",
  Closed: "تم الإغلاق",
};

const STATUS_COLORS = {
  Open: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  Assigned: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "In Progress": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  Fixed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Closed: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
};

const CATEGORY_COLORS = {
  "طرق وأرصفة": { bg: "#FEF3C7", color: "#D97706" },
  "مياه وصرف": { bg: "#DBEAFE", color: "#2563EB" },
  "كهرباء وإنارة": { bg: "#FEF2F2", color: "#DC2626" },
  "نظافة وتجميل": { bg: "#D1FAE5", color: "#059669" },
  "بنية تحتية": { bg: "#E0E7FF", color: "#4F46E5" },
  "مخاطر أخرى": { bg: "#F3F4F6", color: "#6B7280" },
};

const PRIORITY_LABELS = {
  "عالية / طارئ": { label: "عاجل", color: "text-red-600", bg: "bg-red-50" },
  متوسطة: { label: "هام", color: "text-amber-600", bg: "bg-amber-50" },
  منخفضة: { label: "عادي", color: "text-slate-600", bg: "bg-slate-50" },
};

const DEPARTMENTS = [
  "إدارة الطرق",
  "إدارة النظافة",
  "إدارة الكهرباء",
  "إدارة المياه والصرف",
  "إدارة الحدائق",
  "إدارة المباني",
  "الدفاع المدني",
  "الشرطة",
];

const STATUS_OPTIONS = ["Open", "Assigned", "In Progress", "Fixed", "Closed"];
const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50];

export default function AdminReports() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedToFilter, setAssignedToFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [showDropdown, setShowDropdown] = useState(null);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [updating, setUpdating] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ open: false, reportId: null, reportNumber: '' });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (buttonRef.current && buttonRef.current.contains(event.target)) return;
        setShowDropdown(null);
        setShowDepartmentDropdown({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const filters = { page, limit };
      if (statusFilter) filters.status = statusFilter;
      if (categoryFilter) filters.category = categoryFilter;
      if (priorityFilter) filters.severity = priorityFilter;

      const response = await adminAPI.getAllReports(filters);
      const data = response.data;
      let reportsList = data.data || [];

      if (search) {
        const s = search.toLowerCase();
        reportsList = reportsList.filter(r =>
          (r.reportNumber && r.reportNumber.toLowerCase().includes(s)) ||
          (r.description && r.description.toLowerCase().includes(s)) ||
          (r.location?.district && r.location.district.toLowerCase().includes(s)) ||
          (r.location?.address && r.location.address.toLowerCase().includes(s))
        );
      }

      if (assignedToFilter && assignedToFilter !== "الكل") {
        reportsList = reportsList.filter(r => r.assignedTo === assignedToFilter);
      }

      setReports(reportsList);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || reportsList.length);

      const allReports = data.data || [];
      setStats({
        total: data.pagination?.total || allReports.length,
        open: allReports.filter(r => r.status === "Open").length,
        inProgress: allReports.filter(r => r.status === "Assigned" || r.status === "In Progress").length,
        closed: allReports.filter(r => r.status === "Fixed" || r.status === "Closed").length,
      });
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("تعذر تحميل البلاغات");
    } finally {
      setLoading(false);
    }
  }, [page, limit, statusFilter, categoryFilter, priorityFilter, search, assignedToFilter]);

  useEffect(() => { fetchReports(); }, [fetchReports]);

  const handleStatusChange = async (reportId, newStatus, assignedTo = null) => {
    try {
      setUpdating(true);
      if (newStatus === "Assigned" && assignedTo) {
        await adminAPI.assignReport(reportId, assignedTo, `تم التعيين إلى ${assignedTo}`);
      } else {
        await adminAPI.updateReportStatus(reportId, newStatus, `تم تغيير الحالة إلى ${STATUS_LABELS[newStatus]}`);
      }
      setShowDropdown(null);
      setShowDepartmentDropdown({});
      fetchReports();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDepartmentSelect = (reportId, dept) => {
    setSelectedDepartment({ ...selectedDepartment, [reportId]: dept });
    setShowDepartmentDropdown({});
    handleStatusChange(reportId, "Assigned", dept);
  };

  const openDeleteModal = (reportId, reportNumber) => {
    setDeleteModal({ open: true, reportId, reportNumber });
  };

  const confirmDelete = async () => {
    try {
      await adminAPI.deleteReport(deleteModal.reportId);
      setDeleteModal({ open: false, reportId: null, reportNumber: '' });
      fetchReports();
    } catch (err) {
      alert(err.response?.data?.message || 'فشل حذف البلاغ');
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setPriorityFilter("");
    setAssignedToFilter("");
    setPage(1);
  };

  const handleExport = () => {
    try {
      if (reports.length === 0) { alert('لا توجد بيانات للتصدير'); return; }
      const exportData = reports.map(r => ({
        'رقم البلاغ': r.reportNumber || r._id?.slice(-6),
        'التاريخ': new Date(r.createdAt).toLocaleDateString('ar-EG'),
        'الفئة': r.category,
        'المنطقة': r.location?.district || r.location?.address || '—',
        'الأولوية': PRIORITY_LABELS[r.severity]?.label || r.severity,
        'درجة الخطورة': r.priorityScore || 0,
        'الجهة': r.assignedTo || '—',
        'الحالة': STATUS_LABELS[r.status] || r.status,
        'الوصف': r.description?.substring(0, 150) || '',
        'متكررة': r.isRecurring || '—',
        'قريب من مستشفى': r.nearHospital ? 'نعم' : 'لا',
        'قريب من مدرسة': r.nearSchool ? 'نعم' : 'لا',
      }));
      const headers = Object.keys(exportData[0]);
      const rows = exportData.map(row =>
        headers.map(header => {
          const value = String(row[header] || '');
          if (value.includes(',') || value.includes('"') || value.includes('\n')) return `"${value.replace(/"/g, '""')}"`;
          return value;
        }).join(',')
      );
      const csvContent = [headers.join(','), ...rows].join('\n');
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const now = new Date();
      link.download = `تقرير_البلاغات_${now.toLocaleDateString('ar-EG').replace(/\//g, '-')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('فشل تصدير البيانات');
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6" dir="rtl">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">إدارة البلاغات</h1>
            <p className="text-sm text-slate-500 mt-1">عرض وإدارة جميع بلاغات المواطنين</p>
          </div>
          <button onClick={handleExport} className="cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors shadow-sm">
            <FiDownload /> تصدير التقرير
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-slate-900">{stats.total}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">إجمالي البلاغات</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-blue-600">{stats.open}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">مفتوحة</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-amber-600">{stats.inProgress}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">قيد المعالجة</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-emerald-600">{stats.closed}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">مغلقة</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-teal-600">{stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%</p>
            <p className="text-xs font-bold text-slate-500 mt-1">نسبة الإنجاز</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute right-3 top-3 text-slate-400" />
              <input type="text" placeholder="بحث برقم البلاغ، المنطقة، الوصف..." value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500 transition" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors ${showFilters ? "bg-teal-50 border-teal-200 text-teal-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              <FiFilter className="w-4 h-4" /> تصفية
            </button>
            <button onClick={fetchReports} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold transition-colors">
              <FiRefreshCw className="w-4 h-4" /> تحديث
            </button>
            <button onClick={resetFilters} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-sm font-bold transition-colors">
              <FiX className="w-4 h-4" /> إعادة تعيين
            </button>
          </div>
          {showFilters && (
            <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-50 pt-4">
              <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="">كل الحالات</option>
                {Object.entries(STATUS_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
              <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="">كل الفئات</option>
                {Object.keys(CATEGORY_COLORS).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <select value={priorityFilter} onChange={e => { setPriorityFilter(e.target.value); setPage(1); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="">كل الأولويات</option>
                {Object.keys(PRIORITY_LABELS).map(p => <option key={p} value={p}>{PRIORITY_LABELS[p].label}</option>)}
              </select>
              <select value={assignedToFilter} onChange={e => { setAssignedToFilter(e.target.value); setPage(1); }} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500">
                <option value="">كل الجهات</option>
                {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl p-4 flex items-center gap-2">
            <FiAlertCircle /> {error}
          </div>
        )}

        {updating && (
          <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
              <span className="text-sm text-gray-700 font-bold">جاري التحديث...</span>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-right border-collapse" dir="rtl">
              <thead className="bg-slate-50">
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="py-3 px-3 font-bold whitespace-nowrap">رقم البلاغ</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">التاريخ</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">الفئة</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap hidden md:table-cell">المنطقة</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">الأولوية</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap hidden lg:table-cell">الجهة</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">الحالة</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap w-10">عرض</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap w-10">حذف</th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap w-10">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={10} className="py-16 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div></td></tr>
                ) : reports.length === 0 ? (
                  <tr><td colSpan={10} className="py-16 text-center text-slate-400 font-bold">لا توجد بلاغات</td></tr>
                ) : (
                  reports.map((r) => {
                    const status = STATUS_COLORS[r.status] || STATUS_COLORS["Open"];
                    const category = CATEGORY_COLORS[r.category] || { bg: "#F3F4F6", color: "#6B7280" };
                    const priority = PRIORITY_LABELS[r.severity] || PRIORITY_LABELS["منخفضة"];
                    return (
                      <tr key={r._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-600 whitespace-nowrap">{r.reportNumber || r._id?.slice(-6)}</td>
                        <td className="py-3 px-3 text-slate-500 text-xs whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString("ar-EG")}</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ backgroundColor: category.bg, color: category.color }}>{r.category}</span></td>
                        <td className="py-3 px-3 text-slate-600 text-xs hidden md:table-cell whitespace-nowrap">{r.location?.district || r.location?.address || "—"}</td>
                        <td className="py-3 px-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold whitespace-nowrap ${priority.bg} ${priority.color}`}>{priority.label}{r.priorityScore ? <span className="text-[10px] opacity-70">{r.priorityScore}</span> : null}</span></td>
                        <td className="py-3 px-3 text-slate-500 text-xs hidden lg:table-cell whitespace-nowrap">{r.assignedTo || selectedDepartment[r._id] || "—"}</td>
                        <td className="py-3 px-3"><span className={`flex items-center gap-1.5 text-xs font-bold ${status.text}`}><span className={`w-2 h-2 rounded-full ${status.dot}`}></span>{STATUS_LABELS[r.status] || r.status}</span></td>
                        <td className="py-3 px-3"><button onClick={() => navigate(`/admin-dashboard/reports/${r._id}`)} className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-1.5 rounded-lg transition-colors" title="عرض التفاصيل"><FiEye className="w-4 h-4" /></button></td>
                        <td className="py-3 px-3"><button onClick={() => openDeleteModal(r._id, r.reportNumber || r._id?.slice(-6))} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors" title="حذف البلاغ"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></td>
                        <td className="py-3 px-2">
                          <div className="relative">
                            <button ref={buttonRef} onClick={(e) => { e.stopPropagation(); setShowDropdown(showDropdown === r._id ? null : r._id); setShowDepartmentDropdown({}); }} className="text-gray-400 hover:text-gray-600 transition p-1">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                            {showDropdown === r._id && (
                              <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10" onClick={(e) => e.stopPropagation()}>
                                {STATUS_OPTIONS.map((opt) => (
                                  <div key={opt}>
                                    {opt === "Assigned" ? (
                                      <div>
                                        <button onClick={(e) => { e.stopPropagation(); setShowDepartmentDropdown({ ...showDepartmentDropdown, [r._id]: !showDepartmentDropdown[r._id] }); }} className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 transition text-gray-700">{STATUS_LABELS[opt]} <span className="text-xs text-gray-400 mr-2">▼</span></button>
                                        {showDepartmentDropdown[r._id] && (
                                          <div className="border-t border-gray-100">
                                            {DEPARTMENTS.map((dept) => (
                                              <button key={dept} onClick={(e) => { e.stopPropagation(); handleDepartmentSelect(r._id, dept); }} className="block w-full text-right px-6 py-2 text-sm hover:bg-gray-100 text-gray-600">{dept}</button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <button onClick={(e) => { e.stopPropagation(); handleStatusChange(r._id, opt); }} className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 transition ${r.status === opt ? "bg-gray-100 text-teal-600 font-bold" : "text-gray-700"}`}>{STATUS_LABELS[opt]}</button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {total > 0 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3 " dir="ltr">
              <div className="flex items-center gap-2" dir="rtl">
                <span className="text-sm text-slate-500 font-bold">عرض</span>
                <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1); }} className="border border-slate-200 rounded-lg px-2 py-1 text-sm text-slate-700">
                  {ITEMS_PER_PAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="text-sm text-slate-500 font-bold">من {total}</span>
              </div>
              <div className="flex items-center gap-1" dir="rtl">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 transition"><FiChevronRight className="w-4 h-4" /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1).map((p, i, arr) => (
                  <span key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-slate-400">...</span>}
                    <button onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm font-bold transition ${page === p ? "bg-teal-600 text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-600"}`}>{p}</button>
                  </span>
                ))}
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:bg-slate-50 transition"><FiChevronLeft className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteModal({ open: false, reportId: null, reportNumber: '' })}></div>
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center animate-in fade-in duration-200" dir="rtl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">تأكيد الحذف</h3>
              <p className="text-slate-500 font-medium mb-2">هل أنت متأكد من حذف البلاغ رقم</p>
              <p className="text-lg font-black text-red-600 mb-6">{deleteModal.reportNumber}</p>
              <p className="text-xs text-slate-400 font-medium mb-6">لا يمكن التراجع عن هذا الإجراء بعد الحذف</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteModal({ open: false, reportId: null, reportNumber: '' })} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">إلغاء</button>
                <button onClick={confirmDelete} className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  تأكيد الحذف
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
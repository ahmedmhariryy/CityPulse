import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiMapPin,
  FiCalendar,
  FiAlertTriangle,
  FiClock,
  FiUser,
  FiTrash2,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { reportAPI, adminAPI } from "../api/api";
import { useAuth } from "../context/useAuth";
import UserSidebar from "../components/common/UserSidebar";

const STATUS_LABELS = {
  Open: "مفتوح",
  Assigned: "تم التعيين",
  "In Progress": "قيد التنفيذ",
  Fixed: "تم الإصلاح",
  Closed: "تم الإغلاق",
};

const STATUS_COLORS = {
  Open: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  Assigned: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "In Progress": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Fixed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Closed: { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

const SEVERITY_LABELS = {
  "عالية / طارئ": { label: "عاجل", color: "text-red-600", bg: "bg-red-50" },
  متوسطة: { label: "هام", color: "text-amber-600", bg: "bg-amber-50" },
  منخفضة: { label: "عادي", color: "text-slate-600", bg: "bg-slate-50" },
};

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (imageUrl) => {
    if (!imageUrl) return;
    try {
      setDownloading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename =
        imageUrl.split("/").pop().split("?")[0] || "صورة-بلاغ.jpg";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(imageUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < images.length; i++) {
      await handleDownload(images[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-slate-100 rounded-2xl p-12 text-center">
        <p className="text-slate-400 font-bold text-sm">لا توجد صور مرفقة</p>
      </div>
    );
  }

  const prev = () =>
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  const next = () =>
    setCurrent(current === images.length - 1 ? 0 : current + 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="relative bg-slate-900">
        <img
          src={images[current]}
          alt={`صورة ${current + 1}`}
          className="w-full h-48 sm:h-80 object-contain bg-slate-900"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <FiChevronRight className="text-slate-700" />
            </button>
            <button
              onClick={next}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <FiChevronLeft className="text-slate-700" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white w-4" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
        <div className="absolute top-3 left-3">
          <button
            onClick={() => handleDownload(images[current])}
            disabled={downloading}
            className="w-9 h-9 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow"
            title="تحميل الصورة"
          >
            {downloading ? (
              <svg
                className="animate-spin w-4 h-4 text-slate-700"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 bg-white flex items-center justify-between">
        <span className="text-sm font-bold text-slate-500">
          {current + 1} / {images.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload(images[current])}
            disabled={downloading}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-bold text-sm disabled:opacity-50"
          >
            تحميل الصورة الحالية
          </button>
          {images.length > 1 && (
            <button
              onClick={handleDownloadAll}
              disabled={downloading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm disabled:opacity-50"
            >
              تحميل الكل ({images.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusTimeline = ({ statusHistory }) => {
  if (!statusHistory || statusHistory.length === 0) return null;

  const translateNote = (note) => {
    if (!note) return "";
    return note
      .replace("تم تغيير الحالة إلى Open", "تم فتح البلاغ")
      .replace("تم تغيير الحالة إلى Assigned", "تم تعيين البلاغ لجهة مختصة")
      .replace("تم تغيير الحالة إلى In Progress", "بدء العمل على البلاغ")
      .replace("تم تغيير الحالة إلى Fixed", "تم إصلاح المشكلة")
      .replace("تم تغيير الحالة إلى Closed", "تم إغلاق البلاغ")
      .replace("تم إنشاء البلاغ", "تم إنشاء البلاغ");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2">
        <FiClock className="text-slate-400" />
        سجل تغييرات الحالة
      </h3>
      <div className="space-y-0">
        {[...statusHistory].reverse().map((entry, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full border-2 border-white ${index === 0 ? "bg-teal-500" : "bg-slate-300"}`}
              />
              {index < statusHistory.length - 1 && (
                <div className="w-0.5 h-full bg-slate-200 my-1" />
              )}
            </div>
            <div
              className={`pb-6 ${index === statusHistory.length - 1 ? "pb-0" : ""}`}
            >
              <p className="font-bold text-slate-800 text-sm">
                {STATUS_LABELS[entry.status] || entry.status}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {translateNote(entry.note)}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(entry.changedAt).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingStars = ({ rating, onSubmit }) => {
  const [hover, setHover] = useState(0);
  const [selectedScore, setSelectedScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const alreadyRated = !!rating?.score || submitted;

  const handleSubmit = async () => {
    if (!selectedScore) return;
    try {
      setLoading(true);
      await onSubmit(selectedScore, feedback);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2">
        <FiStar className="text-amber-400" />
        {alreadyRated ? "تقييم الخدمة" : "قيّم الخدمة"}
      </h3>

      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            disabled={alreadyRated}
            onMouseEnter={() => !alreadyRated && setHover(star)}
            onMouseLeave={() => !alreadyRated && setHover(0)}
            onClick={() => !alreadyRated && setSelectedScore(star)}
            className={`transition-all ${alreadyRated ? "cursor-default" : "cursor-pointer"}`}
          >
            <FiStar
              className={`w-8 h-8 transition-all ${
                star <= (hover || selectedScore || rating?.score || 0)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              }`}
            />
          </button>
        ))}
        {alreadyRated && (
          <span className="text-slate-500 text-sm font-bold mr-2">
            {rating?.score || selectedScore}/5
          </span>
        )}
      </div>

      {!alreadyRated && (
        <>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="أضف تعليقك (اختياري)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:border-teal-500 mb-3 resize-none"
            rows="2"
          />
          <button
            onClick={handleSubmit}
            disabled={!selectedScore || loading}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
        </>
      )}

      {alreadyRated && rating?.comment && (
        <p className="text-slate-500 text-sm font-medium mt-2">
          "{rating.comment}"
        </p>
      )}
    </div>
  );
};

export default function ReportDetail({
  id: propId,
  onBack: propOnBack,
  isAdmin: propIsAdmin,
}) {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const id = propId || paramId;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchReport = async () => {
    if (!id || user === undefined) return;
    const adminMode = propIsAdmin ?? user?.role === "admin";
    try {
      setLoading(true);
      setError("");
      let response;
      if (adminMode) {
        response = await adminAPI.getReportDetails(id);
      } else {
        response = await reportAPI.getReportById(id);
      }
      setReport(response.data.data);
    } catch (err) {
      setError("تعذر تحميل تفاصيل البلاغ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id, user]);

  const isAdmin = propIsAdmin ?? user?.role === "admin";

  const handleBack = () => {
    if (propOnBack) propOnBack();
    else navigate(-1);
  };

  const handleDelete = async () => {
    if (!window.confirm("هل أنت متأكد من حذف هذا البلاغ؟")) return;
    try {
      setDeleteLoading(true);
      if (isAdmin) await adminAPI.deleteReport(id);
      else await reportAPI.deleteReport(id);
      handleBack();
    } catch (err) {
      alert(err.response?.data?.message || "فشل حذف البلاغ");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRating = async (score, comment) => {
    await reportAPI.rateReport(id, score, comment);
    fetchReport();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center p-8 py-16">
        <FiAlertTriangle className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-500 font-bold text-lg mb-4">
          {error || "البلاغ غير موجود"}
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
        >
          العودة للخلف
        </button>
      </div>
    );
  }

  const statusStyle = STATUS_COLORS[report.status] || STATUS_COLORS["Open"];
  const severityStyle =
    SEVERITY_LABELS[report.severity] || SEVERITY_LABELS["منخفضة"];

  const content = (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-600 hover:text-teal-600 font-bold text-sm"
      >
        <FiArrowRight /> رجوع
      </button>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            بلاغ #{report.reportNumber || report._id?.slice(-6)}
          </h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5" />
            {new Date(report.createdAt).toLocaleDateString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <span
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-black ${statusStyle.bg} ${statusStyle.text}`}
        >
          <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></span>
          {STATUS_LABELS[report.status] || report.status}
        </span>
      </div>

      <ImageSlider images={report.images} />

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="font-black text-slate-800 mb-3">وصف المشكلة</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {report.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">الفئة</span>
            <span className="text-slate-800 font-black text-sm">
              {report.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">الأولوية</span>
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-black ${severityStyle.bg} ${severityStyle.color}`}
            >
              {severityStyle.label}
              {report.priorityScore ? ` (${report.priorityScore}/100)` : ""}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">الموقع</span>
            <span className="text-slate-800 font-bold text-sm">
              {report.location?.district ||
                report.location?.address ||
                "غير محدد"}
            </span>
          </div>
          {report.assignedTo && (
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm font-bold">
                الجهة المسؤولة
              </span>
              <span className="text-slate-800 font-bold text-sm">
                {report.assignedTo}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">
              قريب من مستشفى
            </span>
            <span
              className={`font-bold text-sm ${report.nearHospital ? "text-emerald-600" : "text-slate-400"}`}
            >
              {report.nearHospital ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">
              قريب من مدرسة
            </span>
            <span
              className={`font-bold text-sm ${report.nearSchool ? "text-emerald-600" : "text-slate-400"}`}
            >
              {report.nearSchool ? "نعم" : "لا"}
            </span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">متكررة</span>
            <span className="text-slate-800 font-bold text-sm">
              {report.isRecurring || "غير متأكد"}
            </span>
          </div>
          {report.reportsCount > 1 && (
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm font-bold">
                بلاغات مشابهة
              </span>
              <span className="text-teal-600 font-black text-sm">
                {report.reportsCount}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm font-bold">آخر تحديث</span>
            <span className="text-slate-800 font-bold text-sm">
              {new Date(report.updatedAt).toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          {report.userId && (
            <div className="flex justify-between">
              <span className="text-slate-500 text-sm font-bold">
                مقدم البلاغ
              </span>
              <span className="text-slate-800 font-bold text-sm">
                {report.userId.firstName} {report.userId.lastName}
              </span>
            </div>
          )}
        </div>
      </div>

      <StatusTimeline statusHistory={report.statusHistory} />

      {report.status === "Closed"  && (
        <RatingStars rating={report.rating} onSubmit={handleRating} />
      )}

      {(isAdmin ||
        (report.userId?._id === user?._id && report.status === "Open")) && (
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-bold text-sm disabled:opacity-50"
          >
            <FiTrash2 /> {deleteLoading ? "جاري الحذف..." : "حذف البلاغ"}
          </button>
        </div>
      )}
    </div>
  );

  if (propId) return content;

  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden bg-[#F8FAFC]">
      {isAdmin ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            {content}
          </main>
        </div>
      ) : (
        <>
          <UserSidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
              {content}
            </main>
          </div>
        </>
      )}
    </div>
  );
}

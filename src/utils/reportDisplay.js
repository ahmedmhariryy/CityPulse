
export const STATUS_LABELS = {
  Open: "مفتوح",
  Assigned: "تم التعيين",
  "In Progress": "قيد التنفيذ",
  Fixed: "تم الحل",
  Closed: "تم الحل",
};

export const STATUS_TYPE_MAP = {
  Open: "open",
  Assigned: "assigned",
  "In Progress": "processing",
  Fixed: "resolved",
  Closed: "resolved",
};


const PROGRESS_MAP = {
  Open: 10,
  Assigned: 30,
  "In Progress": 65,
  Fixed: 100,
  Closed: 100,
};


export const formatArabicDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};


export const mapReportForDisplay = (report) => ({
  id: `#${report.reportNumber || report._id?.slice(-6)}`,
  rawId: report._id,
  title: report.description?.slice(0, 40) || "بلاغ بدون وصف",
  address:
    report.location?.address ||
    report.location?.district ||
    "موقع غير محدد",
  status: STATUS_LABELS[report.status] || report.status,
  statusType: STATUS_TYPE_MAP[report.status] || "open",
  progress: PROGRESS_MAP[report.status] ?? 10,
  date: formatArabicDate(report.createdAt),
  image: report.images?.[0] || null,
});


export const computeReportStats = (reports) => {
  const total = reports.length;
  const resolved = reports.filter(
    (r) => r.status === "Fixed" || r.status === "Closed"
  ).length;
  const inProgress = reports.filter(
    (r) => r.status === "Assigned" || r.status === "In Progress"
  ).length;

  return { total, resolved, inProgress };
};
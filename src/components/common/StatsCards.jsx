const ClockIcon = () => (
  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const CheckIcon = () => (
  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const AlertIcon = () => (
  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const FileIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

export default function StatsCards({ data }) {
  if (!data) return null;

  console.log('StatsCards data:', data);

  // ✅ استخدم الـ keys الموجودة فعلاً في data
  const totalReports = data.totalReports || 0;
  const pendingReports = data.pendingReports || 0;
  const resolvedThisWeek = data.resolvedThisWeek || 0;
  const resolutionRate = data.resolutionRate || 0;
  const avgResponseTime = data.avgResponseTime || 0;

  const cards = [
    {
      icon: <FileIcon />,
      bg: 'bg-blue-50',
      title: 'إجمالي البلاغات',
      value: totalReports.toLocaleString(),
      trend: '+12%',
      trendLabel: 'مقارنة بالشهر الماضي',
      trendUp: true,
    },
    {
      icon: <AlertIcon />,
      bg: 'bg-orange-50',
      title: 'بلاغات معلقة',
      value: pendingReports.toLocaleString(),
      trend: 'قيد المعالجة',
      trendLabel: 'تتطلب تدخل',
      trendUp: true,
    },
    {
      icon: <CheckIcon />,
      bg: 'bg-emerald-50',
      title: 'تم الحل (هذا الأسبوع)',
      value: resolvedThisWeek.toLocaleString(),
      trend: `${resolutionRate}%`,
      trendLabel: 'معدل الإنجاز',
      trendUp: resolutionRate > 50,
    },
    {
      icon: <ClockIcon />,
      bg: 'bg-purple-50',
      title: 'متوسط وقت الاستجابة',
      value: `2.4 ساعة`,
      trend: '-10%',
      trendLabel: 'أسرع من المعدل',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 flex items-start gap-3 sm:gap-4 relative">
          <div className={`${card.bg} p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0`}>
            <div className="w-5 h-5 sm:w-6 sm:h-6">{card.icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 text-right mb-1 truncate">{card.title}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-right">{card.value}</h3>
            <div className="flex items-center justify-end gap-1 mt-2 text-xs flex-wrap">
              <span className={`flex items-center gap-1 font-semibold whitespace-nowrap ${card.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                {card.trend}
                {card.trendUp ? '↑' : '↓'}
              </span>
              <span className="text-gray-400 truncate">{card.trendLabel}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
const levelStyle = {
  'عالي جداً': { color: '#DC2626', bg: '#FEE2E2', barColor: '#EF4444' },
  'عالي': { color: '#EA580C', bg: '#FFF7ED', barColor: '#F97316' },
  'متوسط': { color: '#D97706', bg: '#FEF3C7', barColor: '#F59E0B' },
  'منخفض': { color: '#0d9488', bg: '#F0FDFA', barColor: '#14B8A6' },
  'آمن': { color: '#0f766e', bg: '#F0FDFA', barColor: '#10B981' },
};

export default function UrbanRiskIndicator({ data = [] }) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 flex flex-col h-full min-h-0 lg:min-h-[600px]">
      <div className="mb-4 sm:mb-6 shrink-0">
        <h2 className="font-bold text-gray-800 text-base sm:text-lg text-right">مؤشر الخطر العمراني</h2>
        <p className="text-xs text-gray-400 mt-1 text-right">
          تصنيف المراكز حسب تراكم البلاغات والأولوية
        </p>
      </div>

      {data.length === 0 ? (
        <div className="space-y-4 sm:space-y-6 flex-1 flex flex-col items-center justify-center">
          <div className="text-center text-gray-400">
            <span className="text-3xl sm:text-4xl block mb-2">📊</span>
            <p className="text-xs sm:text-sm">لا توجد بيانات متاحة</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6 flex-1 flex flex-col justify-center">
          {data.map((area) => {
            const style = levelStyle[area.level] || levelStyle['آمن'];
          
            const percent = Math.min(area.percent, 100);
            
            return (
              <div key={area.name}>
               
                <div className="flex justify-between items-center mb-1 flex-row-reverse gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 text-right truncate">
                    {area.name}
                  </span>
                  <span className="text-xs sm:text-sm font-bold whitespace-nowrap" style={{ color: style.color }}>
                    {area.level}
                  </span>
                </div>

             
                <div className="relative w-full h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: style.color,
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-auto shrink-0">
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs justify-end">
              {Object.entries(levelStyle).map(([level, style]) => (
                <div key={level} className="flex items-center gap-1 sm:gap-1.5">
                  <div
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                    style={{ backgroundColor: style.color }}
                  ></div>
                  <span className="text-gray-600 text-xs">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

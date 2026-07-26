export default function DataTableWidget({ data = [] }) {
  if (data.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-center text-slate-400 py-12">لا توجد بيانات</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 text-right">
        <h3 className="text-lg font-black text-slate-900">أداء المناطق</h3>
        <p className="mt-1 text-sm text-slate-500">تصنيف الأحياء بناءً على سرعة الإغلاق</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-black">المنطقة</th>
              <th className="px-4 py-3 font-black">الإنجاز</th>
              <th className="px-4 py-3 font-black">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, index) => (
              <tr key={index} className="transition-colors hover:bg-slate-50">
                <td className="px-4 py-4 font-black text-slate-800">{row.region}</td>
                <td className="px-4 py-4 font-bold text-slate-600">{row.achievement}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${row.statusClass}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
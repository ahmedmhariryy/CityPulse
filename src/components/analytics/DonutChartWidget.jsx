import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function DonutChartWidget({ data = [] }) {
  if (data.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-center text-slate-400 py-12">لا توجد بيانات</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-right">
        <h3 className="text-lg font-black text-slate-900">توزيع البلاغات حسب الفئة</h3>
        <p className="mt-1 text-sm text-slate-500">نسبة البلاغات لكل قطاع خدمي</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={68} outerRadius={105} paddingAngle={2} stroke="#ffffff" strokeWidth={4}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} بلاغ`, name]} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px", direction: "rtl" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-5 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="font-black text-slate-900">{item.value}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-600">{item.name}</span>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
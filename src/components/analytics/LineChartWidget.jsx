import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function LineChartWidget({ data = [] }) {
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
        <h3 className="text-lg font-black text-slate-900">البلاغات عبر الزمن</h3>
        <p className="mt-1 text-sm text-slate-500">تدفق البلاغات المسجلة</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00796b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00796b" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#edf2f7" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [`${value} بلاغ`, "عدد البلاغات"]} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px", direction: "rtl" }} />
            <Area type="monotone" dataKey="reports" stroke="#00796b" strokeWidth={3} fill="url(#reportsGradient)" dot={{ r: 4, fill: "#00796b", stroke: "#ffffff", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
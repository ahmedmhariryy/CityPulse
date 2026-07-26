import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DoubleBarChartWidget({ data = [] }) {
  console.log('DoubleBarChart data:', data);
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
        <h3 className="text-lg font-black text-slate-900">البلاغات مقابل معدل الإنجاز</h3>
        <p className="mt-1 text-sm text-slate-500">مقارنة عدد البلاغات ونسبة الإنجاز لكل منطقة</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#edf2f7" />
            <XAxis dataKey="region" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px", direction: "rtl" }} />
            <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }} />
            <Bar dataKey="total" name="إجمالي البلاغات" fill="#80cbc4" radius={[8, 8, 0, 0]} barSize={22} />
            <Bar dataKey="completion" name="معدل الإنجاز (%)" fill="#00796b" radius={[8, 8, 0, 0]} barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
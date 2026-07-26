import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/api';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import DonutChartWidget from '../../components/analytics/DonutChartWidget';
import LineChartWidget from '../../components/analytics/LineChartWidget';
import DataTableWidget from '../../components/analytics/DataTableWidget';
import DoubleBarChartWidget from '../../components/analytics/DoubleBarChartWidget';

const CHART_COLORS = ['#00796b', '#009688', '#80cbc4', '#4db6ac', '#b2dfdb', '#cfd8dc'];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reportsOverTime, setReportsOverTime] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [districtStats, setDistrictStats] = useState([]);
  const [districtPerformance, setDistrictPerformance] = useState([]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      const [analyticsRes, reportsRes] = await Promise.all([
        adminAPI.getAnalytics(),
        adminAPI.getAllReports({ limit: 1000 })
      ]);

      const data = analyticsRes.data.data;
      const allReports = reportsRes.data.data || [];

      setReportsOverTime((data.reportsOverTime || []).map(item => ({
        label: new Date(item._id).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }),
        reports: item.count
      })));

      const categoryCount = {};
      allReports.forEach(r => { categoryCount[r.category] = (categoryCount[r.category] || 0) + 1; });
      setCategoryDistribution(Object.entries(categoryCount).map(([name, value], i) => ({
        name, value, color: CHART_COLORS[i % CHART_COLORS.length]
      })));

      const districtCount = {};
      allReports.forEach(r => {
        const d = r.location?.district || 'غير محدد';
        districtCount[d] = (districtCount[d] || 0) + 1;
      });

      setDistrictStats(Object.entries(districtCount).map(([region, count]) => {
        const districtReports = allReports.filter(r => (r.location?.district || 'غير محدد') === region);
        const closed = districtReports.filter(r => r.status === 'Closed' || r.status === 'Fixed').length;
        const rate = districtReports.length > 0 ? Math.round((closed / districtReports.length) * 100) : 0;
        let status, statusClass;
        if (rate >= 95) { status = 'ممتاز'; statusClass = 'bg-teal-50 text-teal-700'; }
        else if (rate >= 85) { status = 'جيد جداً'; statusClass = 'bg-emerald-50 text-emerald-700'; }
        else if (rate >= 70) { status = 'مستقر'; statusClass = 'bg-slate-100 text-slate-600'; }
        else { status = 'يحتاج تحسين'; statusClass = 'bg-amber-50 text-amber-700'; }
        return { region, achievement: `${rate}%`, status, statusClass };
      }).sort((a, b) => parseInt(b.achievement) - parseInt(a.achievement)).slice(0, 8));

      setDistrictPerformance(Object.entries(districtCount).map(([region]) => {
        const districtReports = allReports.filter(r => (r.location?.district || 'غير محدد') === region);
        const closed = districtReports.filter(r => r.status === 'Closed' || r.status === 'Fixed').length;
        const completion = districtReports.length > 0 ? Math.round((closed / districtReports.length) * 100) : 0;
        return { region, total: districtReports.length, completion };
      }).sort((a, b) => b.total - a.total).slice(0, 5));

    } catch (err) {
      console.error('Error:', err);
      setError('تعذر تحميل بيانات التحليلات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-96 gap-3">
      <FiAlertCircle className="w-12 h-12 text-red-400" />
      <p className="text-slate-500 font-bold">{error}</p>
      <button onClick={fetchAnalytics} className="flex items-center gap-2 text-teal-600 font-bold"><FiRefreshCw /> إعادة المحاولة</button>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 lg:p-8" dir="rtl">
      <header className="mb-6 md:mb-8 text-right">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">التحليلات</h1>
        <p className="mt-2 text-sm text-slate-500">متابعة أداء البلاغات، سرعة الاستجابة، وتوزيع المشكلات داخل المحافظة.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4"><DonutChartWidget data={categoryDistribution} /></div>
        <div className="xl:col-span-8"><LineChartWidget data={reportsOverTime} /></div>
        <div className="xl:col-span-5"><DataTableWidget data={districtStats} /></div>
        <div className="xl:col-span-7"><DoubleBarChartWidget data={districtPerformance} /></div>
      </div>
    </div>
  );
}
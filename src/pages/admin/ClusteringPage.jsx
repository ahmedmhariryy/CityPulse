import { useState } from 'react';
import { FiPlay, FiRefreshCw, FiAlertCircle, FiCheckCircle, FiExternalLink, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/api';

export default function ClusteringPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [hasRun, setHasRun] = useState(false);

  const handleRunClustering = async () => {
    try {
      setLoading(true);
      setError('');
      setResult(null);
      
      const response = await adminAPI.runClustering();
      setResult(response.data);
      setHasRun(true);
      
    } catch (err) {
      console.error('Error running clustering:', err);
      setError(err.response?.data?.message || 'فشل تشغيل تجميع البلاغات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6" dir="rtl">
        
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">تجميع البلاغات</h1>
            <p className="text-sm text-slate-500 mt-1">اكتشاف البلاغات المتشابهة ودمجها تلقائياً لزيادة أولويتها</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3">
              <FiInfo className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-800 text-sm mb-1">تحليل ذكي</h3>
            <p className="text-xs text-slate-500">يبحث عن بلاغات نفس الفئة ضمن ١٠٠ متر</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-3">
              <FiRefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-800 text-sm mb-1">دمج تلقائي</h3>
            <p className="text-xs text-slate-500">يدمج البلاغات المتشابهة ويزيد عددها</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-3">
              <FiAlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-800 text-sm mb-1">أولوية أعلى</h3>
            <p className="text-xs text-slate-500">كلما زادت البلاغات المدمجة زادت درجة الأولوية</p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl p-4 flex items-center gap-2">
            <FiAlertCircle />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <h3 className="font-black text-slate-800 mb-2">جاري تحليل البلاغات...</h3>
            <p className="text-sm text-slate-500">يرجى الانتظار، قد يستغرق الأمر بضع ثوانٍ</p>
          </div>
        )}

        {!hasRun && !loading && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlay className="w-10 h-10" />
            </div>
            <h3 className="font-black text-slate-800 text-lg mb-2">بدء تجميع البلاغات</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">
              اضغط على الزر لبدء عملية تجميع البلاغات المتشابهة. النظام سيبحث عن بلاغات في نفس الفئة وضمن مسافة ١٠٠ متر من بعضها ويدمجها معاً.
            </p>
            <button
              onClick={handleRunClustering}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-colors shadow-sm"
            >
              <FiPlay className="w-5 h-5" />
              تشغيل التجميع الآن
            </button>
          </div>
        )}


        {result && !loading && (
          <>
           
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold rounded-xl p-4 flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5" />
              {result.message || `تم العثور على ${result.clustersFound} مجموعة من البلاغات المتشابهة`}
            </div>

 
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ">
              <div className="p-5 border-b border-slate-50">
                <h3 className="font-black text-slate-800">نتائج التجميع</h3>
                <p className="text-sm text-slate-500 mt-1">
                  البلاغات التالية تم دمجها معاً وزيادة أولويتها
                </p>
              </div>

              {result.clustersFound === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-bold">لا توجد بلاغات متشابهة حالياً - كل البلاغات فريدة</p>
                </div>
              ) : (
                <div className="overflow-x-auto ">
                  <table className="w-full text-sm text-right ">
                    <thead className="bg-slate-50">
                      <tr className="text-slate-500 border-b border-slate-100">
                        <th className="py-3 px-4 font-bold">البلاغ الأساسي</th>
                        <th className="py-3 px-4 font-bold">البلاغات المدمجة</th>
                        <th className="py-3 px-4 font-bold hidden md:table-cell">أرقام البلاغات</th>
                        <th className="py-3 px-4 font-bold">الإجمالي الجديد</th>
                        <th className="py-3 px-4 font-bold w-10">عرض</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.data?.map((cluster, index) => (
                        <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-teal-600">
                            {cluster.baseReportNumber}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                              {cluster.mergedCount} بلاغ مدمج
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs hidden md:table-cell">
                            {cluster.mergedReportNumbers?.join('، ') || '—'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-black text-slate-800">
                              {cluster.newReportsCount}
                            </span>
                            <span className="text-xs text-slate-400 mr-1">بلاغ</span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => navigate(`/admin-dashboard/reports/${cluster.baseReportId}`)}
                              className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-1.5 rounded-lg transition-colors"
                              title="عرض تفاصيل البلاغ"
                            >
                              <FiExternalLink className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between ">
                <button
                  onClick={handleRunClustering}
                  className="cursor-pointer text-teal-600 hover:text-teal-700 font-bold text-sm"
                >
                  تشغيل التجميع مرة أخرى
                </button>
               
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

const statusStyle = {
  'Open': { color: 'var(--color-info)', label: 'مفتوح', dotColor: '#3B82F6' }, 
  'Assigned': { color: 'var(--color-warning)', label: 'قيد التخصيص', dotColor: '#F59E0B' },
  'In Progress': { color: 'var(--color-warning)', label: 'قيد المعالجة', dotColor: '#F59E0B' }, 
  'Fixed': { color: 'var(--color-primary)', label: 'تم الإصلاح', dotColor: '#10B981' }, 
  'Closed': { color: 'var(--color-primary)', label: 'تم الغلق', dotColor: '#6B7280' },
};

const categoryColors = {
  'طرق وأرصفة': { bg: '#FEF3C7', color: '#D97706' },
  'مياه وصرف': { bg: '#DBEAFE', color: '#2563EB' },
  'كهرباء وإنارة': { bg: '#FEF2F2', color: '#DC2626' },
  'نظافة وتجميل': { bg: '#D1FAE5', color: '#059669' },
  'بنية تحتية': { bg: '#E0E7FF', color: '#4F46E5' },
  'مخاطر أخرى': { bg: '#F3F4F6', color: '#6B7280' },
};

const priorityMap = {
  'عالية / طارئ': { bg: '#FEF2F2', color: '#DC2626', label: 'عاجل', border: '#FECACA' },
  'متوسطة': { bg: '#FFFBEB', color: '#D97706', label: 'هام', border: '#FDE68A' },
  'منخفضة': { bg: '#F9FAFB', color: '#4B5563', label: 'عادي', border: '#E5E7EB' },
};

const departments = [
  'إدارة الطرق',
  'إدارة النظافة',
  'إدارة الكهرباء',
  'إدارة المياه والصرف',
  'إدارة الحدائق',
  'إدارة المباني',
  'الدفاع المدني',
  'الشرطة',
];

const statusOptions = ['Open', 'Assigned', 'In Progress', 'Fixed', 'Closed'];

export default function ReportsTable({ data = [], onStatusUpdate }) {
  const navigate = useNavigate(); 
  const [showDropdown, setShowDropdown] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState({});
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState({});
  
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const reports = Array.isArray(data) ? data : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (buttonRef.current && buttonRef.current.contains(event.target)) {
          return;
        }
        setShowDropdown(null);
        setShowDepartmentDropdown({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (reportId, newStatus, assignedTo = null) => {
    if (onStatusUpdate) {
      await onStatusUpdate(reportId, newStatus, `تم تغيير الحالة إلى ${newStatus}`, assignedTo);
    }
    setShowDropdown(null);
    setShowDepartmentDropdown({});
  };

  const handleDepartmentSelect = (reportId, dept) => {
    setSelectedDepartment({ ...selectedDepartment, [reportId]: dept });
    setShowDepartmentDropdown({});
    handleStatusChange(reportId, 'Assigned', dept);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-5 flex flex-col h-full min-h-0 lg:min-h-[600px]"
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 shrink-0 gap-3">
        <div>
          <h2 className="font-bold text-gray-800 text-lg sm:text-xl">أحدث البلاغات</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">البلاغات الواردة التي تتطلب إجراء</p>
        </div>
        
      </div>

      <div className="flex-1 min-h-0 overflow-x-auto lg:overflow-y-auto">    
        <table className="w-full text-xs sm:text-sm text-right border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="text-gray-400 border-b border-gray-100">
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2 w-12 sm:w-16">رقم</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2">الفئة</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2 hidden sm:table-cell">الموقع</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2">الأولوية</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2 hidden md:table-cell">الجهة</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2">الحالة</th>
              <th className="pb-3 font-medium text-gray-400 whitespace-nowrap px-2 w-10">عرض</th>
              <th className="pb-3 font-medium w-8">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-400">
                  لا توجد بلاغات
                </td>
              </tr>
            ) : (
              reports.map((r) => {
                const priority = priorityMap[r.severity] || priorityMap['منخفضة'];
                const status = statusStyle[r.status] || statusStyle['Open'];
                const category = categoryColors[r.category] || { bg: '#F3F4F6', color: '#6B7280' };
                
                return (
                  <tr key={r._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition">
                    <td className="py-3 sm:py-4 text-gray-400 text-xs sm:text-base px-2 whitespace-nowrap">
                      {r.reportNumber || r._id?.slice(-6)}
                    </td>
                    
                    <td className="py-3 sm:py-4 px-2">
                      <span
                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium inline-block whitespace-nowrap"
                        style={{
                          backgroundColor: category.bg,
                          color: category.color,
                        }}
                      >
                        {r.category}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 text-gray-500 text-xs sm:text-base px-2 hidden sm:table-cell whitespace-nowrap">
                      {r.location?.district || r.location?.address || 'غير محدد'}
                    </td>

                    <td className="py-3 sm:py-4 px-2">
                      <span
                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-xs font-bold border inline-block whitespace-nowrap"
                        style={{
                          backgroundColor: priority.bg,
                          color: priority.color,
                          borderColor: priority.border
                        }}
                      >
                        {priority.label}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 text-gray-400 text-xs sm:text-base px-2 hidden md:table-cell whitespace-nowrap">
                      {r.assignedTo || selectedDepartment[r._id] || <span className="text-gray-300">—</span>}
                    </td>

                    <td className="py-3 sm:py-4 font-bold text-xs sm:text-base px-2 whitespace-nowrap">
                      <div className="flex items-center gap-1" style={{ color: status.color }}>
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: status.dotColor }}></span>
                        {status.label}
                      </div>
                    </td>

                    <td className="py-3 sm:py-4 px-2">
                      <button
                        onClick={() => navigate(`/admin/reports/${r._id}`)}
                        className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-1.5 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                    </td>

                    <td className="py-3 sm:py-4 px-2">
                      <div className="relative">
                        <button
                          ref={buttonRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDropdown(showDropdown === r._id ? null : r._id);
                            setShowDepartmentDropdown({});
                          }}
                          className="text-gray-400 hover:text-gray-600 transition p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                        
                        {showDropdown === r._id && (
                          <div 
                            ref={dropdownRef}
                            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {statusOptions.map((opt) => (
                              <div key={opt}>
                                {opt === 'Assigned' ? (
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDepartmentDropdown({ 
                                          ...showDepartmentDropdown, 
                                          [r._id]: !showDepartmentDropdown[r._id] 
                                        });
                                      }}
                                      className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 transition text-gray-700"
                                    >
                                      {statusStyle[opt]?.label || opt} 
                                      <span className="text-xs text-gray-400 mr-2">▼</span>
                                    </button>
                                    
                                    {showDepartmentDropdown[r._id] && (
                                      <div className="border-t border-gray-100">
                                        {departments.map((dept) => (
                                          <button
                                            key={dept}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDepartmentSelect(r._id, dept);
                                            }}
                                            className="block w-full text-right px-6 py-2 text-sm hover:bg-gray-100 text-gray-600"
                                          >
                                            {dept}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusChange(r._id, opt);
                                    }}
                                    className={`block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 transition ${
                                      r.status === opt ? 'bg-gray-100 text-primary font-bold' : 'text-gray-700'
                                    }`}
                                  >
                                    {statusStyle[opt]?.label || opt}
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { FiSearch, FiRefreshCw, FiAlertCircle, FiUserCheck, FiUserX } from 'react-icons/fi';
import { adminAPI } from '../../api/api';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, userId: null, userName: '', isActive: false });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAPI.getAllUsers();
      setUsers(response.data.data || []);
    } catch (err) {
      setError('تعذر تحميل بيانات المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openConfirmModal = (userId, userName, isActive) => {
    setConfirmModal({ open: true, userId, userName, isActive });
  };

  const handleToggleStatus = async () => {
    try {
      setStatusUpdating(confirmModal.userId);
      await adminAPI.toggleUserStatus(confirmModal.userId, !confirmModal.isActive);
      setConfirmModal({ open: false, userId: null, userName: '', isActive: false });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'فشل تحديث حالة المستخدم');
    } finally {
      setStatusUpdating(null);
    }
  };

  const filteredUsers = users.filter(u => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      (u.firstName && u.firstName.toLowerCase().includes(s)) ||
      (u.lastName && u.lastName.toLowerCase().includes(s)) ||
      (u.email && u.email.toLowerCase().includes(s)) ||
      (u.phoneNumber && u.phoneNumber.includes(s))
    );
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    disabled: users.filter(u => !u.isActive).length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6" dir="rtl">
        
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900">إدارة المستخدمين</h1>
            <p className="text-sm text-slate-500 mt-1">عرض وإدارة حسابات المستخدمين والصلاحيات</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-slate-900">{stats.total}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">إجمالي المستخدمين</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-emerald-600">{stats.active}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">نشط</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-red-500">{stats.disabled}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">معطل</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-purple-600">{stats.admins}</p>
            <p className="text-xs font-bold text-slate-500 mt-1">مديرين</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center gap-3 flex-wrap border-b border-slate-50">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute right-3 top-3 text-slate-400" />
              <input type="text" placeholder="بحث بالاسم، البريد، رقم الهاتف..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-500 transition" />
            </div>
            <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold transition-colors">
              <FiRefreshCw className="w-4 h-4" /> تحديث
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-b border-red-100 text-red-600 text-sm font-bold p-4 flex items-center gap-2">
              <FiAlertCircle /> {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-right border-collapse" dir="rtl">
              <thead className="bg-slate-50">
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="py-3 px-4 font-bold whitespace-nowrap">المستخدم</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap hidden md:table-cell">البريد الإلكتروني</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap hidden lg:table-cell">رقم الهاتف</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">الدور</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap">الحالة</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap hidden md:table-cell">تاريخ التسجيل</th>
                  <th className="py-3 px-4 font-bold whitespace-nowrap w-10">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="py-16 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div></td></tr>
                ) : filteredUsers.length === 0 ? (
                  <tr><td colSpan={7} className="py-16 text-center text-slate-400 font-bold">لا يوجد مستخدمين</td></tr>
                ) : (
                  filteredUsers.map(u => (
                    <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm shrink-0">
                            {u.firstName?.charAt(0) || '؟'}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{u.firstName} {u.lastName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs hidden md:table-cell">{u.email}</td>
                      <td className="py-3 px-4 text-slate-500 text-xs hidden lg:table-cell" dir="ltr">{u.phoneNumber}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                          {u.role === 'admin' ? 'مدير' : 'مستخدم'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold ${u.isActive ? 'text-emerald-600' : 'text-red-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-emerald-500' : 'bg-red-400'}`}></span>
                          {u.isActive ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs hidden md:table-cell whitespace-nowrap">
                        {new Date(u.createdAt).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="py-3 px-4">
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => openConfirmModal(u._id, `${u.firstName} ${u.lastName}`, u.isActive)}
                            disabled={statusUpdating === u._id}
                            className={`p-2 rounded-lg transition-colors ${u.isActive ? 'text-red-500 hover:bg-red-50 hover:text-red-600' : 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
                            title={u.isActive ? 'تعطيل المستخدم' : 'تفعيل المستخدم'}
                          >
                            {u.isActive ? <FiUserX className="w-4 h-4" /> : <FiUserCheck className="w-4 h-4" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {confirmModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setConfirmModal({ open: false, userId: null, userName: '', isActive: false })}></div>
            <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center" dir="rtl">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmModal.isActive ? 'bg-red-100' : 'bg-emerald-100'}`}>
                {confirmModal.isActive ? (
                  <FiUserX className="w-8 h-8 text-red-500" />
                ) : (
                  <FiUserCheck className="w-8 h-8 text-emerald-500" />
                )}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                {confirmModal.isActive ? 'تعطيل المستخدم' : 'تفعيل المستخدم'}
              </h3>
              <p className="text-slate-500 font-medium mb-2">
                {confirmModal.isActive ? 'هل أنت متأكد من تعطيل حساب' : 'هل أنت متأكد من تفعيل حساب'}
              </p>
              <p className="text-lg font-black text-slate-800 mb-6">{confirmModal.userName}</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmModal({ open: false, userId: null, userName: '', isActive: false })} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-sm">إلغاء</button>
                <button onClick={handleToggleStatus} className={`flex-1 px-4 py-3 rounded-xl text-white transition-colors font-bold text-sm shadow-sm ${confirmModal.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
                  {confirmModal.isActive ? 'تعطيل' : 'تفعيل'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
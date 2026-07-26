import { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiSave, FiAlertCircle, FiCheckCircle, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';
import { authAPI } from '../../api/api';

const PasswordChangedModal = () => {
  const handleRedirect = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">تم تغيير كلمة المرور بنجاح</h3>
        <p className="text-slate-500 font-medium mb-6">
          تم تغيير كلمة المرور الخاصة بك. يجب عليك تسجيل الدخول مرة أخرى بكلمة المرور الجديدة.
        </p>
        <button
          onClick={handleRedirect}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors font-bold shadow-sm"
        >
          <FiLogOut />
          تسجيل الدخول مرة أخرى
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPasswordChangedModal, setShowPasswordChangedModal] = useState(false);

  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const togglePassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validatePersonalForm = () => {
    const newErrors = {};
    if (!personalData.firstName || personalData.firstName.trim().length < 2) {
      newErrors.firstName = 'الاسم الأول يجب أن يكون حرفين على الأقل';
    }
    if (!personalData.lastName || personalData.lastName.trim().length < 2) {
      newErrors.lastName = 'الاسم الثاني يجب أن يكون حرفين على الأقل';
    }
    if (!personalData.phoneNumber || !/^[0-9]{10,15}$/.test(personalData.phoneNumber)) {
      newErrors.phoneNumber = 'رقم الهاتف يجب أن يكون 10-15 أرقام';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'كلمة المرور الحالية مطلوبة';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'كلمة المرور الجديدة مطلوبة';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل';
    } else if (passwordData.newPassword === passwordData.currentPassword) {
      newErrors.newPassword = 'كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    if (!validatePersonalForm()) return;

    try {
      setLoading(true);
      setMessage(null);
      
      const updateData = {};
      if (personalData.firstName !== user?.firstName) updateData.firstName = personalData.firstName;
      if (personalData.lastName !== user?.lastName) updateData.lastName = personalData.lastName;
      if (personalData.phoneNumber !== user?.phoneNumber) updateData.phoneNumber = personalData.phoneNumber;
      
      if (Object.keys(updateData).length === 0) {
        setMessage({ type: 'info', text: 'لا توجد تغييرات للحفظ' });
        return;
      }
      
      await authAPI.updateMe(updateData);
      setMessage({ type: 'success', text: 'تم تحديث البيانات الشخصية بنجاح' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'حدث خطأ أثناء التحديث' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      setLoading(true);
      setMessage(null);
      
      const response = await authAPI.updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setShowPasswordChangedModal(true);
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'كلمة المرور الحالية غير صحيحة' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPersonalData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
    });
    setErrors({});
    setMessage(null);
  };

  return (
    <>
      {showPasswordChangedModal && <PasswordChangedModal />}

      <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-xl font-black text-slate-900">الإعدادات</h2>

        {message && (
          <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-bold ${
            message.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
              : message.type === 'error'
              ? 'bg-red-50 text-red-600 border border-red-100'
              : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
            {message.text}
          </div>
        )}

        <div className="flex gap-4 border-b border-slate-200 pb-0">
          <button
            onClick={() => { setActiveTab('personal'); setMessage(null); }}
            className={`flex items-center gap-2 pb-3 px-4 transition-colors relative ${
              activeTab === 'personal' ? 'text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <FiUser />
            البيانات الشخصية
            {activeTab === 'personal' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('security'); setMessage(null); }}
            className={`flex items-center gap-2 pb-3 px-4 transition-colors relative ${
              activeTab === 'security' ? 'text-teal-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <FiLock />
            الأمان وكلمة المرور
            {activeTab === 'security' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-t-full"></div>
            )}
          </button>
        </div>

        {activeTab === 'personal' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-black text-slate-800 mb-6">البيانات الأساسية</h3>
            
            <form onSubmit={handlePersonalSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">الاسم الأول</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalData.firstName}
                    onChange={handlePersonalChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium ${errors.firstName ? 'border-red-300' : 'border-slate-200'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">الاسم الثاني</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalData.lastName}
                    onChange={handlePersonalChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium ${errors.lastName ? 'border-red-300' : 'border-slate-200'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.lastName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={personalData.phoneNumber}
                    onChange={handlePersonalChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium text-right ${errors.phoneNumber ? 'border-red-300' : 'border-slate-200'}`}
                    dir="ltr"
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.phoneNumber}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 transition-all font-medium text-right cursor-not-allowed"
                    dir="ltr"
                    disabled
                  />
                  <p className="text-xs text-slate-400 font-bold">لا يمكن تغيير البريد الإلكتروني</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      حفظ التغييرات
                      <FiSave />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FiLock className="text-slate-400" />
              <h3 className="font-black text-slate-800">تغيير كلمة المرور</h3>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-black text-slate-700">كلمة المرور الحالية</label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium pl-12 ${errors.currentPassword ? 'border-red-300' : 'border-slate-200'}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword('current')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword.current ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.currentPassword}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">كلمة المرور الجديدة</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium pl-12 ${errors.newPassword ? 'border-red-300' : 'border-slate-200'}`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword('new')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.newPassword}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-black text-slate-700">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-slate-800 transition-all font-medium pl-12 ${errors.confirmPassword ? 'border-red-300' : 'border-slate-200'}`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePassword('confirm')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs font-bold flex items-center gap-1 mt-1"><FiAlertCircle className="w-3 h-3" /> {errors.confirmPassword}</p>}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white transition-colors font-bold flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      جاري التحديث...
                    </>
                  ) : (
                    <>
                      <FiLock />
                      تحديث كلمة المرور
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;
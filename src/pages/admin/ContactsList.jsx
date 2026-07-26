import { useState, useEffect, useMemo } from 'react';
import {  FiPhone, FiRefreshCw, FiSearch, FiInbox } from 'react-icons/fi';
import { adminAPI } from '../../api/api';

const subjectLabels = {
  follow_report: "متابعة حالة بلاغ",
  new_complaint: "استفسار عن بلاغ جديد",
  technical_support: "دعم فني",
  suggestion: "اقتراح أو ملاحظة",
  other: "أخرى",
};

const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();

const formatRelative = (dateStr) => {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'الآن';
  if (diffMin < 60) return `منذ ${diffMin} د`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `منذ ${diffH} س`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `منذ ${diffD} ي`;
  return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' });
};

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getContacts();
      setContacts(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleSelect = (c) => {
    setSelected(c);
    if (!c.read) {
      adminAPI.markContactRead(c._id).catch(console.error);
      setContacts(prev => prev.map(x => x._id === c._id ? { ...x, read: true } : x));
    }
  };

  const unreadCount = useMemo(() => contacts.filter(c => !c.read).length, [contacts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(c =>
      c.fullName?.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      c.message?.toLowerCase().includes(q)
    );
  }, [contacts, query]);

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 bg-slate-50/50" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">رسائل التواصل</h1>
          <p className="text-sm text-slate-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} رسالة غير مقروءة` : 'كل الرسائل مقروءة'}
          </p>
        </div>
        <button
          onClick={fetchContacts}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} /> تحديث
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="relative mb-3">
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الموضوع..."
              className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {loading && (
              [...Array(4)].map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white animate-pulse">
                  <div className="h-3.5 w-1/2 bg-slate-100 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-slate-100 rounded" />
                </div>
              ))
            )}

            {!loading && filtered.length === 0 && (
              <div className="p-8 rounded-xl border border-dashed border-slate-200 bg-white text-center text-slate-400 text-sm font-bold">
                لا توجد رسائل
              </div>
            )}

            {!loading && filtered.map(c => {
              const isSelected = selected?._id === c._id;
              return (
                <button
                  key={c._id}
                  onClick={() => handleSelect(c)}
                  className={`w-full text-right p-4 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-teal-300 bg-teal-50/70 shadow-sm'
                      : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black ${
                    isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {initials(c.fullName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-black text-slate-800 text-sm truncate">{c.fullName}</span>
                      <span className="shrink-0 text-[11px] text-slate-400 font-bold">{formatRelative(c.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{subjectLabels[c.subject] || c.subject}</p>
                  </div>
                  {!c.read && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-teal-500 mt-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-teal-600 text-white flex items-center justify-center font-black">
                    {initials(selected.fullName)}
                  </div>
                  <div>
                    <h2 className="font-black text-slate-800">{selected.fullName}</h2>
                    {selected.phone && (
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <FiPhone className="w-3.5 h-3.5" /> {selected.phone}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-bold whitespace-nowrap">
                  {new Date(selected.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">الموضوع</span>
                <p className="text-sm font-bold text-slate-700 mt-1">{subjectLabels[selected.subject] || selected.subject}</p>
              </div>

              <div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">الرسالة</span>
                <p className="text-slate-600 leading-relaxed mt-2 whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 flex flex-col items-center justify-center h-full">
              <FiInbox className="w-12 h-12 mb-4 text-slate-300" />
              <p className="font-bold text-sm">اختر رسالة من القائمة لعرضها</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { categories, severities, districts } from "../pages/data/reportConstants";
import LocationMap, { fetchAddressFromCoords } from "./LocationMap";

const normalizeAr = (str) =>
  str
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/ة/g, "ه")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .trim();

const extractDistrict = (addressData, districtsList) => {
  if (!addressData?.address) return null;
  const addr = addressData.address;
  
  const candidates = [
    addr?.suburb,
    addr?.town,
    addr?.city_district,
    addr?.village,
    addr?.county,
    addr?.state_district,
    addr?.city,
    addr?.municipality,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    const normCandidate = normalizeAr(candidate);

    for (const district of districtsList) {
      const normDistrict = normalizeAr(district);
      if (
        normCandidate.includes(normDistrict) || 
        normDistrict.includes(normCandidate)
      ) {
        console.log('✅ تم اكتشاف المنطقة:', district, 'من:', candidate);
        return district;
      }
    }
  }
  
  console.log('❌ لم يتم اكتشاف المنطقة. البيانات:', addr);
  return null;
};

const Step1Location = ({ formData, updateForm, onNext }) => {
  const [recenterTrigger, setRecenterTrigger] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [showCustomDistrict, setShowCustomDistrict] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const districtRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (districtRef.current && !districtRef.current.contains(e.target)) {
        setDistrictOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateAddressFromCoords = async (lat, lng) => {
    setLoadingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
      );
      const data = await res.json();
      const displayName = data.display_name || null;

      if (displayName) {
        updateForm("locationText", displayName);
        updateForm("resolvedAddress", displayName);
      }

      const detectedDistrict = extractDistrict(data, districts);
      if (detectedDistrict) {
        updateForm("district", detectedDistrict);
        setShowCustomDistrict(false);
      } else {
        updateForm("district", "__other__");
        setShowCustomDistrict(true);
      }
    } catch (error) {
      console.error("فشل جلب اسم العنوان:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setLocationError("");
    updateForm("locationType", "موقعي الحالي");

    if (!navigator.geolocation) {
      setLocationError("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateForm("lat", latitude);
        updateForm("lng", longitude);
        setTimeout(() => setRecenterTrigger(prev => !prev), 100);
        updateAddressFromCoords(latitude, longitude);
      },
      (error) => {
        console.error("فشل تحديد الموقع:", error);
        setLocationError("تعذر تحديد موقعك، يرجى السماح بالوصول للموقع");
      }
    );
  };

  const handleMapLocationChange = (lat, lng) => {
    updateForm("lat", lat);
    updateForm("lng", lng);
    updateForm("locationType", "محدد على الخريطة");
    setRecenterTrigger(prev => !prev);
    updateAddressFromCoords(lat, lng);
  };

  const handleNext = () => {
    const district = formData.district === "__other__" 
      ? formData.customDistrict?.trim() 
      : formData.district;
    
    if (!district) {
      setLocationError("يرجى اختيار أو كتابة اسم المنطقة");
      return;
    }

    const address = formData.locationText?.trim() || formData.resolvedAddress?.trim();
    if (!address) {
      setLocationError("يرجى تحديد موقع أو كتابة العنوان أولاً");
      return;
    }
    if (!formData.category) {
      setLocationError("يرجى اختيار نوع المشكلة");
      return;
    }
    if (!formData.severity) {
      setLocationError("يرجى اختيار درجة الخطورة");
      return;
    }
    setLocationError("");
    onNext();
  };

  const canProceed =
    (formData.locationText?.trim() || formData.resolvedAddress?.trim()) &&
    formData.category &&
    formData.severity;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative overflow-hidden rounded-t-2xl">
          <LocationMap
            lat={formData.lat}
            lng={formData.lng}
            onLocationChange={handleMapLocationChange}
            shouldRecenter={recenterTrigger}
          />

          <div className="absolute top-3 right-3 flex gap-2 z-[1000]">
            <button
              onClick={handleUseCurrentLocation}
              className={`shadow-sm rounded-lg px-3 py-1.5 text-xs font-black flex items-center gap-1 transition-colors ${
                formData.locationType === "موقعي الحالي"
                  ? "bg-primary text-white"
                  : "bg-white text-primary-dark"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              موقعي الحالي
            </button>
          </div>

          {loadingAddress && (
            <div className="absolute bottom-3 right-3 bg-white/95 rounded-lg px-3 py-1.5 text-xs font-black text-slate-500 shadow-sm flex items-center gap-1 z-[1000]">
              <svg className="animate-spin w-3 h-3 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              جاري تحديد العنوان...
            </div>
          )}
        </div>

        <div className="p-4">
          <label className="block text-sm font-black text-slate-700 mb-2">
            أو اكتب العنوان يدوياً
          </label>
          <div className="flex gap-2">
            <input
              placeholder="مثال: ميدان محطة القناطر الخيرية"
              className={`flex-1 border rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder-slate-400 focus:outline-none transition-colors ${
                locationError && !formData.locationText?.trim()
                  ? "border-red-300 focus:border-red-400 bg-red-50"
                  : "border-slate-200 focus:border-primary"
              }`}
              type="text"
              value={formData.locationText}
              onChange={(e) => {
                updateForm("locationText", e.target.value);
                updateForm("locationType", "مكتوب يدوياً");
                if (e.target.value.trim()) setLocationError("");
              }}
            />
            <div className="relative" ref={districtRef} style={{ minWidth: "140px" }}>
              <button
                type="button"
                onClick={() => setDistrictOpen((prev) => !prev)}
                className="w-full h-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-primary bg-white flex items-center justify-between gap-2"
              >
                <span className="truncate">
                  {formData.district === "__other__"
                    ? " إضافة يدوياً..."
                    : formData.district || "اختر المنطقة"}
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${districtOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {districtOpen && (
                <div className="absolute top-full mt-2 right-0 left-0 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-[1100]">
                  {districts.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        updateForm("district", d);
                        setShowCustomDistrict(false);
                        setDistrictOpen(false);
                      }}
                      className={`w-full text-right px-4 py-2.5 text-sm font-bold hover:bg-slate-50 transition-colors ${
                        formData.district === d ? "bg-primary/10 text-primary-dark" : "text-slate-700"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      updateForm("district", "__other__");
                      setShowCustomDistrict(true);
                      setDistrictOpen(false);
                    }}
                    className="w-full text-right px-4 py-2.5 text-sm font-bold text-teal-600 hover:bg-teal-50 border-t border-slate-100"
                  >
                    إضافة يدوياً...
                  </button>
                </div>
              )}
            </div>
          </div>

          {(formData.district === "__other__" || showCustomDistrict) && (
            <input
              type="text"
              placeholder="اكتب اسم المركز/المنطقة..."
              value={formData.customDistrict || ""}
              onChange={(e) => updateForm("customDistrict", e.target.value)}
              className="w-full border border-teal-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none focus:border-teal-500 bg-teal-50 mt-2"
            />
          )}

          {locationError && (
            <p className="text-xs font-bold text-red-500 mt-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
              </svg>
              {locationError}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-black text-slate-800 mb-4">نوع المشكلة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { updateForm("category", cat.label); setLocationError(""); }}
              className={`flex flex-col items-center gap-2 p-4 border-2 rounded-2xl transition-all font-bold text-sm ${
                formData.category === cat.label ? cat.activeClass : cat.inactiveClass
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                {cat.icon}
              </svg>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-black text-slate-800 mb-4">درجة الخطورة</h2>
        <div className="flex gap-3">
          {severities.map((sev) => (
            <button
              key={sev.label}
              onClick={() => { updateForm("severity", sev.label); setLocationError(""); }}
              className={`flex-1 py-3 border-2 rounded-xl text-sm font-black transition-all ${
                formData.severity === sev.label ? sev.activeClass : sev.inactiveClass
              }`}
            >
              {sev.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!canProceed}
        className="w-full py-4 text-base font-black text-white bg-primary hover:bg-primary-dark rounded-2xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي — إضافة التفاصيل والصور
      </button>
    </>
  );
};

export default Step1Location;
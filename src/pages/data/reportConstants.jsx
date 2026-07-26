export const categories = [
  {
    id: "roads",
    label: "طرق وأرصفة",
    icon: (
      <>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
        <circle cx="7" cy="17" r="2"></circle>
        <path d="M9 17h6"></path>
        <circle cx="17" cy="17" r="2"></circle>
      </>
    ),
    activeClass: "bg-warning text-white border-warning",
    inactiveClass: "text-warning bg-warning/10 border-warning/30",
  },
  {
    id: "water",
    label: "مياه وصرف",
    icon: (
      <>
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
      </>
    ),
    activeClass: "bg-info text-white border-info",
    inactiveClass: "text-info bg-info/10 border-info/30",
  },
  {
    id: "electricity",
    label: "كهرباء وإنارة",
    icon: (
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
    ),
    activeClass: "bg-warning text-white border-warning",
    inactiveClass: "text-warning bg-warning/10 border-warning/30",
  },
  {
    id: "trash",
    label: "نظافة وتجميل",
    icon: (
      <>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
        <path d="M3 6h18"></path>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </>
    ),
    activeClass: "bg-primary text-white border-primary",
    inactiveClass: "text-primary bg-primary/10 border-primary/30",
  },
  {
    id: "danger",
    label: "مخاطر أخرى",
    icon: (
      <>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </>
    ),
    activeClass: "bg-danger text-white border-danger",
    inactiveClass: "text-danger bg-danger/10 border-danger/30",
  },
  {
    id: "infrastructure",
    label: "بنية تحتية",
    icon: (
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </>
    ),
    activeClass: "bg-purple-600 text-white border-purple-600",
    inactiveClass: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

export const severities = [
  {
    label: "منخفضة",
    activeClass: "bg-primary text-white border-primary",
    inactiveClass: "text-primary border-primary/20 bg-primary/5",
  },
  {
    label: "متوسطة",
    activeClass: "bg-warning text-white border-warning",
    inactiveClass: "text-warning border-warning/20 bg-warning/5",
  },
  {
    label: "عالية / طارئ",
    activeClass: "bg-danger text-white border-danger",
    inactiveClass: "text-danger border-danger/20 bg-danger/5",
  },
];

export const districts = [
  "الدقي",
  "الزمالك",
  "شبرا الخيمة",
  "القناطر الخيرية",
  "مدينة نصر",
  "المرج الجديدة",
  "المعادي",
  "العبور",
  "التجمع الاول ",
  "التجمع الخامس",
  "الخصوص",
  "أبو زعبل",
  "المنيرة",
  "مسرة",
  "المظلات",
  "السيدة عائشة ",
  "السيدة ذينب  ",
  "الشهداء ",
  "العتبة ",
  "كفر مناقر",
  "المرج",
  "عزبة النخل",
  "المطرية",
  "عين شمس",
  "الزيتون",
  "حدائق القبة",
  "الوايلي",
  "منشية ناصر",
  "غرب شبرا الخيمة",
  "شرق شبرا الخيمة",
  "أول شبرا الخيمة",
  "ثان شبرا الخيمة",
  "قسم أول القاهرة",
  "قسم ثان القاهرة",
  "القاهرة البلد",
  "مركز شبرا",
  "مركز مدينة نصر",
];
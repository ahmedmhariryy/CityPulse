import { riskLevels } from '../../pages/data/qalubiaData'

export default function MapLegend() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 absolute bottom-1  left-6 z-1000">
      <h3 className="font-bold text-gray-800 text-sm mb-3">مفتاح الخريطة الحرارية</h3>
      <div className="space-y-2">
        {riskLevels.map((level) => (
          <div key={level.label} className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">{level.label}</span>
            <div
              className="w-4 h-4 rounded-full shrink-0"
              style={{ backgroundColor: level.color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
import { useState } from 'react';
import HeatMapComponent from '../../components/map/HeatMap';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const timeFilters = [
  { label: 'آخر 24 ساعة', value: '24h' },
  { label: 'آخر 7 أيام', value: '7d' },
  { label: 'كل الوقت', value: 'all' },
];

export default function HeatMapPage() {
  const [activeFilter, setActiveFilter] = useState('24h');

  return (
    <div className="flex flex-row-reverse h-full overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden mr-16 lg:mr-0">
        <main className="p-3 md:p-6 flex flex-col gap-3 md:gap-4 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <CalendarTodayIcon className="text-gray-400 hidden sm:block" fontSize="small" />
            <div className="flex items-center gap-2 flex-wrap">
              {timeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className="px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition"
                  style={{
                    backgroundColor: activeFilter === filter.value ? 'var(--color-primary)' : '#f3f4f6',
                    color: activeFilter === filter.value ? '#ffffff' : '#6b7280',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-xl overflow-hidden">
            <HeatMapComponent timeRange={activeFilter} />
          </div>
        </main>
      </div>
    </div>
  );
}
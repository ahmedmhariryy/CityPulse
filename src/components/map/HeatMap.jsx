import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { adminAPI } from '../../api/api';
import MapLegend from './MapLegend';
import AreaInfoCard from './AreaInfoCard';

const QALYUBIA_BOUNDS = [
  [30.05, 30.95],
  [30.65, 31.45],
];

const DISTRICT_COORDINATES = {
  'الدقي ': [
    [30.1450, 31.2200],
    [30.1500, 31.2450],
    [30.1350, 31.2600],
    [30.1150, 31.2500],
    [30.1100, 31.2250],
    [30.1250, 31.2100],
  ],
  'مدينة نصر': [
    [30.4850, 31.1650],
    [30.4900, 31.1900],
    [30.4750, 31.2050],
    [30.4550, 31.1950],
    [30.4500, 31.1700],
    [30.4650, 31.1600],
  ],
  'المعادي': [
    [30.2000, 31.2000],
    [30.2050, 31.2250],
    [30.1900, 31.2400],
    [30.1700, 31.2300],
    [30.1650, 31.2050],
    [30.1800, 31.1950],
  ],
  'حدائق القبة ': [
    [30.3000, 31.1000],
    [30.3050, 31.1250],
    [30.2900, 31.1400],
    [30.2700, 31.1300],
    [30.2650, 31.1050],
    [30.2800, 31.0950],
  ],
  'الزمالك ': [
    [30.5700, 31.2500],
    [30.5750, 31.2750],
    [30.5600, 31.2900],
    [30.5400, 31.2800],
    [30.5350, 31.2550],
    [30.5500, 31.2400],
  ],
  'السيدة زينب': [
    [30.3650, 31.1850],
    [30.3700, 31.2100],
    [30.3550, 31.2250],
    [30.3350, 31.2150],
    [30.3300, 31.1900],
    [30.3450, 31.1750],
  ],
  'مصر الجديدة': [
    [30.2300, 31.4000],
    [30.2400, 31.4300],
    [30.2200, 31.4500],
    [30.2000, 31.4400],
    [30.1950, 31.4100],
    [30.2100, 31.3900],
  ],
  'رمسيس': [
    [30.2100, 31.3000],
    [30.2200, 31.3300],
    [30.2000, 31.3500],
    [30.1800, 31.3400],
    [30.1750, 31.3100],
    [30.1900, 31.2900],
  ],
};

const getCoordinates = (districtName) => {
  if (DISTRICT_COORDINATES[districtName]) {
    return DISTRICT_COORDINATES[districtName];
  }
  
  const hash = districtName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseLat = 30.2 + (hash % 40) / 100;
  const baseLng = 31.1 + (hash % 30) / 100;
  const offset = 0.015;
  
  return [
    [baseLat + offset, baseLng - offset],
    [baseLat + offset, baseLng + offset],
    [baseLat - offset, baseLng + offset],
    [baseLat - offset, baseLng - offset],
    [baseLat - offset * 0.7, baseLng - offset * 0.8],
    [baseLat + offset * 0.5, baseLng - offset * 0.6],
  ];
};

export default function HeatMap({ timeRange = '24h' }) {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await adminAPI.getHeatmapData(timeRange);
        const data = response.data.data || [];
        
        const areasWithCoords = data.map((area) => ({
          ...area,
          coordinates: getCoordinates(area.name),
          center: getCoordinates(area.name)[0],
        }));
        
        setAreas(areasWithCoords);
      } catch (err) {
        console.error('Error fetching heatmap data:', err);
        setError('تعذر تحميل بيانات الخريطة');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto mb-3"></div>
          <p className="text-slate-500 text-sm font-bold">جاري تحميل الخريطة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl">
        <div className="text-center">
          <p className="text-slate-500 font-bold mb-2">{error}</p>
          <button onClick={() => window.location.reload()} className="text-teal-600 font-bold text-sm hover:underline">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={[30.33, 31.18]}
        zoom={10}
        minZoom={10}
        maxZoom={13}
        maxBounds={QALYUBIA_BOUNDS}
        maxBoundsViscosity={1.0}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {areas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.coordinates}
            pathOptions={{
              color: area.color,
              fillColor: area.color,
              fillOpacity: area.fillOpacity,
              weight: 2,
            }}
            eventHandlers={{
              click: () => setSelectedArea(area),
            }}
          >
            <Tooltip>
              <div className="text-center">
                <p className="font-bold text-sm">{area.name}</p>
                <p className="text-xs">{area.reports} بلاغ</p>
              </div>
            </Tooltip>
          </Polygon>
        ))}
      </MapContainer>

      <MapLegend />

      {selectedArea && (
        <AreaInfoCard
          area={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </div>
  );
}
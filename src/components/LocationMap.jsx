import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const fetchAddressFromCoords = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
    );
    const data = await res.json();
    return data.display_name || null;
  } catch (error) {
    console.error("فشل جلب اسم العنوان:", error);
    return null;
  }
};

const QALYUBIA_BOUNDS = [
  [30.05, 30.95],
  [30.65, 31.45],
];

const QALYUBIA_CENTER = [30.33, 31.18];

const RecenterMap = ({ lat, lng, recenterTrigger }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 15, { duration: 1.2 });
    }
  }, [lat, lng, recenterTrigger]);
  return null;
};

const pinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ClickHandler = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (lat >= 30.05 && lat <= 30.65 && lng >= 30.95 && lng <= 31.45) {
        onSelect(lat, lng);
      }
    },
  });
  return null;
};

const LocationMap = ({ lat, lng, onLocationChange, shouldRecenter }) => {
  const center = lat && lng ? [lat, lng] : QALYUBIA_CENTER;

  const handleMarkerDrag = (e) => {
    const { lat: newLat, lng: newLng } = e.target.getLatLng();
    onLocationChange(newLat, newLng);
  };

  return (
    <div className="relative h-56 rounded-t-2xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        minZoom={10}
        maxZoom={17}
        maxBounds={QALYUBIA_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker
          position={center}
          icon={pinIcon}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDrag }}
        />
        <ClickHandler onSelect={onLocationChange} />
        <RecenterMap lat={lat} lng={lng} recenterTrigger={shouldRecenter} />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
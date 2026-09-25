"use client";
 
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Polyline,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { Branch, DeliveryZone, RouteLine } from "../types/gis";
 

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
 
// --- Nümunə data (real layihədə bu backend-dən fetch olunur) ---
 
const branches: Branch[] = [
  { id: 1, name: "Nizami filialı", lat: 40.3719, lng: 49.8399, category: "restaurant" },
  { id: 2, name: "28 May filialı", lat: 40.3765, lng: 49.8419, category: "restaurant" },
  { id: 3, name: "Anbar - Yasamal", lat: 40.3823, lng: 49.8244, category: "warehouse" },
];
 
const deliveryZone: DeliveryZone = {
  type: "Feature",
  properties: { zoneName: "Mərkəz zonası", color: "#2563eb" },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [49.83, 40.365],
        [49.845, 40.365],
        [49.845, 40.375],
        [49.83, 40.375],
        [49.83, 40.365],
      ],
    ],
  },
};
 
const route: RouteLine = {
  type: "Feature",
  properties: { routeName: "Kuryer marşrutu" },
  geometry: {
    type: "LineString",
    coordinates: [
      [49.8399, 40.3719],
      [49.8419, 40.3765],
      [49.8244, 40.3823],
    ],
  },
};
 
const routePositions: [number, number][] = route.geometry.coordinates.map(
  ([lng, lat]) => [lat, lng]
);
 
export default function MapView() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
 
  return (
    <MapContainer
      center={[40.3719, 49.8399]}
      zoom={13}
      style={{ height: "90vh", width: "100%", borderRadius: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 
      <GeoJSON
        data={deliveryZone as any}
        style={{ color: deliveryZone.properties.color, weight: 2, fillOpacity: 0.1 }}
      />
 
      <Polyline positions={routePositions} color="#dc2626" weight={3} />
 
      <MarkerClusterGroup chunkedLoading>
        {branches.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]}>
            <Popup>
              <strong>{b.name}</strong>
              <br />
              Kateqoriya: {b.category}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
 
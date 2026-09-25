"use client";
 
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
 
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
 
// Başlanğıc və hədəf nöqtə (real layihədə bunlar istifadəçi seçimi/API-dən gəlir)
const start: [number, number] = [40.3719, 49.8399]; // Nizami filialı
const end: [number, number] = [40.3823, 49.8244]; // Anbar - Yasamal
 
function RoutingLayer() {
  const map = useMap();
  const controlRef = useRef<L.Routing.Control | null>(null);
 
  useEffect(() => {
    if (!map) return;
 
    controlRef.current = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],

      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
      routeWhileDragging: false,
      show: true, 
    }).addTo(map);
 
    return () => {
      try {
        if (controlRef.current) {
          map.removeControl(controlRef.current);
        }
      } catch {
      }
    };
  }, [map]);
 
  return null;
}
 
export default function RouteView() {
  return (
    <MapContainer
      center={start}
      zoom={13}
      style={{ height: "90vh", width: "100%", borderRadius: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingLayer />
    </MapContainer>
  );
}
 
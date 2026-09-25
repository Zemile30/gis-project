"use client";
 
import dynamic from "next/dynamic";
 
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <p>Xəritə yüklənir...</p>,
});
 
export default function MapWrapper() {
  return <MapView />;
}
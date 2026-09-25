export interface Branch {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: "restaurant" | "warehouse" | "office";
}
 
export interface DeliveryZone {
  type: "Feature";
  properties: {
    zoneName: string;
    color: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}
 
export interface RouteLine {
  type: "Feature";
  properties: {
    routeName: string;
  };
  geometry: {
    type: "LineString";
    coordinates: number[][]; 
  };
}
import L from "leaflet";

export function getBounds(features: any[]) {
  const latlngs = features.flatMap((f) => {
    const coords = f.geometry.coordinates;

    // Polygon
    if (f.geometry.type === "Polygon") {
      return coords[0].map(([lng, lat]: number[]) => [lat, lng]);
    }

    // MultiPolygon
    if (f.geometry.type === "MultiPolygon") {
      return coords.flat(2).map(([lng, lat]: number[]) => [lat, lng]);
    }

    return [];
  });

  return L.latLngBounds(latlngs as any);
}

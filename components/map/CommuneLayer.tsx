"use client";

import { GeoJSON, useMap } from "react-leaflet";
import communes from "@/lib/khm_admin3.json";

export default function CommuneLayer({
  district,
  selectedCommune,
  onSelect,
}: any) {
  const map = useMap();

  const filtered = communes.features.filter(
    (f: any) => f.properties.adm2_name === district,
  );

  return (
    <GeoJSON
      data={
        {
          type: "FeatureCollection",
          features: filtered,
        } as any
      }
      style={(feature: any) => {
        const name = feature.properties.adm3_name;
        const isSelected = name === selectedCommune;

        return {
          color: "#ef4444",
          weight: isSelected ? 3 : 1,
          fillColor: isSelected ? "#f87171" : "#fca5a5",
          fillOpacity: isSelected ? 0.6 : 0.2,
        };
      }}
      onEachFeature={(feature: any, layer) => {
        const name = feature.properties.adm3_name;

        layer.bindTooltip(name);

        layer.on("click", () => {
          onSelect(name);

          // 👇 zoom to selected commune only
          map.fitBounds(layer.getBounds(), {
            padding: [20, 20],
          });
        });
      }}
    />
  );
}

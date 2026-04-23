"use client";

import { GeoJSON, useMap } from "react-leaflet";
import provinces from "@/lib/khm_admin1.json";

export default function ProvinceLayer({ onSelect }: any) {
  const map = useMap();

  return (
    <GeoJSON
      data={provinces as any}
      style={() => ({
        color: "#2563eb",
        weight: 2,
        fillOpacity: 0.1,
      })}
      onEachFeature={(feature: any, layer) => {
        const name = feature.properties.adm1_name;

        layer.bindTooltip(name);

        layer.on({
          click: () => {
            onSelect(name);
            map.fitBounds(layer.getBounds(), { padding: [20, 20] });
          },
        });
      }}
    />
  );
}

"use client";

import { GeoJSON, useMap } from "react-leaflet";
import districts from "@/lib/khm_admin2.json";

export default function DistrictLayer({ province, onSelect }: any) {
  const map = useMap();

  const filtered = districts.features.filter(
    (f: any) => f.properties.adm1_name === province,
  );

  return (
    <GeoJSON
      data={
        {
          type: "FeatureCollection",
          features: filtered,
        } as any
      }
      style={() => ({
        color: "#16a34a",
        weight: 2,
        fillColor: "#22c55e",
        fillOpacity: 0.2,
      })}
      onEachFeature={(feature: any, layer) => {
        const name = feature.properties.adm2_name;

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

"use client";

import { GeoJSON, useMap } from "react-leaflet";
import { Feature, FeatureCollection } from "geojson";
import provinces from "@/lib/khm_admin1.json";

type ProvinceFeature = Feature<GeoJSON.Geometry, { adm1_name: string }>;
const provincesData = provinces as FeatureCollection<
  GeoJSON.Geometry,
  { adm1_name: string }
>;

export default function ProvinceLayer({ onSelect }: any) {
  const map = useMap();

  return (
    <GeoJSON
      data={provincesData}
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
            map.fitBounds((layer as any).getBounds(), { padding: [20, 20] });
          },
        });
      }}
    />
  );
}

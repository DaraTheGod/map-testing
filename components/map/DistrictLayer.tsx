"use client";

import { GeoJSON, useMap } from "react-leaflet";
import { Feature, FeatureCollection } from "geojson";
import districts from "@/lib/khm_admin2.json";

type DistrictFeature = Feature<GeoJSON.Geometry, { adm1_name: string; adm2_name: string }>;
const districtsData = districts as FeatureCollection<GeoJSON.Geometry, { adm1_name: string; adm2_name: string }>;

export default function DistrictLayer({ province, onSelect }: any) {
  const map = useMap();

  const filtered = districtsData.features.filter(
    (f) => f.properties.adm1_name === province,
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
            map.fitBounds((layer as any).getBounds(), { padding: [20, 20] });
          },
        });
      }}
    />
  );
}

"use client";

import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { Feature, FeatureCollection } from "geojson";
import communes from "@/lib/khm_admin3.json";

interface CommuneFeature extends Feature<
  GeoJSON.Geometry,
  { adm2_name: string; adm3_name: string }
> {}

interface CommuneLayerProps {
  district: string;
  selectedCommune: string | null;
  onSelect: (commune: string) => void;
}

export default function CommuneLayer({
  district,
  selectedCommune,
  onSelect,
}: CommuneLayerProps) {
  const map = useMap();

  const filtered = communes.features.filter(
    (f) => (f as CommuneFeature).properties.adm2_name === district,
  );

  return (
    <GeoJSON
      data={
        {
          type: "FeatureCollection",
          features: filtered,
        } as FeatureCollection
      }
      style={(feature) => {
        if (!feature) return {};
        const communeFeature = feature as CommuneFeature;
        const name = communeFeature.properties.adm3_name;
        const isSelected = name === selectedCommune;

        return {
          color: "#ef4444",
          weight: isSelected ? 3 : 1,
          fillColor: isSelected ? "#f87171" : "#fca5a5",
          fillOpacity: isSelected ? 0.6 : 0.2,
        };
      }}
      onEachFeature={(feature, layer) => {
        if (!feature) return;
        const communeFeature = feature as CommuneFeature;
        const name = communeFeature.properties.adm3_name;

        layer.bindTooltip(name);

        layer.on("click", () => {
          onSelect(name);

          // 👇 zoom to selected commune only
          map.fitBounds((layer as any).getBounds(), {
            padding: [20, 20],
          });
        });
      }}
    />
  );
}

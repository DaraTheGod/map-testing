"use client";

import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { Feature, FeatureCollection } from "geojson";
import communes from "@/lib/khm_admin3.json";

type CommuneFeature = Feature<
  GeoJSON.Geometry,
  { adm2_name: string; adm3_name: string }
>;
const communesData = communes as FeatureCollection<
  GeoJSON.Geometry,
  { adm2_name: string; adm3_name: string }
>;

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

  const filtered = communesData.features.filter(
    (f) => f.properties.adm2_name === district,
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
          color: "#000000",
          weight: isSelected ? 3 : 1,
          fillColor: isSelected ? "#FFFFFF" : "#FFFFFF",
          // fillOpacity: isSelected ? 0.6 : 0.2,
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

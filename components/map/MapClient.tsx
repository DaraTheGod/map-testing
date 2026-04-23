"use client";

import provinces from "@/lib/khm_admin1.json";
import districts from "@/lib/khm_admin2.json";
import { Feature, FeatureCollection } from "geojson";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import ProvinceLayer from "./ProvinceLayer";
import DistrictLayer from "./DistrictLayer";
import CommuneLayer from "./CommuneLayer";
import EventMarker from "./MapMarker";
import EventCard from "../EventCard";
import CreateEventPanel from "../CreateEventPanel";
import CreationPin from "./CreationPin";
import { events as initialEvents } from "@/lib/events";
import { getBounds } from "@/lib/getBounds";

type ProvinceFeature = Feature<GeoJSON.Geometry, { adm1_name: string }>;
const provincesData = provinces as FeatureCollection<
  GeoJSON.Geometry,
  { adm1_name: string }
>;

type DistrictFeature = Feature<
  GeoJSON.Geometry,
  { adm1_name: string; adm2_name: string }
>;
const districtsData = districts as FeatureCollection<
  GeoJSON.Geometry,
  { adm1_name: string; adm2_name: string }
>;

function MapController({ setMap }: any) {
  const map = useMap();
  useEffect(() => {
    setMap(map);
  }, [map]);
  return null;
}

function MapClickHandler({
  isCreating,
  onMapClick,
}: {
  isCreating: boolean;
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (isCreating) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

export default function MapClient() {
  const [province, setProvince] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [commune, setCommune] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Creation mode state
  const [isCreating, setIsCreating] = useState(false);
  const [pendingPin, setPendingPin] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [events, setEvents] = useState<any[]>(initialEvents);

  const handleMapClick = (lat: number, lng: number) => {
    setPendingPin({ lat, lng });
  };

  const handlePublish = (formData: any) => {
    const newEvent = {
      id: Date.now(),
      ...formData,
      lat: pendingPin!.lat,
      lng: pendingPin!.lng,
    };
    setEvents((prev) => [...prev, newEvent]);
    setPendingPin(null);
    setIsCreating(false);
  };

  const handleCancelCreation = () => {
    setIsCreating(false);
    setPendingPin(null);
  };

  return (
    <div className="relative">
      {/* Creation mode banner */}
      {isCreating && !pendingPin && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1001] bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
          <span>📍</span>
          <span>Click anywhere on the map to place your pin</span>
          <button
            onClick={handleCancelCreation}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div
        className={`h-[85vh] w-full rounded-2xl overflow-hidden transition-all ${
          isCreating
            ? "ring-2 ring-blue-500 ring-offset-2 cursor-crosshair"
            : ""
        }`}
      >
        <MapContainer center={[12, 105]} zoom={7} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController setMap={setMapInstance} />
          <MapClickHandler
            isCreating={isCreating}
            onMapClick={handleMapClick}
          />

          {/* 🟢 PROVINCE */}
          {!province && (
            <ProvinceLayer
              selected={province}
              onSelect={(name: string) => {
                if (isCreating) return;
                setProvince(name);
                setDistrict(null);
                setCommune(null);
              }}
            />
          )}

          {/* 🟡 DISTRICT */}
          {province && !district && (
            <DistrictLayer
              province={province}
              selected={district}
              onSelect={(name: string) => {
                if (isCreating) return;
                setDistrict(name);
                setCommune(null);
              }}
            />
          )}

          {/* 🔵 COMMUNE */}
          {province && district && (
            <CommuneLayer
              district={district}
              selectedCommune={commune}
              onSelect={(name: string) => {
                if (isCreating) return;
                setCommune(name);
              }}
            />
          )}

          {/* 📍 EVENTS */}
          {events.map((ev) => (
            <EventMarker key={ev.id} event={ev} onSelect={setSelectedEvent} />
          ))}

          {/* 🔴 PENDING CREATION PIN */}
          {pendingPin && (
            <CreationPin lat={pendingPin.lat} lng={pendingPin.lng} />
          )}
        </MapContainer>
      </div>

      {/* 📦 EVENT CARD */}
      {!isCreating && (
        <EventCard
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* 📝 CREATE EVENT PANEL */}
      {pendingPin && (
        <CreateEventPanel
          lat={pendingPin.lat}
          lng={pendingPin.lng}
          onPublish={handlePublish}
          onCancel={handleCancelCreation}
          onRepin={() => setPendingPin(null)}
        />
      )}

      {/* 🧭 CONTROLS */}
      <div className="flex gap-2 mt-5 items-center justify-between">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              if (!mapInstance) return;
              if (commune) {
                setCommune(null);
                const districtFeatures = districtsData.features.filter(
                  (f: any) => f.properties.adm2_name === district,
                );
                mapInstance.fitBounds(getBounds(districtFeatures), {
                  padding: [20, 20],
                });
                return;
              }
              if (district) {
                setDistrict(null);
                const provinceFeatures = districtsData.features.filter(
                  (f: any) => f.properties.adm1_name === province,
                );
                mapInstance.fitBounds(getBounds(provinceFeatures), {
                  padding: [20, 20],
                });
                return;
              }
              if (province) {
                setProvince(null);
                mapInstance.fitBounds(getBounds(provincesData.features), {
                  padding: [20, 20],
                });
              }
            }}
            className="px-3 py-1 bg-gray-200 text-black rounded"
          >
            🔙 Back
          </button>

          {province && (
            <p className="text-sm text-gray-600">Province: {province}</p>
          )}
          {district && (
            <p className="text-sm text-gray-600">District: {district}</p>
          )}
          {commune && (
            <p className="text-sm text-gray-600">Commune: {commune}</p>
          )}
        </div>

        {/* ➕ CREATE EVENT BUTTON */}
        {!isCreating ? (
          <button
            onClick={() => {
              setSelectedEvent(null);
              setIsCreating(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow transition-all"
          >
            <span className="text-base">+</span>
            Add Event / Place
          </button>
        ) : (
          <button
            onClick={handleCancelCreation}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold rounded-xl transition-all"
          >
            ✕ Cancel
          </button>
        )}
      </div>
    </div>
  );
}

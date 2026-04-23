"use client";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const icon = L.divIcon({
  html: `<div style="width:12px;height:12px;background:red;border-radius:50%;border:2px solid white;"></div>`,
  className: "",
});

export default function UserLocationMarker() {
  const map = useMap();
  const [pos, setPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    // delay helps bypass some browser blocking timing issues
    const timer = setTimeout(() => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (p) => {
          const lat = p.coords.latitude;
          const lng = p.coords.longitude;

          setPos([lat, lng]);
          map.setView([lat, lng], 13);
        },
        (err) => {
          console.error("Geo error code:", err.code);
          console.error("Geo error msg:", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
        },
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [map]);

  if (!pos) return null;

  return (
    <Marker position={pos} icon={icon}>
      <Popup>📍 You are here</Popup>
    </Marker>
  );
}

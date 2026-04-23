"use client";

import { Marker } from "react-leaflet";
import L from "leaflet";

const creationIcon = L.divIcon({
  html: `
    <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
      <div style="
        width: 20px;
        height: 20px;
        background: #2563eb;
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(37,99,235,0.5);
        animation: bounce 0.4s ease;
      "></div>
      <div style="
        width: 6px;
        height: 6px;
        background: rgba(37,99,235,0.3);
        border-radius: 50%;
        margin-top: 2px;
        animation: shadow-pulse 1.5s ease-in-out infinite;
      "></div>
    </div>
    <style>
      @keyframes bounce {
        0% { transform: rotate(-45deg) translateY(-20px); opacity: 0; }
        60% { transform: rotate(-45deg) translateY(4px); }
        100% { transform: rotate(-45deg) translateY(0); opacity: 1; }
      }
      @keyframes shadow-pulse {
        0%, 100% { transform: scale(1); opacity: 0.4; }
        50% { transform: scale(1.4); opacity: 0.2; }
      }
    </style>
  `,
  className: "",
  iconAnchor: [10, 22],
});

export default function CreationPin({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  return <Marker position={[lat, lng]} icon={creationIcon} />;
}

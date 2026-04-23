"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const CATEGORY_COLORS: Record<string, string> = {
  Music: "#7c3aed",
  Technology: "#2563eb",
  Health: "#16a34a",
  Food: "#ea580c",
  Sports: "#0891b2",
  Art: "#db2777",
  Education: "#ca8a04",
  Travel: "#059669",
  Business: "#475569",
  Other: "#6b7280",
};

function makeIcon(color: string) {
  return L.divIcon({
    html: `
      <div style="
        width: 14px;
        height: 14px;
        background: ${color};
        border: 2.5px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    className: "",
    iconAnchor: [7, 7],
  });
}

export default function MapMarker({ event, onSelect }: any) {
  const color = CATEGORY_COLORS[event.category] ?? "#6b7280";

  return (
    <Marker
      position={[event.lat, event.lng]}
      icon={makeIcon(color)}
      eventHandlers={{
        click: () => onSelect(event),
      }}
    >
      <Popup>
        <div className="text-sm">
          <span
            className="text-xs px-1.5 py-0.5 rounded-full text-white font-medium"
            style={{ background: color }}
          >
            {event.category}
          </span>
          <p className="font-semibold mt-1">{event.title}</p>
          <p className="text-gray-500 text-xs">{event.location}</p>
        </div>
      </Popup>
    </Marker>
  );
}

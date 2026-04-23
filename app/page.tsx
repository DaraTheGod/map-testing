"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/map/MapClient"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Cambodia Map</h1>
      <MapClient />
    </main>
    
  );
}

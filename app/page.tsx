"use client";

import dynamic from "next/dynamic";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MapPin, User } from "lucide-react";

// Dynamically import MapClient to prevent SSR issues
const MapClient = dynamic(() => import("@/components/map/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-400 font-medium">
        Loading Map Data...
      </div>
    </div>
  ),
});

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1. Loading State
  if (status === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Authenticated State (Full Map Interface)
  if (status === "authenticated") {
    return (
      <main className="h-screen w-full relative overflow-hidden">
        {/* Profile Button Overlay */}
        <button
          onClick={() => router.push("/profile")}
          className="absolute top-6 right-6 z-[1001] bg-white/90 backdrop-blur shadow-xl p-3 rounded-2xl hover:bg-white transition-all active:scale-95 border border-slate-200 flex items-center gap-2"
        >
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
              Profile
            </p>
            <p className="text-xs font-bold text-slate-700">
              {session.user?.name}
            </p>
          </div>
          <img
            src={session.user?.image || ""}
            className="w-8 h-8 rounded-full border border-slate-100"
            alt="User"
          />
        </button>

        {/* The Map Component handles the 'Add Event' and 'Back' controls internally */}
        <div className="h-full w-full">
          <MapClient />
        </div>
      </main>
    );
  }

  // 3. Unauthenticated State (Landing / Login Overlay)
  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-100">
      {/* Background Map - Non-interactive version for aesthetic */}
      <div className="absolute inset-0 z-0 grayscale-[20%] opacity-80 pointer-events-none">
        <MapClient />
      </div>

      {/* Modern Overlay Content */}
      <div className="relative z-10 flex h-full items-center justify-center bg-slate-900/20 backdrop-blur-[3px]">
        <div className="w-full max-w-md p-10 mx-4 bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 text-center">
          <div className="mb-10">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-xl mb-6">
              <MapPin className="text-white w-12 h-12" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Kompong Connect
            </h1>
            <p className="text-slate-500 mt-3 text-lg leading-relaxed">
              Sign in to discover community events <br /> and local map markers.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center gap-4 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-[0.98]"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5 brightness-150"
              />
              Continue with Google
            </button>
            <p className="text-xs text-slate-400">
              Access the disaster map & community platform.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-600">
            Cambodia Community Platform
          </p>
        </div>
      </div>
    </main>
  );
}

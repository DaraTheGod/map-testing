"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Map as MapIcon, LogOut, ShieldCheck } from "lucide-react";

// 1. Define a custom type that extends the default session
type CustomSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  googleId?: string; // Adding the missing field
};

export default function Profile() {
  // 2. Cast the data as your CustomSession
  const { data, status } = useSession();
  const session = data as CustomSession | null;

  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  // 3. Handle protection logic
  if (status === "unauthenticated" || !session) {
    router.push("/");
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        {/* <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 font-bold text-blue-600 italic tracking-tight">
            KOMPONG CONNECT
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 text-sm font-semibold"
          >
            <MapIcon size={18} />
            Explore Map
          </button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={session.user?.image ?? ""}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-50 shadow-lg object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              {session.user?.name ?? "Guest User"}
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              {session.user?.email ?? "No email linked"}
            </p>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2.5 rounded-xl transition-colors font-semibold text-sm"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          {/* Account Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" size={20} />
                Account Verification
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Provider</span>
                  <span className="text-sm font-bold text-slate-700 uppercase">
                    Google
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Google ID</span>
                  <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">
                    {/* Now TypeScript knows googleId exists */}
                    {session.googleId ?? "Verified"}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="bg-green-100 text-green-700 text-[10px] px-2.5 py-1 rounded-full font-black tracking-wider">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl shadow-xl text-white">
              <h3 className="font-bold text-lg mb-2">Ready to contribute?</h3>
              <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                You can now view markers on the map and participate in community
                events.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-white text-blue-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all active:scale-95"
              >
                Go to Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

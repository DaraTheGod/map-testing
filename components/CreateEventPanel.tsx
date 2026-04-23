"use client";

import { useState } from "react";

const CATEGORIES = [
  "Music",
  "Technology",
  "Health",
  "Food",
  "Sports",
  "Art",
  "Education",
  "Travel",
  "Business",
  "Other",
];
const TYPES = ["Outdoor", "Indoor", "Online", "Hybrid"];

interface Props {
  lat: number;
  lng: number;
  onPublish: (data: any) => void;
  onCancel: () => void;
  onRepin: () => void;
}

export default function CreateEventPanel({
  lat,
  lng,
  onPublish,
  onCancel,
  onRepin,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Music",
    location: "",
    date: "",
    time: "",
    agenda: "",
    capacity: "",
    type: "Outdoor",
    price: "Free",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.location.trim()) e.location = "Location name is required";
    if (!form.date) e.date = "Date is required";
    if (!form.time) e.time = "Time is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onPublish({
      ...form,
      capacity: form.capacity ? parseInt(form.capacity) : null,
    });
  };

  return (
    <div
      className="absolute top-4 right-4 w-[340px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[1001] overflow-hidden"
      style={{ animation: "slideIn 0.25s ease" }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Header */}
      <div className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base">📍 New Pin</h2>
          <p className="text-blue-200 text-xs mt-0.5">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRepin}
            title="Move pin"
            className="text-xs bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-lg transition"
          >
            🔄 Repin
          </button>
          <button
            onClick={onCancel}
            className="text-blue-200 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Form body */}
      <div className="p-4 space-y-3 max-h-[65vh] overflow-y-auto">
        {/* Title */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Title *
          </label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Sunset Jazz Night"
            className={`w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.title ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-0.5">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Category + Type */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location name */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Location Name *
          </label>
          <input
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Riverside Park, Phnom Penh"
            className={`w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.location ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-0.5">{errors.location}</p>
          )}
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Date *
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={`w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.date ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-0.5">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Time *
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              className={`w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.time ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-xs mt-0.5">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Agenda */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Agenda
          </label>
          <input
            value={form.agenda}
            onChange={(e) => set("agenda", e.target.value)}
            placeholder="e.g. Opening, Keynote, Q&A"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Capacity + Price */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Capacity
            </label>
            <input
              type="number"
              min={1}
              value={form.capacity}
              onChange={(e) => set("capacity", e.target.value)}
              placeholder="e.g. 100"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Price
            </label>
            <input
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="Free or $5"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 px-3 py-2 border border-gray-300 text-gray-600 text-sm rounded-xl hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow transition"
        >
          🚀 Publish
        </button>
      </div>
    </div>
  );
}

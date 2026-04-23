export default function EventCard({ event, onClose }: any) {
  if (!event) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-white shadow-xl rounded-2xl p-5 z-[1000] border border-gray-200">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      {/* Category */}
      <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">
        {event.category}
      </span>

      {/* Title */}
      <h2 className="font-bold text-lg mt-2 text-gray-900">{event.title}</h2>

      {/* Description */}
      <p className="text-gray-700 text-sm mt-1 line-clamp-2">
        {event.description}
      </p>

      {/* Info */}
      <div className="mt-3 text-sm space-y-1 text-gray-800">
        <p>📍 {event.location}</p>
        <p>
          🗓 {event.date} • {event.time}
        </p>
        <p>🏠 {event.type}</p>
        <p>👥 {event.capacity ? `${event.capacity} people` : "Unlimited"}</p>
      </div>

      {/* Agenda */}
      {event.agenda && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500">Agenda</p>
          <p className="text-sm text-gray-800">{event.agenda}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold text-blue-600">
          {event.price === "Free" ? "Free" : event.price}
        </span>

        <button className="text-sm bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800">
          View Details
        </button>
      </div>
    </div>
  );
}

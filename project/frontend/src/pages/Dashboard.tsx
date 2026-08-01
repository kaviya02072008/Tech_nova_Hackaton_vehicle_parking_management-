import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "@/components/booking/BookingModal";
import {
  Car,
  ParkingCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  const [floor, setFloor] = useState("Ground Floor");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const navigate = useNavigate();

  const [slots, setSlots] = useState([
    { id: "A1", status: "available" },
    { id: "A2", status: "available" },
    { id: "A3", status: "occupied" },
    { id: "A4", status: "available" },
    { id: "A5", status: "available" },
    { id: "A6", status: "available" },
    { id: "A7", status: "available" },
    { id: "A8", status: "reserved" },
    { id: "A9", status: "available" },
    { id: "A10", status: "available" },
    { id: "A11", status: "available" },
    { id: "A12", status: "available" },
  ]);

  const getColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20";
      case "occupied":
        return "bg-rose-500 text-white opacity-90 shadow-sm";
      case "reserved":
        return "bg-amber-500 text-white opacity-90 shadow-sm";
      default:
        return "bg-slate-400 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Actions Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>🚗</span> Smart Mall Parking Dashboard
            </h1>
            <p className="text-slate-500 mt-2 text-base font-medium">
              Manage parking slots efficiently.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/customer/history")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
            >
              📋 Booking History
            </button>

            <button
              onClick={() => navigate("/customer/profile")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-md shadow-purple-500/20 transition-all active:scale-95"
            >
              👤 My Profile
            </button>

            <button
              onClick={() => navigate("/customer/notifications")}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              🔔 Notifications
            </button>

            <button
              onClick={() => navigate("/customer/contact")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
            >
              📞 Contact Us
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 font-medium text-sm">Available</p>
                <h2 className="text-4xl font-extrabold text-emerald-600 mt-1">48</h2>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <ParkingCircle size={40} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 font-medium text-sm">Occupied</p>
                <h2 className="text-4xl font-extrabold text-rose-500 mt-1">0</h2>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-500">
                <Car size={40} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 font-medium text-sm">Reserved</p>
                <h2 className="text-4xl font-extrabold text-amber-500 mt-1">0</h2>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl text-amber-500">
                <Clock size={40} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 font-medium text-sm">Today's Bookings</p>
                <h2 className="text-4xl font-extrabold text-blue-600 mt-1">90</h2>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <CheckCircle size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* Live Parking Grid Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Live Parking Slots
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Current Floor: <span className="text-blue-600 font-semibold">{floor}</span>
              </p>
            </div>

            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="border border-slate-200 bg-slate-50/80 rounded-2xl px-4 py-2.5 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>Ground Floor</option>
              <option>Floor 1</option>
              <option>Floor 2</option>
              <option>Floor 3</option>
            </select>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 bg-slate-50 rounded-2xl px-5 py-3 border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm"></div>
              <span className="text-sm font-semibold text-slate-700">Available</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-rose-500 shadow-sm"></div>
              <span className="text-sm font-semibold text-slate-700">Occupied</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-md bg-amber-500 shadow-sm"></div>
              <span className="text-sm font-semibold text-slate-700">Reserved</span>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 pt-2">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => {
                  if (slot.status === "available") {
                    setSelectedSlot(slot.id);
                    setIsBookingOpen(true);
                  }
                }}
                className={`${getColor(
                  slot.status
                )} rounded-2xl h-32 p-4 transition-all duration-200 flex flex-col justify-between items-center text-center ${
                  slot.status === "available"
                    ? "cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25"
                    : "cursor-not-allowed"
                }`}
              >
                <h2 className="text-2xl font-black">{slot.id}</h2>

                <p className="capitalize text-xs font-semibold tracking-wide">
                  {slot.status}
                </p>

                {slot.status === "available" ? (
                  <p className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/20 border border-white/30 backdrop-blur-sm w-full truncate">
                    Click to Book
                  </p>
                ) : (
                  <div className="h-4" />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      <BookingModal
        slot={selectedSlot}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBooked={() => {
          setSlots((prev) =>
            prev.map((slot) =>
              slot.id === selectedSlot
                ? { ...slot, status: "occupied" }
                : slot
            )
          );
        }}
      />
    </div>
  );
}
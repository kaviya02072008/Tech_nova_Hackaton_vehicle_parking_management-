import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Clock,
  ShieldCheck,
  Tag,
  X,
  Sparkles,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
} from "lucide-react";

type BookingModalProps = {
  slot: string;
  isOpen: boolean;
  onClose: () => void;
  onBooked: () => void;
};

export default function BookingModal({
  slot,
  isOpen,
  onClose,
  onBooked,
}: BookingModalProps) {
  const navigate = useNavigate();

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [duration, setDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cash">("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const price = duration * 40;

  if (!isOpen) return null;

  const handleBooking = () => {
    if (!vehicleNumber.trim()) {
      alert("Please enter your vehicle number.");
      return;
    }

    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID (e.g., username@upi).");
      return;
    }

    if (paymentMethod === "card" && !cardNumber.trim()) {
      alert("Please enter your card number.");
      return;
    }

    const booking = {
      name: "Customer",
      vehicle: vehicleNumber,
      vehicleType,
      slot,
      floor: "Ground Floor",
      duration,
      price,
      paymentMethod:
        paymentMethod === "upi"
          ? `UPI (${upiId || "GPay"})`
          : paymentMethod === "card"
          ? `Card (**** ${cardNumber.slice(-4) || "1234"})`
          : "Pay at Counter (Cash)",
      paymentStatus: "Paid",
      bookingTime: new Date().toLocaleString(),
    };

    onBooked();
    onClose();

    navigate("/customer/qr", {
      state: booking,
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex justify-center items-center z-50 p-4 transition-all duration-300">
      {/* Modal Container */}
      <div className="bg-white/95 backdrop-blur-2xl border border-slate-100 w-full max-w-lg rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] p-6 sm:p-8 text-slate-800 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Gradient Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Book Parking Slot
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Complete parking details & payment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">

          {/* Slot Number (ReadOnly) */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag size={16} className="text-emerald-600" />
              Slot Number
            </label>

            <div className="relative">
              <input
                value={slot}
                readOnly
                className="w-full border border-emerald-200/80 rounded-2xl p-3 bg-emerald-50/70 text-emerald-800 font-bold text-lg cursor-not-allowed outline-none shadow-inner tracking-wide"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                Selected
              </span>
            </div>
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Car size={16} className="text-blue-600" />
              Vehicle Number
            </label>

            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="TN39AB1234"
              className="w-full border border-slate-200 rounded-2xl p-3 bg-slate-50/80 text-slate-900 placeholder:text-slate-400 font-semibold uppercase tracking-wider focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700">
              Vehicle Type
            </label>

            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full border border-slate-200 rounded-2xl p-3 bg-slate-50/80 text-slate-800 font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none transition-all cursor-pointer"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="SUV">SUV</option>
                <option value="EV">EV</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Clock size={16} className="text-amber-500" />
              Duration (Hours)
            </label>

            <div className="relative">
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full border border-slate-200 rounded-2xl p-3 bg-slate-50/80 text-slate-800 font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour} Hour{hour > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 flex items-center justify-between">
              <span>Payment Options</span>
              <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                <Lock size={12} /> 256-Bit Encrypted
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === "upi"
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <QrCode size={18} className="text-blue-600" />
                <span>UPI / GPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <CreditCard size={18} className="text-purple-600" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                  paymentMethod === "cash"
                    ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-slate-50/80 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Banknote size={18} className="text-emerald-600" />
                <span>Counter</span>
              </button>
            </div>
          </div>

          {/* Dynamic Payment Input Field */}
          {paymentMethod === "upi" && (
            <div className="animate-in fade-in duration-200">
              <label className="block mb-1 text-xs font-semibold text-slate-600">
                UPI ID (GPay / PhonePe / Paytm)
              </label>
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="mobileOrUsername@upi"
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/80 text-sm font-medium focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="animate-in fade-in duration-200">
              <label className="block mb-1 text-xs font-semibold text-slate-600">
                Card Number
              </label>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4532 •••• •••• 8921"
                maxLength={19}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50/80 text-sm font-mono focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
              />
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-medium animate-in fade-in duration-200">
              💡 You can pay cash or scan QR code directly at the mall exit/entry gate counter.
            </div>
          )}

          {/* Total Price Card */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-blue-100/50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Sparkles size={16} className="text-blue-600" />
                Total Price
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Rate: ₹40 per hour</p>
            </div>

            <p className="text-3xl font-black text-blue-600 tracking-tight">
              ₹{price}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold transition-all duration-200 active:scale-95 text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleBooking}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-600/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-sm"
            >
              Confirm Booking
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
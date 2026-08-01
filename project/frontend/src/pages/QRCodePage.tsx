import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Car,
  MapPin,
  Clock,
  IndianRupee,
} from "lucide-react";

type Booking = {
  name: string;
  vehicle: string;
  vehicleType: string;
  slot: string;
  floor: string;
  duration: number;
  price: number;
  bookingTime: string;
};

export default function QRCodePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state as Booking | null;

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold text-red-600">
          No Booking Found
        </h1>

        <button
          onClick={() => navigate("/customer/dashboard")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-slate-100 flex justify-center items-center p-8">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white p-6 text-center">

          <CheckCircle size={50} className="mx-auto mb-3" />

          <h1 className="text-3xl font-bold">
            Booking Confirmed
          </h1>

          <p className="mt-2 text-blue-100">
            Smart Mall Parking
          </p>

        </div>

        {/* QR Code */}
        <div className="flex justify-center mt-8">
          <QRCode
            value={JSON.stringify(booking)}
            size={220}
          />
        </div>

        {/* Booking Details */}
        <div className="p-8 space-y-4">

          <div className="flex items-center gap-3">
            <Car className="text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Vehicle Number</p>
              <h2 className="font-semibold">
                {booking.vehicle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Car className="text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Vehicle Type</p>
              <h2 className="font-semibold">
                {booking.vehicleType}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" />
            <div>
              <p className="text-gray-500 text-sm">Parking Slot</p>
              <h2 className="font-semibold">
                {booking.slot}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Floor</p>
              <h2 className="font-semibold">
                {booking.floor}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-purple-600" />
            <div>
              <p className="text-gray-500 text-sm">Duration</p>
              <h2 className="font-semibold">
                {booking.duration} Hour(s)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IndianRupee className="text-emerald-600" />
            <div>
              <p className="text-gray-500 text-sm">Amount Paid</p>
              <h2 className="font-semibold">
                ₹{booking.price}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="text-orange-500" />
            <div>
              <p className="text-gray-500 text-sm">Booking Time</p>
              <h2 className="font-semibold">
                {booking.bookingTime}
              </h2>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="p-6 border-t flex flex-col gap-3">

          <button
            onClick={() => window.print()}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            Download / Print QR
          </button>

          <button
            onClick={() => navigate("/customer/dashboard")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}
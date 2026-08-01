import { useState } from "react";
import { CheckCircle, QrCode, ShieldCheck } from "lucide-react";

export default function QRScanner() {
  const [verified, setVerified] = useState(false);

  const booking = {
    customer: "Kaviya",
    vehicle: "TN39AB1234",
    slot: "A1",
    floor: "Ground Floor",
    time: "10:45 AM",
  };

  const handleScan = () => {
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center">
          <ShieldCheck size={70} className="mx-auto text-blue-600" />

          <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-slate-900">
            Security QR Verification
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Scan the customer's QR Code to verify parking.
          </p>
        </div>

        {/* SCANNER VIEW BEFORE VERIFY */}
        {!verified ? (
          <div className="text-center mt-8 sm:mt-10">
            <div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl border-4 border-dashed border-blue-500 flex items-center justify-center bg-blue-50/50">
              <QrCode size={100} className="text-blue-500" />
            </div>

            <button
              onClick={handleScan}
              className="mt-8 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              Scan QR
            </button>
          </div>
        ) : (
          /* VERIFIED STATE WITH BIG GREEN TICK MARK */
          <div className="mt-8 sm:mt-10 text-center">
            
            {/* BIG GREEN TICK MARK DISPLAY */}
            <div className="flex justify-center items-center my-4">
              <div className="p-3 rounded-full bg-green-50 border-4 border-green-100 shadow-xl inline-flex items-center justify-center">
                <CheckCircle size={120} className="text-green-500" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-4">
              Booking Verified
            </h2>

            <p className="text-slate-600 mt-2 text-sm sm:text-base font-medium">
              Vehicle is allowed to enter the parking area.
            </p>

            {/* BOOKING DETAILS TABLE */}
            <div className="bg-green-50 rounded-2xl mt-6 sm:mt-8 p-5 sm:p-6 space-y-4 text-left shadow-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Customer</span>
                <span className="text-slate-900 font-bold">{booking.customer}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Vehicle</span>
                <span className="text-slate-900 font-bold uppercase">{booking.vehicle}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Slot</span>
                <span className="text-slate-900 font-extrabold text-lg">{booking.slot}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Floor</span>
                <span className="text-slate-900 font-bold">{booking.floor}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-800">Entry Time</span>
                <span className="text-slate-900 font-bold">{booking.time}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-green-200">
                <span className="font-semibold text-slate-800">Status</span>
                <span className="bg-green-500 text-white font-bold px-4 py-1 rounded-full text-xs">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* BUTTON TO SCAN AGAIN */}
            <div className="mt-6">
              <button
                onClick={() => setVerified(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm"
              >
                Scan Another Code
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
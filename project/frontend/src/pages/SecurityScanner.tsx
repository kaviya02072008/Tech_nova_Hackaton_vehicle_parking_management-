import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  QrCode,
  Car,
  ParkingCircle,
  CheckCircle,
  LogOut,
} from "lucide-react";

export default function SecurityDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">
            🛡 Security Dashboard
          </h1>
          <p className="text-gray-300">
            Smart Mall Parking System
          </p>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="p-8">

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <ParkingCircle size={45} className="text-green-600 mb-3" />
            <p className="text-gray-500">Available Slots</p>
            <h2 className="text-4xl font-bold text-green-600">10</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Car size={45} className="text-red-600 mb-3" />
            <p className="text-gray-500">Occupied Slots</p>
            <h2 className="text-4xl font-bold text-red-600">2</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <QrCode size={45} className="text-blue-600 mb-3" />
            <p className="text-gray-500">QR Verified</p>
            <h2 className="text-4xl font-bold text-blue-600">18</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <ShieldCheck size={45} className="text-purple-600 mb-3" />
            <p className="text-gray-500">Today's Entries</p>
            <h2 className="text-4xl font-bold text-purple-600">20</h2>
          </div>

        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <QrCode
              size={70}
              className="mx-auto text-blue-600 mb-4"
            />

            <h2 className="text-2xl font-bold mb-3">
              Scan QR Code
            </h2>

            <p className="text-gray-500 mb-6">
              Verify customer booking before allowing entry.
            </p>

            <button
              onClick={() => navigate("/security/scan")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Open QR Scanner
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

            <CheckCircle
              size={70}
              className="mx-auto text-green-600 mb-4"
            />

            <h2 className="text-2xl font-bold mb-3">
              Verified Vehicles
            </h2>

            <p className="text-gray-500 mb-6">
              View all approved parking entries.
            </p>

            <button
              onClick={() => navigate("/security/vehicles")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              View Vehicles
            </button>

          </div>

        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-2xl shadow-lg mt-10 p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Vehicle Entries
          </h2>

          <table className="w-full">

            <thead className="border-b">

              <tr className="text-left">

                <th className="py-3">Vehicle</th>
                <th>Slot</th>
                <th>Time</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">TN39AB1234</td>
                <td>A1</td>
                <td>10:15 AM</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Verified
                  </span>
                </td>

              </tr>

              <tr>

                <td className="py-4">TN66XY9087</td>
                <td>A2</td>
                <td>10:45 AM</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Verified
                  </span>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
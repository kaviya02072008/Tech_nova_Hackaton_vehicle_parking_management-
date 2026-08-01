import {
  Users,
  Car,
  ParkingCircle,
  IndianRupee,
  Calendar,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Smart Mall Parking Management System
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>Total Users</p>
              <h2 className="text-4xl font-bold text-blue-600">
                154
              </h2>
            </div>

            <Users className="text-blue-600" size={45}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>Total Slots</p>
              <h2 className="text-4xl font-bold text-green-600">
                250
              </h2>
            </div>

            <ParkingCircle className="text-green-600" size={45}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>Occupied Slots</p>
              <h2 className="text-4xl font-bold text-red-600">
                183
              </h2>
            </div>

            <Car className="text-red-600" size={45}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>Today's Bookings</p>
              <h2 className="text-4xl font-bold text-orange-600">
                92
              </h2>
            </div>

            <Calendar className="text-orange-600" size={45}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>Today's Revenue</p>
              <h2 className="text-4xl font-bold text-purple-600">
                ₹18,240
              </h2>
            </div>

            <IndianRupee className="text-purple-600" size={45}/>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p>System Status</p>
              <h2 className="text-2xl font-bold text-green-600">
                Online
              </h2>
            </div>

            <Activity className="text-green-600" size={45}/>
          </div>
        </div>

      </div>

      {/* Floor Statistics */}

      <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-8">
          Floor Occupancy
        </h2>

        <div className="space-y-6">

          <div>
            <div className="flex justify-between">
              <span>Ground Floor</span>
              <span>80%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

              <div className="bg-green-500 h-4 rounded-full w-4/5"></div>

            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Floor 1</span>
              <span>65%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

              <div className="bg-blue-500 h-4 rounded-full w-2/3"></div>

            </div>
          </div>

          <div>
            <div className="flex justify-between">
              <span>Floor 2</span>
              <span>40%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

              <div className="bg-yellow-500 h-4 rounded-full w-2/5"></div>

            </div>
          </div>

        </div>

      </div>

      {/* Recent Bookings */}

      <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Bookings
        </h2>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Vehicle</th>

              <th className="p-4 text-left">Slot</th>

              <th className="p-4 text-left">Floor</th>

              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">
              <td className="p-4">TN39AB1234</td>
              <td className="p-4">A12</td>
              <td className="p-4">Ground</td>
              <td className="p-4 text-green-600 font-bold">
                Active
              </td>
            </tr>

            <tr className="border-b">
              <td className="p-4">TN39XY5555</td>
              <td className="p-4">B10</td>
              <td className="p-4">Floor 1</td>
              <td className="p-4 text-blue-600 font-bold">
                Completed
              </td>
            </tr>

            <tr>
              <td className="p-4">KA01AA1111</td>
              <td className="p-4">C22</td>
              <td className="p-4">Floor 2</td>
              <td className="p-4 text-orange-600 font-bold">
                Reserved
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}
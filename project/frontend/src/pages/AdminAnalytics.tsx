import {
  BarChart3,
  Car,
  CircleDollarSign,
  ParkingCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminAnalytics() {
  const navigate = useNavigate();

  const floorData = [
    { floor: "Ground Floor", occupied: 18, total: 20 },
    { floor: "Floor 1", occupied: 15, total: 20 },
    { floor: "Floor 2", occupied: 10, total: 20 },
    { floor: "Floor 3", occupied: 6, total: 20 },
  ];

  const vehicleData = [
    { type: "Car", count: 55 },
    { type: "Bike", count: 25 },
    { type: "SUV", count: 12 },
    { type: "EV", count: 8 },
  ];

  const weekly = [
    { day: "Mon", value: 18 },
    { day: "Tue", value: 30 },
    { day: "Wed", value: 25 },
    { day: "Thu", value: 35 },
    { day: "Fri", value: 42 },
    { day: "Sat", value: 55 },
    { day: "Sun", value: 38 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            📊 Parking Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Smart Mall Parking Statistics
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <ParkingCircle className="text-green-600 mb-4" size={45} />

          <h2 className="text-gray-500">
            Total Slots
          </h2>

          <h1 className="text-4xl font-bold">
            80
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <Car className="text-red-600 mb-4" size={45} />

          <h2 className="text-gray-500">
            Occupied
          </h2>

          <h1 className="text-4xl font-bold">
            49
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <TrendingUp className="text-blue-600 mb-4" size={45} />

          <h2 className="text-gray-500">
            Today's Bookings
          </h2>

          <h1 className="text-4xl font-bold">
            94
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CircleDollarSign
            className="text-yellow-600 mb-4"
            size={45}
          />

          <h2 className="text-gray-500">
            Revenue
          </h2>

          <h1 className="text-4xl font-bold">
            ₹12,560
          </h1>
        </div>

      </div>

      {/* Floor Occupancy */}

      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Floor Occupancy
        </h2>

        {floorData.map((floor) => {

          const percentage =
            (floor.occupied / floor.total) * 100;

          return (

            <div key={floor.floor} className="mb-5">

              <div className="flex justify-between mb-2">

                <span>{floor.floor}</span>

                <span>
                  {floor.occupied}/{floor.total}
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>

              </div>

            </div>

          );
        })}

      </div>

      {/* Vehicle Types */}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            Vehicle Types
          </h2>

          {vehicleData.map((vehicle) => (

            <div
              key={vehicle.type}
              className="flex justify-between border-b py-3"
            >
              <span>{vehicle.type}</span>

              <span className="font-bold">
                {vehicle.count}
              </span>

            </div>

          ))}

        </div>

        {/* Weekly Chart */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex items-center gap-2 mb-6">

            <BarChart3 />

            <h2 className="text-2xl font-bold">
              Weekly Bookings
            </h2>

          </div>

          <div className="flex items-end justify-between h-64">

            {weekly.map((item) => (

              <div
                key={item.day}
                className="flex flex-col items-center"
              >

                <div
                  className="bg-blue-600 w-10 rounded-t-lg"
                  style={{
                    height: `${item.value * 3}px`,
                  }}
                ></div>

                <span className="mt-3 text-sm">
                  {item.day}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
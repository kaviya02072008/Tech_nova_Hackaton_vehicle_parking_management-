import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Car,
  Save,
  Lock,
  LogOut,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Kaviya",
    email: "kaviya@gmail.com",
    phone: "+91 9876543210",
    vehicle: "TN39AB1234",
    type: "Car",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Profile Updated Successfully");
  };

  const handleLogout = () => {
    alert("Logout Successful");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white">

            <div className="flex flex-col items-center">

              <div className="relative">

                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">

                  <User size={70} className="text-blue-600" />

                </div>

                <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-3">

                  <Camera size={18} />

                </button>

              </div>

              <h1 className="text-4xl font-bold mt-5">
                My Profile
              </h1>

              <p className="text-blue-100 mt-2">
                Manage your account information
              </p>

            </div>

          </div>

          {/* Body */}

          <div className="grid lg:grid-cols-3 gap-8 p-8">

            {/* Left */}

            <div className="space-y-6">

              <div className="bg-slate-50 rounded-2xl p-6 text-center">

                <h2 className="text-lg font-bold">
                  Total Bookings
                </h2>

                <p className="text-4xl font-bold text-blue-600 mt-3">
                  28
                </p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-center">

                <h2 className="text-lg font-bold">
                  Active Booking
                </h2>

                <p className="text-4xl font-bold text-green-600 mt-3">
                  1
                </p>

              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-center">

                <h2 className="text-lg font-bold">
                  Total Spent
                </h2>

                <p className="text-4xl font-bold text-purple-600 mt-3">
                  ₹3450
                </p>

              </div>

            </div>

            {/* Right */}

            <div className="lg:col-span-2">

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="font-semibold flex gap-2 items-center mb-2">
                    <User size={18} />
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                <div>

                  <label className="font-semibold flex gap-2 items-center mb-2">
                    <Mail size={18} />
                    Email
                  </label>

                  <input
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                <div>

                  <label className="font-semibold flex gap-2 items-center mb-2">
                    <Phone size={18} />
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                <div>

                  <label className="font-semibold flex gap-2 items-center mb-2">
                    <Car size={18} />
                    Vehicle Number
                  </label>

                  <input
                    name="vehicle"
                    value={profile.vehicle}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  />

                </div>

                <div>

                  <label className="font-semibold mb-2 block">
                    Vehicle Type
                  </label>

                  <select
                    name="type"
                    value={profile.type}
                    onChange={handleChange}
                    className="w-full border rounded-xl p-3"
                  >
                    <option>Car</option>
                    <option>Bike</option>
                    <option>SUV</option>
                    <option>EV</option>
                  </select>

                </div>

              </div>

              <div className="mt-10 flex flex-wrap gap-4">

                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                >
                  <Save size={18} />
                  Save Changes
                </button>

                <button
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl"
                >
                  <Lock size={18} />
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
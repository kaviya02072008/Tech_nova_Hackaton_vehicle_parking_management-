import { Calendar, Car, MapPin, Clock, XCircle } from "lucide-react";
import { useState } from "react";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      slot: "A12",
      floor: "Ground Floor",
      vehicle: "TN39AB1234",
      date: "31 Jul 2026",
      time: "10:30 AM",
      amount: 120,
      status: "Active",
    },
    {
      id: 2,
      slot: "B08",
      floor: "Floor 1",
      vehicle: "TN39XY5678",
      date: "28 Jul 2026",
      time: "03:15 PM",
      amount: 80,
      status: "Completed",
    },
  ]);

  const cancelBooking = (id: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Booking History
      </h1>

      <div className="space-y-6">

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Slot {booking.slot}
                </h2>

                <div className="mt-4 space-y-2">

                  <p className="flex items-center gap-2">
                    <MapPin size={18}/>
                    {booking.floor}
                  </p>

                  <p className="flex items-center gap-2">
                    <Car size={18}/>
                    {booking.vehicle}
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={18}/>
                    {booking.date}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={18}/>
                    {booking.time}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <h2 className="text-3xl font-bold text-blue-600">
                  ₹{booking.amount}
                </h2>

                <p
                  className={`mt-3 font-bold ${
                    booking.status === "Active"
                      ? "text-green-600"
                      : booking.status === "Cancelled"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </p>

                {booking.status === "Active" && (

                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-5 flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
                  >
                    <XCircle size={18}/>
                    Cancel Booking
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
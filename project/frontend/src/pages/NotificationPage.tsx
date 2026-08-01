import { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Clock,
  Car,
  Trash2,
} from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your parking slot A12 has been booked successfully.",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "Vehicle Entered",
      message: "Security verified your QR code.",
      time: "10 min ago",
      type: "info",
    },
    {
      id: 3,
      title: "Parking Ending Soon",
      message: "Your parking expires in 30 minutes.",
      time: "25 min ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Payment Successful",
      message: "₹120 paid successfully.",
      time: "Today",
      type: "success",
    },
  ]);

  const clearAll = () => {
    setNotifications([]);
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((item) => item.id !== id)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <CheckCircle
            className="text-green-600"
            size={30}
          />
        );

      case "warning":
        return (
          <AlertTriangle
            className="text-yellow-600"
            size={30}
          />
        );

      case "info":
        return (
          <Car
            className="text-blue-600"
            size={30}
          />
        );

      default:
        return (
          <Bell
            className="text-gray-600"
            size={30}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">
            <Bell className="text-blue-600" size={40} />

            <h1 className="text-4xl font-bold">
              Notifications
            </h1>
          </div>

          <button
            onClick={clearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
          >
            Clear All
          </button>

        </div>

        {notifications.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <Bell
              size={70}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-3xl font-bold mt-5">
              No Notifications
            </h2>

            <p className="text-gray-500 mt-2">
              You're all caught up.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {notifications.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition"
              >

                <div className="flex gap-5">

                  {getIcon(item.type)}

                  <div>

                    <h2 className="font-bold text-xl">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.message}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-gray-400">

                      <Clock size={15} />

                      {item.time}

                    </div>

                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteNotification(item.id)
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={25} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
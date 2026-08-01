// src/pages/LoginPage.tsx

import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { ParkingCircle, ShieldCheck, QrCode, Car } from "lucide-react";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12">

          <ParkingCircle size={70} />

          <h1 className="text-5xl font-bold mt-6">
            Smart Mall Parking
          </h1>

          <p className="mt-5 text-lg text-blue-100">
            Fast, Secure & Smart Parking Management System
          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <ShieldCheck size={28} />
              <span className="text-lg">
                Secure User Authentication
              </span>
            </div>

            <div className="flex items-center gap-4">
              <QrCode size={28} />
              <span className="text-lg">
                Instant QR Code Booking
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Car size={28} />
              <span className="text-lg">
                Live Parking Slot Availability
              </span>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              Login to continue your parking journey.
            </p>

            <LoginForm />

            <p className="text-center mt-8 text-gray-500 text-sm">
              © 2026 Smart Mall Parking System
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
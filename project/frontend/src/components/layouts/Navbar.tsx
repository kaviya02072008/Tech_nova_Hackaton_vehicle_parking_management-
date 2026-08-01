import { Link } from "react-router-dom";
import { CarFront } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <CarFront className="text-white w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-blue-700">
            Smart Mall Parking
          </h1>
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">

          <Link to="/">Home</Link>

          <Link to="/features">Features</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

        </div>

        {/* Buttons */}

        <div className="flex gap-3">

          <Link
            to="/login"
            className="border border-blue-600 px-5 py-2 rounded-lg text-blue-600 hover:bg-blue-50"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}
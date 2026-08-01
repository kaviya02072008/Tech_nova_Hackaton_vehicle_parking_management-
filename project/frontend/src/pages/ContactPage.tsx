import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6">
          Contact Us
        </h1>

        <div className="space-y-4">

          <input
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={() => alert("Message Sent Successfully")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Send Message
          </button>

          <button
            onClick={() => navigate("/customer/dashboard")}
            className="w-full border py-3 rounded-lg"
          >
            Back
          </button>

        </div>
      </div>
    </div>
  );
}
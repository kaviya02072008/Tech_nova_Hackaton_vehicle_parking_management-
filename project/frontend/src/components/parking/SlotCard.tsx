type SlotProps = {
  slot: string;
  status: "available" | "occupied" | "reserved";
  onBook?: () => void;
};

export default function SlotCard({
  slot,
  status,
  onBook,
}: SlotProps) {
  const colors = {
    available: "bg-green-500 hover:bg-green-600",
    occupied: "bg-red-500",
    reserved: "bg-yellow-500",
  };

  return (
    <div
      className={`rounded-xl p-4 text-white shadow-lg transition ${colors[status]}`}
    >
      <h2 className="text-xl font-bold">{slot}</h2>

      <p className="mt-2 capitalize">{status}</p>

      {status === "available" && (
        <button
          onClick={onBook}
          className="mt-4 w-full rounded-lg bg-white text-green-700 py-2 font-semibold"
        >
          Book Now
        </button>
      )}
    </div>
  );
}
import SlotCard from "./SlotCard";

const slots = [
  { slot: "A1", status: "available" },
  { slot: "A2", status: "occupied" },
  { slot: "A3", status: "available" },
  { slot: "A4", status: "reserved" },
  { slot: "A5", status: "available" },
  { slot: "A6", status: "occupied" },
  { slot: "A7", status: "available" },
  { slot: "A8", status: "reserved" },
];

export default function ParkingGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
      {slots.map((item) => (
        <SlotCard
          key={item.slot}
          slot={item.slot}
          status={item.status as
            | "available"
            | "occupied"
            | "reserved"}
          onBook={() => alert(`Booking ${item.slot}`)}
        />
      ))}
    </div>
  );
}
type Props = {
  floor: number;
  setFloor: (value: number) => void;
};

export default function FloorSelector({
  floor,
  setFloor,
}: Props) {
  return (
    <select
      value={floor}
      onChange={(e) => setFloor(Number(e.target.value))}
      className="border rounded-lg px-4 py-2"
    >
      <option value={0}>Ground Floor</option>
      <option value={1}>Floor 1</option>
      <option value={2}>Floor 2</option>
      <option value={3}>Floor 3</option>
    </select>
  );
}
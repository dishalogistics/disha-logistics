import { formatShipmentStatus } from "@/utils/formatShipmentStatus";

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    ASSIGNED: "bg-indigo-100 text-indigo-800",
    PICKUP_SCHEDULED: "bg-purple-100 text-purple-800",
    PICKED_UP: "bg-cyan-100 text-cyan-800",
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    REACHED_HUB: "bg-orange-100 text-orange-800",
    OUT_FOR_DELIVERY: "bg-pink-100 text-pink-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: string }) {
    const color = statusColors[status] || "bg-gray-100 text-gray-800";
    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>
            {formatShipmentStatus(status)}
        </span>
    );
}

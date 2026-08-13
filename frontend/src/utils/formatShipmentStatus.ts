export function formatShipmentStatus(status?: string): string {
    const normalized = status || "";

    const statusMap: Record<string, string> = {
        PENDING: "Pending",
        CONFIRMED: "Confirmed",
        ASSIGNED: "Accepted",
        PICKUP_SCHEDULED: "Pickup Scheduled",
        PICKED_UP: "Picked Up",
        IN_TRANSIT: "In Transit",
        REACHED_HUB: "Reached Hub",
        OUT_FOR_DELIVERY: "Out for Delivery",
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
    };

    return statusMap[normalized] || normalized || "Unknown";
}

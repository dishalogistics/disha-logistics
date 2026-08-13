import { useQuery } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import { useState } from "react";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/common/Button";

export default function AdminShipments() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ status: "" });

    const { data, isLoading } = useQuery({
        queryKey: ["adminShipments", page, filters],
        queryFn: () =>
            shipmentApi
                .getAllShipments(page, 10, filters)
                .then((res) => res.data.data),
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Shipments</h1>
            <div className="flex gap-4 my-4">
                <select
                    className="border rounded-xl px-4 py-2"
                    onChange={(e) => setFilters({ status: e.target.value })}
                >
                    <option value="">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="ASSIGNED">Accepted</option>
                    <option value="PICKUP_SCHEDULED">Pickup Scheduled</option>
                    <option value="PICKED_UP">Picked Up</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="REACHED_HUB">Reached Hub</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left">Order</th>
                                <th className="px-6 py-3 text-left">Customer</th>
                                <th className="px-6 py-3 text-left">Route</th>
                                <th className="px-6 py-3 text-left">Vehicle</th>
                                <th className="px-6 py-3 text-left">Amount</th>
                                <th className="px-6 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.data?.map((s: any) => (
                                <tr key={s._id}>
                                    <td className="px-6 py-4">#{s._id.slice(-6)}</td>
                                    <td className="px-6 py-4">
                                        {s.customer?.firstName} {s.customer?.lastName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {s.pickupAddress.city} → {s.deliveryAddress.city}
                                    </td>
                                    <td className="px-6 py-4">{s.vehicleType}</td>
                                    <td className="px-6 py-4">₹{s.finalPrice}</td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={s.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <Button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>Page {page}</span>
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={data?.data?.length < 10}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

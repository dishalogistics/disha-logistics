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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Route
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vehicle
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transporter
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.data?.map((s: any) => (
                                <tr key={s._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        #{s._id.slice(-6)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {s.customer?.firstName} {s.customer?.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {s.pickupAddress?.city} → {s.deliveryAddress?.city}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {s.vehicleType}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {s.transporter ? (
                                            <span className="font-medium">
                                                {s.transporter.companyName || 
                                                 `${s.transporter.firstName} ${s.transporter.lastName}`}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 italic">Not assigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={s.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            variant="outline"
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-gray-600">Page {page}</span>
                        <Button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={data?.data?.length < 10}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
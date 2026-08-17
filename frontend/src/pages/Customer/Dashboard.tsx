import { useQuery } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/common/StatusBadge";
import { Shipment, PaginatedResponse } from "@/types";

const formatUserName = (user?: any) => {
    if (!user) return "Not assigned";
    if (typeof user === "string") return user || "Not assigned";

    const fullName = [
        user.firstName,
        user.lastName,
        user.name,
        user.companyName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    if (fullName) return fullName;

    if (user.email) return user.email.split("@")[0];

    return "Unknown user";
};

export default function CustomerDashboard() {
    const { data, isLoading } = useQuery<PaginatedResponse<Shipment>>({
        queryKey: ["customerShipments"],
        queryFn: () => shipmentApi.getCustomerShipments(1, 10),
    });

    const stats = {
        total: data?.total || 0,
        inProgress:
            data?.data?.filter(
                (s) => s.status !== "DELIVERED" && s.status !== "CANCELLED",
            ).length || 0,
        delivered: data?.data?.filter((s) => s.status === "DELIVERED").length || 0,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Customer Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Total Loads</div>
                    <div className="text-3xl font-bold">{stats.total}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">In Progress</div>
                    <div className="text-3xl font-bold text-blue-600">
                        {stats.inProgress}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Delivered</div>
                    <div className="text-3xl font-bold text-green-600">
                        {stats.delivered}
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-xl font-semibold">My Loads</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : data?.data?.length === 0 ? (
                    <p className="text-gray-500 mt-4">
                        No loads yet.{" "}
                        <Link to="/transporter/marketplace" className="text-brand-blue">
                            Browse marketplace
                        </Link>
                    </p>
                ) : (
                    <div className="overflow-x-auto mt-2">
                        <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Accepted by
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Route
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* `shipment` is now automatically typed as Shipment */}
                                {data?.data?.map((shipment) => (
                                    <tr key={shipment._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm">
                                            #{shipment._id.slice(-6)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {formatUserName(shipment.transporter)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            {shipment.pickupAddress.city} →{" "}
                                            {shipment.deliveryAddress.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={shipment.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

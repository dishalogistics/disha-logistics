import { useQuery } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import StatusBadge from "@/components/common/StatusBadge";

export default function AdminDashboard() {
    const { data, isLoading } = useQuery({
        queryKey: ["adminAnalytics"],
        queryFn: () => shipmentApi.getAdminAnalytics().then((res) => res.data.data),
    });

    if (isLoading) return <div className="p-4">Loading analytics...</div>;

    const analytics = data || {
        users: {},
        shipments: {},
        revenue: 0,
        recentShipments: [],
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Total Users</div>
                    <div className="text-2xl font-bold">
                        {analytics.users?.total || 0}
                    </div>
                    <div className="text-xs text-gray-400">
                        Customers: {analytics.users?.customers || 0}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Active Loads</div>
                    <div className="text-2xl font-bold">
                        {analytics.shipments?.total || 0}
                    </div>
                    <div className="text-xs text-gray-400">
                        Accepted: {analytics.shipments?.accepted || 0}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="text-2xl font-bold">₹{analytics.revenue || 0}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="text-sm text-gray-500">In Transit</div>
                    <div className="text-2xl font-bold">
                        {analytics.shipments?.inTransit || 0}
                    </div>
                    <div className="text-xs text-gray-400">
                        Delivered: {analytics.shipments?.delivered || 0}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold">Recent Shipments</h2>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Customer
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
                            {analytics.recentShipments?.map((s: any) => (
                                <tr key={s._id}>
                                    <td className="px-6 py-4 text-sm">#{s._id.slice(-6)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {s.customer?.firstName} {s.customer?.lastName}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {s.pickupAddress.city} → {s.deliveryAddress.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={s.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

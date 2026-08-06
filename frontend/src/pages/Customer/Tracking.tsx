import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import StatusBadge from "@/components/common/StatusBadge";

export default function Tracking() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useQuery({
        queryKey: ["shipment", id],
        queryFn: () =>
            shipmentApi.getShipmentById(id!).then((res) => res.data.data),
        enabled: !!id,
    });

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (!data) return <div className="p-4">Shipment not found</div>;

    const shipment = data;
    const statusHistory = shipment.statusHistory || [];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Shipment Tracking</h1>
            <div className="bg-white p-6 rounded-xl shadow mt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">
                            Shipment ID: #{shipment._id.slice(-6)}
                        </p>
                        <p className="text-lg font-semibold">
                            {shipment.pickupAddress.city} → {shipment.deliveryAddress.city}
                        </p>
                    </div>
                    <StatusBadge status={shipment.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Pickup</p>
                        <p>
                            {shipment.pickupAddress.street}, {shipment.pickupAddress.city}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Delivery</p>
                        <p>
                            {shipment.deliveryAddress.street}, {shipment.deliveryAddress.city}
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold">Status Timeline</h3>
                    <div className="relative mt-2 border-l-2 border-gray-200 ml-3 pl-6">
                        {statusHistory.map((entry: any, idx: number) => (
                            <div key={idx} className="mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-brand-blue rounded-full -ml-8"></div>
                                    <span className="font-medium">{entry.status}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(entry.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                {entry.note && (
                                    <p className="text-sm text-gray-600 ml-4">{entry.note}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {shipment.driver && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p>
                            <strong>Driver:</strong> {shipment.driver.firstName}{" "}
                            {shipment.driver.lastName}
                        </p>
                        <p>
                            <strong>Vehicle:</strong> {shipment.vehicleType}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

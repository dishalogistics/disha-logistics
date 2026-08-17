import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shipmentApi } from "@/api/shipment.api";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

export default function Marketplace() {
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["availableShipments"],
        queryFn: () => shipmentApi.getAvailableShipments(1, 20),
    });

    const acceptMutation = useMutation({
        mutationFn: (id: string) => shipmentApi.acceptLoad(id),
        onSuccess: () => {
            toast.success("Load accepted!");
            queryClient.invalidateQueries({ queryKey: ["availableShipments"] });
            queryClient.invalidateQueries({ queryKey: ["transporterShipments"] });
        },
        onError: (err: any) =>
            toast.error(err.response?.data?.message || "Failed to accept"),
    });

    const rejectMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
            shipmentApi.rejectLoad(id, reason),
        onSuccess: () => {
            toast.success("Load rejected");
            queryClient.invalidateQueries({ queryKey: ["availableShipments"] });
        },
        onError: (err: any) =>
            toast.error(err.response?.data?.message || "Failed to reject"),
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Marketplace – Available Loads</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : data?.data?.length === 0 ? (
                <p className="text-gray-500 mt-4">
                    No available shipments at the moment.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {data?.data?.map((shipment: any) => (
                        <div key={shipment._id} className="bg-white p-6 rounded-xl shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">
                                        {shipment.pickupAddress.city} →{" "}
                                        {shipment.deliveryAddress.city}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Customer: {(() => {
                                            const user = shipment.customer;
                                            if (!user) return "Unknown customer";
                                            if (typeof user === "string") return user || "Unknown customer";
                                            const fullName = [user.firstName, user.lastName, user.name, user.companyName]
                                                .filter(Boolean)
                                                .join(" ")
                                                .trim();
                                            return fullName || user.email?.split("@")[0] || "Unknown customer";
                                        })()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Weight: {shipment.weight} kg • {shipment.vehicleType}
                                    </p>
                                    {/* <p className="text-sm text-gray-500">
                                        Price: ₹{shipment.finalPrice}
                                    </p> */}
                                    <StatusBadge status={shipment.status} />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => acceptMutation.mutate(shipment._id)}
                                        isLoading={acceptMutation.isPending}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => rejectMutation.mutate({ id: shipment._id })}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

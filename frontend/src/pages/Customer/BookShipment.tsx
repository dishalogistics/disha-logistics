import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { bookingSchema } from "@/utils/validators";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { shipmentApi } from "@/api/shipment.api";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type BookingFormType = z.infer<typeof bookingSchema>;

const vehicleTypes = ["Mini Truck", "14FT", "17FT", "Container", "Trailer"];
const goodsTypes = [
    "Electronics",
    "Furniture",
    "Food",
    "Clothing",
    "Documents",
    "Other",
];

export default function BookShipment() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            deliverySpeed: "Standard",
            insurance: false,
            dimensions: { unit: "cm" },
            pickupAddress: { country: "India" },
            deliveryAddress: { country: "India" },
        },
    });

    const navigate = useNavigate();
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

    const watchWeight = watch("weight");
    const watchVehicle = watch("vehicleType");
    const watchSpeed = watch("deliverySpeed");
    const watchInsurance = watch("insurance");

    const calculatePrice = async () => {
        // ✅ Ensure all required fields are defined before using them
        if (!watchWeight || !watchVehicle || !watchSpeed) return;

        const rates: Record<string, number> = {
            "Mini Truck": 8,
            "14FT": 10,
            "17FT": 12,
            Container: 15,
            Trailer: 18,
        };
        const speedMul: Record<string, number> = {
            Standard: 1,
            Express: 1.5,
            "Same Day": 2.5,
        };
        const base = rates[watchVehicle] ?? 10;
        const weightFactor = watchWeight > 1000 ? 0.8 : 1;
        const price =
            base * 100 * weightFactor * speedMul[watchSpeed] +
            (watchInsurance ? 50 : 0);
        setEstimatedPrice(Math.round(price));
    };

    const onSubmit = async (data: BookingFormType) => {
        try {
            const res = await shipmentApi.createBooking(data);
            toast.success("Shipment booked successfully!");
            navigate(`/customer/tracking/${res.data.data._id}`);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Booking failed");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Book Shipment</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Pickup Address */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Pickup Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Street"
                            {...register("pickupAddress.street")}
                            error={errors.pickupAddress?.street?.message}
                        />
                        <Input
                            label="City"
                            {...register("pickupAddress.city")}
                            error={errors.pickupAddress?.city?.message}
                        />
                        <Input
                            label="State"
                            {...register("pickupAddress.state")}
                            error={errors.pickupAddress?.state?.message}
                        />
                        <Input
                            label="Pincode"
                            {...register("pickupAddress.pincode")}
                            error={errors.pickupAddress?.pincode?.message}
                        />
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Street"
                            {...register("deliveryAddress.street")}
                            error={errors.deliveryAddress?.street?.message}
                        />
                        <Input
                            label="City"
                            {...register("deliveryAddress.city")}
                            error={errors.deliveryAddress?.city?.message}
                        />
                        <Input
                            label="State"
                            {...register("deliveryAddress.state")}
                            error={errors.deliveryAddress?.state?.message}
                        />
                        <Input
                            label="Pincode"
                            {...register("deliveryAddress.pincode")}
                            error={errors.deliveryAddress?.pincode?.message}
                        />
                    </div>
                </div>

                {/* Goods Details */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Goods Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Goods Type</label>
                            <select
                                {...register("goodsType")}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                            >
                                {goodsTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.goodsType && (
                                <p className="text-red-500 text-sm">
                                    {errors.goodsType.message}
                                </p>
                            )}
                        </div>
                        <Input
                            label="Weight (kg)"
                            type="number"
                            {...register("weight", { valueAsNumber: true })}
                            error={errors.weight?.message}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <Input
                            label="Length (cm)"
                            type="number"
                            {...register("dimensions.length", { valueAsNumber: true })}
                        />
                        <Input
                            label="Width (cm)"
                            type="number"
                            {...register("dimensions.width", { valueAsNumber: true })}
                        />
                        <Input
                            label="Height (cm)"
                            type="number"
                            {...register("dimensions.height", { valueAsNumber: true })}
                        />
                    </div>
                </div>

                {/* Logistics Preferences */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Vehicle Type</label>
                            <select
                                {...register("vehicleType")}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                            >
                                {vehicleTypes.map((v) => (
                                    <option key={v} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                            {errors.vehicleType && (
                                <p className="text-red-500 text-sm">
                                    {errors.vehicleType.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Delivery Speed
                            </label>
                            <select
                                {...register("deliverySpeed")}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                            >
                                <option value="Standard">Standard</option>
                                <option value="Express">Express</option>
                                <option value="Same Day">Same Day</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register("insurance")} />
                            <span>Insurance (+₹50)</span>
                        </label>
                    </div>
                    <Input label="Coupon Code" {...register("couponCode")} />
                    <Input label="Notes (optional)" {...register("notes")} />
                </div>

                {/* Price Estimate & Submit */}
                <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <button
                            type="button"
                            onClick={calculatePrice}
                            className="text-brand-blue underline"
                        >
                            Calculate Price
                        </button>
                        {estimatedPrice !== null && (
                            <div className="text-2xl font-bold">₹{estimatedPrice}</div>
                        )}
                    </div>
                    <Button type="submit" isLoading={isSubmitting}>
                        Confirm Booking
                    </Button>
                </div>
            </form>
        </div>
    );
}

import { z } from "zod";

export const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
    country: z.string().min(1, "Country is required"), // ✅ required, not optional
});

export const bookingSchema = z.object({
    pickupAddress: addressSchema,
    deliveryAddress: addressSchema,
    goodsType: z.enum([
        "Electronics",
        "Furniture",
        "Food",
        "Clothing",
        "Documents",
        "Other",
    ]),
    weight: z.number().min(0.1, "Weight must be positive"),
    dimensions: z
        .object({
            length: z.number().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
            unit: z.enum(["cm", "in"]).default("cm"),
        })
        .optional(),
    vehicleType: z.enum(["Mini Truck", "14FT", "17FT", "Container", "Trailer"]),
    deliverySpeed: z
        .enum(["Standard", "Express", "Same Day"])
        .default("Standard"),
    insurance: z.boolean().default(false),
    couponCode: z.string().optional(),
    notes: z.string().max(500).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

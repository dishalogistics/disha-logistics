import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import toast from "react-hot-toast";
import { useState } from "react";

const registerSchema = z.object({
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["CUSTOMER", "TRANSPORTER"]),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "CUSTOMER", // now matches the required field
        },
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = async (data: RegisterForm) => {
        try {
            await authApi.register(data);
            toast.success("Registration successful! Please verify your email.");
            navigate("/verify-otp", {
                state: { email: data.email, purpose: "REGISTER" },
            });
        } catch (err: any) {
            const msg = err.response?.data?.message || "Registration failed";
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="First Name"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                />
                <Input label="Last Name (optional)" {...register("lastName")} />
                <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                />
                <Input
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <div className="space-y-1">
                    <label className="block text-sm font-medium">I am a</label>
                    <select
                        {...register("role")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                    >
                        <option value="CUSTOMER">Customer</option>
                        <option value="TRANSPORTER">Transporter</option>
                    </select>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Register
                </Button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-blue hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}

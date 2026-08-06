import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import toast from "react-hot-toast";

const forgotSchema = z.object({
    email: z.string().email("Invalid email"),
});

type ForgotForm = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotForm>({
        resolver: zodResolver(forgotSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data: ForgotForm) => {
        try {
            await authApi.forgotPassword(data);
            toast.success("OTP sent to your email");
            navigate("/verify-otp", {
                state: { email: data.email, purpose: "RESET_PASSWORD" },
            });
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
            <p className="text-center text-gray-600 mb-4">
                We'll send you an OTP to reset your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                />
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Send OTP
                </Button>
            </form>
            <p className="mt-4 text-center text-sm">
                Remember password?{" "}
                <Link to="/login" className="text-brand-blue hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import toast from "react-hot-toast";
import { useState } from "react";

const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPForm = z.infer<typeof otpSchema>;

export default function OTPVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";
    const purpose = location.state?.purpose || "REGISTER";
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OTPForm>({
        resolver: zodResolver(otpSchema),
    });
    const [error, setError] = useState("");

    const onSubmit = async (data: OTPForm) => {
        try {
            await authApi.verifyOTP({ email, otp: data.otp, purpose });
            toast.success("OTP verified!");
            if (purpose === "REGISTER") {
                navigate("/login");
            } else if (purpose === "RESET_PASSWORD") {
                navigate("/reset-password", { state: { email } });
            } else {
                navigate("/");
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || "Verification failed";
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
            <p className="text-center text-gray-600 mb-4">
                Enter the 6-digit code sent to {email}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="OTP"
                    {...register("otp")}
                    error={errors.otp?.message}
                    maxLength={6}
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Verify
                </Button>
            </form>
        </div>
    );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import toast from "react-hot-toast";

const resetSchema = z
    .object({
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetForm>({
        resolver: zodResolver(resetSchema),
    });

    const onSubmit = async (data: ResetForm) => {
        try {
            await authApi.resetPassword({
                email,
                otp: "",
                newPassword: data.newPassword,
            });
            toast.success("Password reset successfully");
            navigate("/login");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="New Password"
                    type="password"
                    {...register("newPassword")}
                    error={errors.newPassword?.message}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Reset Password
                </Button>
            </form>
        </div>
    );
}

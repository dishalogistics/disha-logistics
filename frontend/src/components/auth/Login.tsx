import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);
    const [error, setError] = useState("");

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await authApi.login(data);
            const { accessToken, user } = res.data.data;
            setAuth(user, accessToken);
            toast.success("Login successful");
            // Redirect based on role
            if (user.role === "CUSTOMER") navigate("/customer/dashboard");
            else if (user.role === "TRANSPORTER") navigate("/transporter/dashboard");
            else if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
                navigate("/admin/dashboard");
            else navigate("/");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Login failed";
            setError(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <Button type="submit" fullWidth isLoading={isSubmitting}>
                    Login
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                <Link to="/forgot-password" className="text-brand-blue hover:underline">
                    Forgot Password?
                </Link>
                <span className="mx-2">|</span>
                <Link to="/register" className="text-brand-blue hover:underline">
                    Create Account
                </Link>
            </div>
        </div>
    );
}

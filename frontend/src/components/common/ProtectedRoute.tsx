import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    redirectTo?: string;
}

export default function ProtectedRoute({
    allowedRoles,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role
        if (user.role === "CUSTOMER")
            return <Navigate to="/customer/dashboard" replace />;
        if (user.role === "TRANSPORTER")
            return <Navigate to="/transporter/dashboard" replace />;
        if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
            return <Navigate to="/admin/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

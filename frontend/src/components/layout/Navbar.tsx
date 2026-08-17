import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/common/Button";
import { authApi } from "@/api/auth.api";
import logo from "@/assets/logo.png";
import toast from "react-hot-toast";

export default function Navbar() {
    const { isAuthenticated, user, clearAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authApi.logout();
            clearAuth();
            toast.success("Logged out");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="Disha Logistics logo"
                        className="h-10 w-auto object-contain"
                    />
                    <div className="hidden sm:block text-2xl font-bold text-brand-navy">
                        <span className="text-brand-blue">Disha</span> Logistics
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className="text-sm font-medium hover:text-brand-blue"
                            >
                                Login
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                Hello, {user?.firstName}
                            </span>
                            <Button size="sm" variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

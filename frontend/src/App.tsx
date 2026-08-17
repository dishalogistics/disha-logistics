import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isPortal = ["/customer", "/transporter", "/admin"].some((path) =>
    location.pathname.startsWith(path),
  );

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const path = location.pathname;
    const publicAuthPaths = [
      "/",
      "/login",
      "/register",
      "/verify-otp",
      "/forgot-password",
      "/reset-password",
    ];

    if (publicAuthPaths.includes(path)) {
      const role = user.role;
      if (role === "CUSTOMER") navigate("/customer/dashboard", { replace: true });
      else if (role === "TRANSPORTER") navigate("/transporter/dashboard", { replace: true });
      else if (role === "ADMIN" || role === "SUPER_ADMIN")
        navigate("/admin/dashboard", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        {!isPortal && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isPortal && <Footer />}
      </div>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

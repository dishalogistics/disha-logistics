import { Outlet, useNavigate } from "react-router-dom";
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

  // Simple redirect logic (you can enhance)
  useEffect(() => {
    // If user is on login/register and already authenticated, redirect to dashboard
    const path = window.location.pathname;
    if (isAuthenticated && user) {
      if (
        path === "/login" ||
        path === "/register" ||
        path === "/verify-otp" ||
        path === "/forgot-password" ||
        path === "/reset-password"
      ) {
        const role = user.role;
        if (role === "CUSTOMER") navigate("/customer/dashboard");
        else if (role === "TRANSPORTER") navigate("/transporter/dashboard");
        else if (role === "ADMIN" || role === "SUPER_ADMIN")
          navigate("/admin/dashboard");
        else navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/Landing/Home";
import About from "@/pages/Landing/About";
import Services from "@/pages/Landing/Services";
import Contact from "@/pages/Landing/Contact";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import OTPVerification from "@/components/auth/OTPVerification";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import ProtectedRoute from "@/components/common/ProtectedRoute";
// Customer
import CustomerDashboard from "@/pages/Customer/Dashboard";
import BookShipment from "@/pages/Customer/BookShipment";
import Tracking from "@/pages/Customer/Tracking";
// Transporter
import TransporterDashboard from "@/pages/Transporter/Dashboard";
import Marketplace from "@/pages/Transporter/Marketplace";

// Admin
import AdminDashboard from "@/pages/Admin/Dashboard";
import AdminUsers from "@/pages/Admin/Users";
import AdminShipments from "@/pages/Admin/Shipments";
import PortalLayout from "@/components/layout/PortalLayout";
import Billing from "@/pages/Shared/Billing";
import EWayBill from "@/pages/Shared/EWayBill";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "services", element: <Services /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "verify-otp", element: <OTPVerification /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
            // Customer routes
            {
                path: "customer",
                element: <ProtectedRoute allowedRoles={["CUSTOMER"]} />,
                children: [
                    { element: <PortalLayout />, children: [
                        { path: "dashboard", element: <CustomerDashboard /> },
                        { path: "book", element: <BookShipment /> },
                        { path: "tracking/:id", element: <Tracking /> },
                    ]},
                ],
            },
            // Transporter routes
            {
                path: "transporter",
                element: <ProtectedRoute allowedRoles={["TRANSPORTER"]} />,
                children: [
                    { element: <PortalLayout />, children: [
                        { path: "dashboard", element: <TransporterDashboard /> },
                        { path: "book", element: <BookShipment /> },
                        { path: "marketplace", element: <Marketplace /> },
                        { path: "billing", element: <Billing /> },
                    ]},
                ],
            },
            // Admin routes
            {
                path: "admin",
                element: <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />,
                children: [
                    { element: <PortalLayout />, children: [
                        { path: "dashboard", element: <AdminDashboard /> },
                        { path: "users", element: <AdminUsers /> },
                        { path: "shipments", element: <AdminShipments /> },
                        { path: "billing", element: <Billing /> },
                        { path: "e-way-bill", element: <EWayBill /> },
                    ]},
                ],
            },
        ],
    },
]);

export default router;

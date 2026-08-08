import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/api/auth.api";
import toast from "react-hot-toast";
import {
  FiBarChart2,
  FiBox,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiSettings,
  FiTruck,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

type Role = "CUSTOMER" | "TRANSPORTER" | "ADMIN" | "SUPER_ADMIN";

const menu: Record<Role, { label: string; to: string; icon: typeof FiHome }[]> = {
  CUSTOMER: [
    { label: "Overview", to: "/customer/dashboard", icon: FiHome },
    { label: "Book a truck", to: "/customer/book", icon: FiTruck },
    // { label: "My shipments", to: "/customer/dashboard", icon: FiBox },
  ],
  TRANSPORTER: [
    { label: "Overview", to: "/transporter/dashboard", icon: FiHome },
    { label: "Load marketplace", to: "/transporter/marketplace", icon: FiBox },
     { label: "Book a truck", to: "/transporter/book", icon: FiTruck },

    // { label: "My fleet", to: "/transporter/dashboard", icon: FiTruck },
    // { label: "Trips & POD", to: "/transporter/dashboard", icon: FiMapPin },
    // { label: "Payments", to: "/transporter/billing", icon: FiCreditCard },
  ],
  ADMIN: [
    // { label: "Command centre", to: "/admin/dashboard", icon: FiHome },
    { label: "Shipments", to: "/admin/shipments", icon: FiBox },
    { label: "Customers & partners", to: "/admin/users", icon: FiUsers },
    { label: "Billing", to: "/admin/billing", icon: FiCreditCard },
    { label: "E-Way Bill desk", to: "/admin/e-way-bill", icon: FiFileText },
    // { label: "Reports", to: "/admin/dashboard", icon: FiBarChart2 },
  ],
  SUPER_ADMIN: [],
};
menu.SUPER_ADMIN = menu.ADMIN;

export default function PortalLayout() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const role = (user?.role || "CUSTOMER") as Role;
  const items = menu[role] || menu.CUSTOMER;

  const logout = async () => {
    try { await authApi.logout(); } catch { /* clear local session regardless */ }
    clearAuth();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col bg-[#0b1a33] px-4 py-5 text-slate-300 transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : ""}`}>
          <div className="flex items-center justify-between px-3">
            <NavLink to="/" className="text-xl font-extrabold tracking-tight text-white"><span className="text-[#ffb703]">disha</span> logistics</NavLink>
            <button onClick={() => setOpen(false)} className="lg:hidden"><FiX size={22} /></button>
          </div>
          <div className="mx-3 mt-8 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffb703]">{role.replace("_", " ")} portal</p>
            <p className="mt-1 truncate text-sm font-semibold text-white">{user?.firstName || "Disha user"}</p>
          </div>
          <nav className="mt-6 space-y-1">
            {items.map(({ label, to, icon: Icon }) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? "bg-[#ffb703] text-[#0b1a33]" : "hover:bg-white/10 hover:text-white"}`}>
              <Icon size={18} /> {label}
            </NavLink>)}
          </nav>
          <div className="mt-auto border-t border-white/10 pt-4">
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-white/10 hover:text-white"><FiSettings size={18} /> Account settings</button>
            <button onClick={logout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-white/10 hover:text-white"><FiLogOut size={18} /> Logout</button>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
            <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><FiMenu size={22} /></button>
            <div className="hidden lg:block"><p className="text-xs font-semibold uppercase tracking-widest text-slate-400">India road freight platform</p></div>
            <div className="flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:block">Need help? <b className="text-slate-800">1800-202-3474</b></span><div className="grid h-9 w-9 place-items-center rounded-full bg-[#e8f1ff] text-sm font-bold text-[#155eef]">{user?.firstName?.[0] || "D"}</div></div>
          </header>
          <div className="p-5 lg:p-8"><Outlet /></div>
        </section>
      </div>
    </div>
  );
}

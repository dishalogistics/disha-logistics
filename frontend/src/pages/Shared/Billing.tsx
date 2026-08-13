import { FiArrowUpRight, FiCheckCircle, FiDownload, FiPlus } from "react-icons/fi";
import ComingSoon from "@/components/common/ComingSoon";

const invoices = [
  ["INV-2026-0841", "Delhi → Mumbai", "₹28,450", "Paid", "06 Aug 2026"],
  ["INV-2026-0838", "Pune → Bengaluru", "₹19,800", "Due", "04 Aug 2026"],
  ["INV-2026-0827", "Jaipur → Ahmedabad", "₹14,260", "Paid", "30 Jul 2026"],
];

export default function Billing() {
  return (
    <ComingSoon>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#155eef]">FINANCE CENTRE</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Billing & invoices</h1>
            <p className="mt-2 text-slate-500">Track freight payments, GST invoices and outstanding balances.</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#155eef] px-4 py-3 text-sm font-semibold text-white">
            <FiPlus /> Create invoice
          </button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[["₹62,510", "Paid this month", "+12.4%"], ["₹19,800", "Outstanding balance", "Due in 3 days"], ["8", "Invoices generated", "GST ready"]].map(([number, label, note]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-extrabold">{number}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <FiArrowUpRight /> {note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold">Recent invoices</h2>
            <button className="text-sm font-semibold text-[#155eef]">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {["Invoice", "Lane", "Amount", "Status", "Date", ""].map((h) => (
                    <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map(([id, lane, amount, status, date]) => (
                  <tr key={id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-800">{id}</td>
                    <td className="px-5 py-4 text-slate-600">{lane}</td>
                    <td className="px-5 py-4 font-semibold">{amount}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{date}</td>
                    <td className="px-5 py-4">
                      <button className="text-slate-500 hover:text-[#155eef]" aria-label={`Download ${id}`}>
                        <FiDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 flex gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
          <FiCheckCircle className="mt-0.5 shrink-0 text-[#155eef]" size={18} />
          <p>
            <b>GST-ready documents.</b> Every completed trip can be reconciled with a tax invoice and proof of delivery.
          </p>
        </div>
      </div>
    </ComingSoon>
  );
}

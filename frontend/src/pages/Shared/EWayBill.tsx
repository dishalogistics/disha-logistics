import { FiAlertCircle, FiCalendar, FiFileText, FiTruck } from "react-icons/fi";
import ComingSoon from "@/components/common/ComingSoon";

export default function EWayBill() {
  return (
    <ComingSoon>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-[#0b1a33] px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ffb703] px-3 py-1 text-xs font-bold text-[#0b1a33]"><FiAlertCircle /> DEMO UI</span>
              <h1 className="mt-4 text-3xl font-extrabold">E-Way Bill desk</h1>
              <p className="mt-2 max-w-xl text-slate-300">Prepare shipment details in one place. Government portal generation is not connected yet.</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-sm">
              <p className="text-slate-300">Next planned feature</p>
              <p className="mt-1 font-bold">NIC / GSTN integration</p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.5fr_.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#155eef]"><FiFileText size={20} /></div>
              <div>
                <h2 className="font-bold">Create a draft E-Way Bill</h2>
                <p className="text-sm text-slate-500">For UI preview only — no information is submitted.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[["Supplier GSTIN", "09ABCDE1234F1Z5"], ["Recipient GSTIN", "27AABCU9603R1ZM"], ["Document type", "Tax Invoice"], ["Invoice number", "INV-2026-0841"], ["From", "Gorakhpur, Uttar Pradesh"], ["To", "Mumbai, Maharashtra"], ["Transporter ID", "09DISHALOGIX1ZP"], ["Vehicle number", "UP53 BT 4821"]].map(([label, value]) => (
                <label key={label} className="text-sm font-semibold text-slate-700">
                  {label}
                  <input defaultValue={value} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal text-slate-600 outline-none focus:border-[#155eef]" />
                </label>
              ))}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <label className="text-sm font-semibold">Value of goods<input defaultValue="₹ 28,450" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
              <label className="text-sm font-semibold">Distance<input defaultValue="1,405 km" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
              <label className="text-sm font-semibold">Validity<input defaultValue="14 days" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
            </div>
            <button type="button" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500" title="Demo only">Generate E-Way Bill (coming soon)</button>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-800"><FiTruck className="text-[#155eef]" /><h2 className="font-bold">Trip details</h2></div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500">Shipment ID</dt><dd className="font-bold">DL-0841</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Vehicle</dt><dd className="font-bold">UP53 BT 4821</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Transport mode</dt><dd className="font-bold">Road</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              <FiCalendar className="mb-2" size={19} />
              <b>Validity reminder</b>
              <p className="mt-1">Set up alerts before an active bill expires. This action will be available with the live integration.</p>
            </div>
          </aside>
        </div>
      </div>
    </ComingSoon>
  );
}

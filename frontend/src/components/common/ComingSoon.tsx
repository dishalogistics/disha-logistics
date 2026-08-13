import { FiLock } from "react-icons/fi";

export default function ComingSoon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center rounded-2xl bg-slate-900/30 backdrop-blur-sm">
        <div className="rounded-2xl bg-white px-8 py-6 text-center shadow-lg">
          <div className="flex justify-center">
            <FiLock className="text-4xl text-slate-400" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-800">Coming Soon</h2>
          <p className="mt-2 text-sm text-slate-600">This feature is currently under development.</p>
        </div>
      </div>
      <div className="opacity-50">{children}</div>
    </div>
  );
}

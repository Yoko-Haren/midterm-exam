import { usePosStore } from '../store/usePosStore'

export default function Toast() {
  const toast = usePosStore((s) => s.toast)
  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="toast"
      className="fixed left-1/2 top-4 z-50 w-max max-w-[90vw] -translate-x-1/2 rounded-2xl border border-slate-600 bg-slate-800 px-6 py-4 text-center text-lg font-semibold text-slate-100 shadow-2xl"
    >
      {toast}
    </div>
  )
}

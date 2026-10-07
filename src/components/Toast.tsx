import { usePosStore } from '../store/usePosStore'

export default function Toast() {
  const toast = usePosStore((s) => s.toast)
  if (!toast) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="toast"
      className="fixed left-1/2 top-4 z-50 flex w-max max-w-[90vw] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-cocoa/95 px-6 py-4 text-lg font-semibold text-cream shadow-2xl shadow-cocoa/30 backdrop-blur-xl"
    >
      <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-cream" />
      <span>{toast}</span>
    </div>
  )
}

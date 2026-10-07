import { useEffect, useRef, useState } from 'react'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

const PROCESSING_MS = 1500

export default function CardPayment() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const completeTxn = usePosStore((s) => s.completeTxn)
  const [processing, setProcessing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const process = () => {
    if (processing) return
    setProcessing(true)
    timer.current = setTimeout(
      () => completeTxn('Credit/Debit Card', total),
      PROCESSING_MS,
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col text-center">
      <h1 className="mb-2 text-3xl font-bold">Card Payment</h1>
      <p className="mb-6 text-2xl">
        Amount due:{' '}
        <span data-testid="amount-due" className="font-bold text-emerald-400">
          {peso(total)}
        </span>
      </p>

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
        <div className="mb-4 text-6xl" aria-hidden="true">
          💳
        </div>
        <p className="text-2xl font-semibold">
          Please tap, insert, or swipe your card.
        </p>
      </div>

      {processing ? (
        <p
          role="status"
          className="mt-6 flex min-h-[64px] animate-pulse items-center justify-center text-2xl font-bold text-emerald-400"
        >
          Processing payment...
        </p>
      ) : (
        <BigButton className="mt-6" onClick={process}>
          Process Payment
        </BigButton>
      )}

      <BigButton
        variant="secondary"
        className="mt-4"
        disabled={processing}
        onClick={() => go('method')}
      >
        Back
      </BigButton>
    </div>
  )
}

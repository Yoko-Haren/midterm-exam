import { useEffect, useRef, useState } from 'react'
import AmountDue from '../components/AmountDue'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'

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
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <p className="eyebrow">Payment · Card</p>
      <h1 className="text-3xl font-extrabold">Card Payment</h1>
      <p className="mb-4 mt-1 text-lg text-cocoa/70">
        Credit and debit cards are accepted.
      </p>

      <AmountDue label="Amount due" amount={total} className="mb-6" />

      <div className="glass flex flex-col items-center rounded-2xl p-8 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 160 110"
          className={`mb-5 h-28 ${processing ? 'animate-pulse' : ''}`}
        >
          <rect x="8" y="10" width="144" height="90" rx="12" fill="#624621" />
          <rect x="8" y="28" width="144" height="16" fill="#3B2A14" />
          <rect x="22" y="56" width="28" height="20" rx="4" fill="#F8DAB2" />
          <path d="M22 66h28M36 56v20" stroke="#9F6D2D" strokeWidth="2" />
          <rect x="22" y="84" width="60" height="6" rx="3" fill="#F8DAB2" opacity="0.7" />
          <path
            d="M118 58a12 12 0 0 1 0 16M126 52a22 22 0 0 1 0 28M134 46a32 32 0 0 1 0 40"
            fill="none"
            stroke="#F8DAB2"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-2xl font-bold">
          Please tap, insert, or swipe your card.
        </p>
        <p className="mt-1 text-base text-cocoa/70">
          Then tap Process Payment and keep your card nearby.
        </p>
      </div>

      {processing ? (
        <p
          role="status"
          className="mt-6 flex min-h-[64px] items-center justify-center gap-3 rounded-2xl bg-cream text-2xl font-bold"
        >
          <span
            aria-hidden="true"
            className="h-7 w-7 animate-spin rounded-full border-4 border-cocoa/25 border-t-cocoa"
          />
          <span>Processing payment...</span>
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

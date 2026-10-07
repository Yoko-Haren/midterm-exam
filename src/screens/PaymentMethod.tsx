import type { ReactElement } from 'react'
import AmountDue from '../components/AmountDue'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import type { Screen } from '../types'

interface Method {
  label: string
  hint: string
  to: Screen
  icon: ReactElement
}

const METHODS: Method[] = [
  {
    label: 'Cash',
    hint: 'Enter the amount you hand over and get your change.',
    to: 'cash',
    icon: (
      <>
        <rect x="6" y="16" width="52" height="32" rx="6" />
        <circle cx="32" cy="32" r="8" />
        <path d="M14 26v12M50 26v12" />
      </>
    ),
  },
  {
    label: 'QR Payment',
    hint: 'Scan a code with your payment app.',
    to: 'qr',
    icon: (
      <>
        <rect x="8" y="8" width="18" height="18" rx="3" />
        <rect x="38" y="8" width="18" height="18" rx="3" />
        <rect x="8" y="38" width="18" height="18" rx="3" />
        <path d="M38 38h8v8h-8zM52 38h4M38 54h4M50 50h6v6" />
      </>
    ),
  },
  {
    label: 'Credit/Debit Card',
    hint: 'Tap, insert, or swipe at the reader.',
    to: 'card',
    icon: (
      <>
        <rect x="6" y="14" width="52" height="36" rx="6" />
        <path d="M6 26h52M14 40h12" />
      </>
    ),
  },
]

export default function PaymentMethod() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <p className="eyebrow">Payment</p>
      <h1 className="text-3xl font-extrabold">Choose Payment Method</h1>
      <p className="mb-4 mt-1 text-lg text-cocoa/70">
        How would you like to pay today?
      </p>

      <AmountDue label="Amount due" amount={total} className="mb-6" />

      <div className="flex flex-col gap-4">
        {METHODS.map((m) => (
          <button
            key={m.label}
            type="button"
            aria-label={m.label}
            onClick={() => go(m.to)}
            className="glass flex min-h-[96px] items-center gap-4 rounded-2xl p-4 text-left transition-transform active:scale-95 active:bg-cream"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-cocoa text-cream">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="h-9 w-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {m.icon}
              </svg>
            </span>
            <span className="flex-1">
              <span className="block text-2xl font-bold">{m.label}</span>
              <span className="block text-base text-cocoa/70">{m.hint}</span>
            </span>
            <span aria-hidden="true" className="text-3xl text-caramel">
              ›
            </span>
          </button>
        ))}
        <BigButton variant="secondary" onClick={() => go('summary')}>
          Back
        </BigButton>
      </div>
    </div>
  )
}

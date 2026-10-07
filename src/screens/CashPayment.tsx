import { useState } from 'react'
import AmountDue from '../components/AmountDue'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

const QUICK_AMOUNTS = [50, 100, 200, 500, 1000]

export default function CashPayment() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const showToast = usePosStore((s) => s.showToast)
  const completeTxn = usePosStore((s) => s.completeTxn)
  const [paid, setPaid] = useState('')
  const [error, setError] = useState<string | null>(null)

  const amount = Number(paid)
  const valid =
    paid.trim() !== '' &&
    Number.isFinite(amount) &&
    amount >= 0 &&
    Math.round(amount * 100) >= Math.round(total * 100)

  const setAmount = (value: string) => {
    setPaid(value)
    setError(null)
  }

  const pay = () => {
    if (!valid) {
      const msg = `Insufficient payment. Please enter at least ${peso(total)}`
      setError(msg)
      showToast(msg)
      return
    }
    completeTxn('Cash', amount)
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <p className="eyebrow">Payment · Cash</p>
      <h1 className="text-3xl font-extrabold">Cash Payment</h1>
      <p className="mb-4 mt-1 text-lg text-cocoa/70">
        Enter the cash you are handing over.
      </p>

      <AmountDue label="Total due" amount={total} className="mb-6" />

      <label htmlFor="cash-amount" className="mb-2 text-lg font-semibold">
        Amount paid
      </label>
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-3xl font-bold text-caramel"
        >
          ₱
        </span>
        <input
          id="cash-amount"
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={paid}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={`min-h-[72px] w-full rounded-2xl border-2 bg-white/80 pl-14 pr-6 text-3xl font-bold text-cocoa backdrop-blur-xl placeholder:text-cocoa/40 focus:outline-none ${error ? 'border-danger' : 'border-cocoa/25 focus:border-caramel'}`}
        />
      </div>
      <p className="mt-2 text-base text-cocoa/70">
        Type the amount, or tap a quick amount below.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <BigButton variant="secondary" onClick={() => setAmount(String(total))}>
          Exact
        </BigButton>
        {QUICK_AMOUNTS.map((n) => (
          <BigButton
            key={n}
            variant="secondary"
            onClick={() => setAmount(String(n))}
          >
            ₱{n}
          </BigButton>
        ))}
      </div>

      <div className="glass mt-6 flex items-center justify-between rounded-2xl p-4">
        <div>
          <div className="text-2xl font-bold">Change</div>
          <div className="text-base text-cocoa/70">Updates as you type</div>
        </div>
        <span
          data-testid="change-preview"
          className="text-3xl font-extrabold text-caramel"
        >
          {peso(valid ? amount - total : 0)}
        </span>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3 text-lg font-semibold text-danger"
        >
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <BigButton variant="secondary" onClick={() => go('method')}>
          Back
        </BigButton>
        <BigButton onClick={pay}>Pay Now</BigButton>
      </div>
    </div>
  )
}

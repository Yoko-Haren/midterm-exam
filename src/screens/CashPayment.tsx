import { useState } from 'react'
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
      <h1 className="mb-2 text-3xl font-bold">Cash Payment</h1>
      <p className="mb-6 text-2xl">
        Total due:{' '}
        <span data-testid="amount-due" className="font-bold text-emerald-400">
          {peso(total)}
        </span>
      </p>

      <label htmlFor="cash-amount" className="mb-2 text-lg text-slate-400">
        Amount paid
      </label>
      <input
        id="cash-amount"
        type="number"
        inputMode="decimal"
        min={0}
        step="0.01"
        value={paid}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        className="min-h-[72px] rounded-2xl border-2 border-slate-600 bg-slate-800 px-6 text-3xl font-bold text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
      />

      <div className="mt-4 grid grid-cols-3 gap-3">
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

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800 p-4">
        <span className="text-2xl font-bold">Change</span>
        <span
          data-testid="change-preview"
          className="text-3xl font-bold text-emerald-400"
        >
          {peso(valid ? amount - total : 0)}
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-lg font-semibold text-rose-400">
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

import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function PaymentSuccess() {
  const txn = usePosStore((s) => s.lastTransaction)
  const go = usePosStore((s) => s.go)

  if (!txn) return null

  const rows: [string, string, string][] = [
    ['Amount', 'success-amount', peso(txn.total)],
    ['Method', 'success-method', txn.method],
    ['Amount paid', 'success-paid', peso(txn.amountPaid)],
    ['Change', 'success-change', peso(txn.change)],
  ]

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cocoa shadow-lg shadow-cocoa/30 ring-8 ring-cream"
      >
        <svg
          viewBox="0 0 48 48"
          className="h-12 w-12"
          fill="none"
          stroke="#F8DAB2"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 25l9 9 19-20" />
        </svg>
      </span>
      <h1 className="mt-5 text-3xl font-extrabold">Payment Successful</h1>
      <p className="mt-1 text-lg text-cocoa/70">
        Thank you! Your order is confirmed.
      </p>

      <div className="glass mx-auto mt-5 rounded-2xl px-6 py-3">
        <p className="eyebrow">Transaction No.</p>
        <p data-testid="txn-id" className="text-2xl font-extrabold">
          {txn.id}
        </p>
      </div>

      <dl className="glass mt-5 rounded-2xl px-5 py-2 text-left text-xl">
        {rows.map(([label, testId, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-cocoa/15 py-3 last:border-b-0"
          >
            <dt className="text-cocoa/70">{label}</dt>
            <dd
              data-testid={testId}
              className={`font-bold ${label === 'Change' ? 'text-caramel' : ''}`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <BigButton className="mt-6" onClick={() => go('receipt')}>
        View Receipt
      </BigButton>
    </div>
  )
}

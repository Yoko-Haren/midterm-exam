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
      <div className="text-7xl" aria-hidden="true">
        ✅
      </div>
      <h1 className="mt-4 text-3xl font-bold text-emerald-400">
        Payment Successful
      </h1>
      <p className="mt-2 text-lg text-slate-400">Transaction No.</p>
      <p data-testid="txn-id" className="text-2xl font-bold">
        {txn.id}
      </p>

      <dl className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-left text-xl">
        {rows.map(([label, testId, value]) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-slate-700 py-3 last:border-b-0"
          >
            <dt className="text-slate-400">{label}</dt>
            <dd data-testid={testId} className="font-bold">
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

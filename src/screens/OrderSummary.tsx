import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function OrderSummary() {
  const items = usePosStore((s) => s.items)
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <h1 className="mb-4 text-3xl font-bold">Order Summary</h1>

      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4">
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b border-slate-700 text-left text-slate-400">
              <th className="py-3 font-semibold">Item</th>
              <th className="py-3 text-center font-semibold">Qty</th>
              <th className="py-3 text-right font-semibold">Unit</th>
              <th className="py-3 text-right font-semibold">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr
                key={i.id}
                data-testid={`summary-row-${i.id}`}
                className="border-b border-slate-700"
              >
                <td className="py-4 font-semibold">{i.name}</td>
                <td className="py-4 text-center">{i.qty}</td>
                <td className="py-4 text-right">{peso(i.price)}</td>
                <td className="py-4 text-right font-bold">
                  {peso(i.price * i.qty)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4 text-2xl font-bold">
                Total
              </td>
              <td
                data-testid="summary-total"
                className="pt-4 text-right text-3xl font-bold text-emerald-400"
              >
                {peso(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <BigButton variant="secondary" onClick={() => go('items')}>
          Back
        </BigButton>
        <BigButton disabled={items.length === 0} onClick={() => go('method')}>
          Continue to Payment
        </BigButton>
      </div>
    </div>
  )
}

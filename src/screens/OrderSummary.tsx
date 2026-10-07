import BigButton from '../components/BigButton'
import ProductArt from '../components/ProductArt'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function OrderSummary() {
  const items = usePosStore((s) => s.items)
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const count = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <p className="eyebrow">Review</p>
      <h1 className="text-3xl font-bold">Order Summary</h1>
      <p className="mb-4 mt-1 text-lg text-ink/60">
        Please check your order before paying. Tap Back to make changes.
      </p>

      <div className="glass rounded-2xl p-4">
        <table className="w-full text-lg">
          <thead>
            <tr className="border-b border-ink/10 text-left text-base uppercase tracking-wider text-ink/60">
              <th className="py-3 font-bold">Item</th>
              <th className="py-3 text-center font-bold">Qty</th>
              <th className="py-3 text-right font-bold">Unit</th>
              <th className="py-3 text-right font-bold">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr
                key={i.id}
                data-testid={`summary-row-${i.id}`}
                className="border-b border-ink/10"
              >
                <td className="py-3 font-bold">
                  <span className="flex items-center gap-3">
                    <ProductArt id={i.id} className="h-12 w-12 rounded-xl" />
                    <span>{i.name}</span>
                  </span>
                </td>
                <td className="py-3 text-center">{i.qty}</td>
                <td className="py-3 text-right">{peso(i.price)}</td>
                <td className="py-3 text-right font-bold">
                  {peso(i.price * i.qty)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="pt-4">
                <span className="text-2xl font-bold">Total</span>
                <span className="ml-3 text-base text-ink/60">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </td>
              <td
                data-testid="summary-total"
                className="pt-4 text-right text-3xl font-bold text-caramel"
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

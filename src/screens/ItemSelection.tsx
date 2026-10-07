import BigButton from '../components/BigButton'
import CartLine from '../components/CartLine'
import ProductCard from '../components/ProductCard'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function ItemSelection() {
  const catalog = usePosStore((s) => s.catalog)
  const items = usePosStore((s) => s.items)
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)

  return (
    <div className="grid flex-1 gap-6 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-3xl font-bold">Tap an item to add</h1>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {catalog.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <aside className="flex flex-col rounded-2xl border border-slate-700 bg-slate-800 p-4">
        <h2 className="mb-4 text-3xl font-bold">Your Order</h2>

        {items.length === 0 ? (
          <p className="flex-1 py-8 text-center text-lg text-slate-400">
            Your cart is empty. Tap a product to begin.
          </p>
        ) : (
          <ul className="flex flex-1 flex-col gap-3">
            {items.map((i) => (
              <CartLine key={i.id} item={i} />
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
          <span className="text-2xl font-bold">Total</span>
          <span
            data-testid="cart-total"
            className="text-3xl font-bold text-emerald-400"
          >
            {peso(total)}
          </span>
        </div>

        <BigButton
          className="mt-4 w-full"
          disabled={items.length === 0}
          onClick={() => go('summary')}
        >
          Proceed to Payment
        </BigButton>
      </aside>
    </div>
  )
}

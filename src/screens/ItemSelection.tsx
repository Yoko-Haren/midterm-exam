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
  const count = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div className="grid flex-1 gap-6 md:grid-cols-2">
      <section>
        <p className="eyebrow">Menu</p>
        <h1 className="text-3xl font-extrabold">Tap an item to add</h1>
        <p className="mb-4 mt-1 text-lg text-cocoa/70">
          Tap a card again to add one more.
        </p>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {catalog.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <aside className="glass flex flex-col rounded-2xl p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Cart</p>
            <h2 className="text-3xl font-extrabold">Your Order</h2>
          </div>
          <span
            data-testid="cart-count"
            className="rounded-full bg-cream px-4 py-2 text-base font-bold"
          >
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-20 w-20 text-caramel/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 22h36l4 30a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" />
              <path d="M22 28v-8a10 10 0 0 1 20 0v8" />
            </svg>
            <p className="text-xl font-bold">Your cart is empty</p>
            <p className="text-lg text-cocoa/70">Tap a product to begin.</p>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col gap-3">
            {items.map((i) => (
              <CartLine key={i.id} item={i} />
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-end justify-between border-t border-cocoa/15 pt-4">
          <div>
            <div className="text-2xl font-bold">Total</div>
            <div className="text-base text-cocoa/70">
              You can review your order next.
            </div>
          </div>
          <span
            data-testid="cart-total"
            className="text-4xl font-extrabold text-caramel"
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

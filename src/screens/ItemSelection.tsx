import { useState } from 'react'
import BigButton from '../components/BigButton'
import CartLine from '../components/CartLine'
import ProductCard from '../components/ProductCard'
import { CATEGORY_FILTERS, PRODUCT_CATEGORIES } from '../data/products'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

type Filter = (typeof CATEGORY_FILTERS)[number]

export default function ItemSelection() {
  const catalog = usePosStore((s) => s.catalog)
  const items = usePosStore((s) => s.items)
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const [filter, setFilter] = useState<Filter>('All')
  const count = items.reduce((n, i) => n + i.qty, 0)
  const visible =
    filter === 'All'
      ? catalog
      : catalog.filter((p) => PRODUCT_CATEGORIES[p.id] === filter)

  return (
    <div className="grid flex-1 gap-6 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr]">
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <p className="eyebrow">Menu</p>
            <h1 className="text-3xl font-bold">Tap an item to add</h1>
            <p className="mt-1 text-lg text-ink/60">
              Tap a card again to add one more.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter by category"
            className="flex max-w-full flex-wrap gap-1 rounded-full border border-caramel/30 bg-white p-1"
          >
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`min-h-[44px] rounded-full px-3.5 text-base font-semibold transition-colors active:scale-95 ${
                  filter === c
                    ? 'bg-cocoa text-cream'
                    : 'text-ink/60 active:bg-linen'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <aside className="glass flex flex-col rounded-2xl p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Cart</p>
            <h2 className="text-3xl font-bold">Your Order</h2>
          </div>
          <span
            data-testid="cart-count"
            className="rounded-full bg-linen px-4 py-2 text-base font-semibold"
          >
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="h-20 w-20 text-ink/25"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 22h36l4 30a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z" />
              <path d="M22 28v-8a10 10 0 0 1 20 0v8" />
            </svg>
            <p className="text-xl font-semibold">Your cart is empty</p>
            <p className="text-lg text-ink/60">Tap a product to begin.</p>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col gap-3">
            {items.map((i) => (
              <CartLine key={i.id} item={i} />
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-end justify-between border-t border-ink/10 pt-4">
          <div>
            <div className="text-2xl font-bold">Total</div>
            <div className="text-base text-ink/60">
              You can review your order next.
            </div>
          </div>
          <span data-testid="cart-total" className="text-4xl font-bold">
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

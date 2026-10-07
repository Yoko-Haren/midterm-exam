import { usePosStore } from '../store/usePosStore'
import type { CartItem } from '../types'
import { peso } from '../utils/format'
import ProductArt from './ProductArt'

const ICON_BTN =
  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl font-bold transition-transform active:scale-90'

export default function CartLine({ item }: { item: CartItem }) {
  const incQty = usePosStore((s) => s.incQty)
  const decQty = usePosStore((s) => s.decQty)
  const removeItem = usePosStore((s) => s.removeItem)
  const showToast = usePosStore((s) => s.showToast)

  return (
    <li
      data-testid={`cart-line-${item.id}`}
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/80 bg-white/60 p-3"
    >
      <ProductArt id={item.id} className="h-14 w-14 rounded-xl" />

      <div className="min-w-[6rem] flex-1">
        <div className="text-lg font-bold">{item.name}</div>
        <div className="text-base text-cocoa/70">{peso(item.price)} each</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${item.name}`}
          onClick={() => {
            decQty(item.id)
            if (item.qty <= 1) showToast('Item removed')
          }}
          className={`${ICON_BTN} border border-cocoa/20 bg-white/80 text-cocoa active:bg-cream`}
        >
          −
        </button>
        <span
          data-testid={`qty-${item.id}`}
          className="w-10 text-center text-xl font-bold"
        >
          {item.qty}
        </span>
        <button
          type="button"
          aria-label={`Increase ${item.name}`}
          onClick={() => incQty(item.id)}
          className={`${ICON_BTN} bg-caramel text-white active:bg-cocoa`}
        >
          +
        </button>
      </div>

      <div
        data-testid={`subtotal-${item.id}`}
        className="w-24 text-right text-lg font-bold"
      >
        {peso(item.price * item.qty)}
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.name}`}
        onClick={() => {
          removeItem(item.id)
          showToast('Item removed')
        }}
        className={`${ICON_BTN} bg-danger text-white active:opacity-90`}
      >
        ×
      </button>
    </li>
  )
}

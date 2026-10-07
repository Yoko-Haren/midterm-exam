import { usePosStore } from '../store/usePosStore'
import type { CartItem } from '../types'
import { peso } from '../utils/format'

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
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-3"
    >
      <div className="min-w-[7rem] flex-1">
        <div className="text-lg font-semibold">{item.name}</div>
        <div className="text-lg text-slate-400">{peso(item.price)} each</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`Decrease ${item.name}`}
          onClick={() => {
            decQty(item.id)
            if (item.qty <= 1) showToast('Item removed')
          }}
          className={`${ICON_BTN} bg-slate-700 active:bg-slate-600`}
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
          className={`${ICON_BTN} bg-slate-700 active:bg-slate-600`}
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
        className={`${ICON_BTN} bg-rose-600 text-white active:bg-rose-500`}
      >
        ×
      </button>
    </li>
  )
}

import { usePosStore } from '../store/usePosStore'
import type { Product } from '../types'
import { peso } from '../utils/format'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = usePosStore((s) => s.addItem)
  const showToast = usePosStore((s) => s.showToast)

  return (
    <button
      type="button"
      data-testid={`product-${product.id}`}
      onClick={() => {
        addItem(product)
        showToast('Product added')
      }}
      className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center transition-transform active:scale-95 active:border-emerald-500"
    >
      <span className="text-2xl font-bold">{product.name}</span>
      <span className="text-2xl font-bold text-emerald-400">
        {peso(product.price)}
      </span>
    </button>
  )
}

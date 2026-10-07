import { PRODUCT_TAGLINES } from '../data/products'
import { usePosStore } from '../store/usePosStore'
import type { Product } from '../types'
import { peso } from '../utils/format'
import ProductArt from './ProductArt'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = usePosStore((s) => s.addItem)
  const showToast = usePosStore((s) => s.showToast)
  const inCart = usePosStore(
    (s) => s.items.find((i) => i.id === product.id)?.qty ?? 0,
  )

  return (
    <button
      type="button"
      data-testid={`product-${product.id}`}
      onClick={() => {
        addItem(product)
        showToast('Product added')
      }}
      className={`glass relative flex min-h-[120px] flex-col items-center gap-1 rounded-2xl p-4 text-center transition-transform active:scale-95 ${inCart > 0 ? 'ring-2 ring-caramel' : ''}`}
    >
      {inCart > 0 && (
        <span
          data-testid={`badge-${product.id}`}
          className="absolute right-3 top-3 z-10 flex h-9 min-w-[2.25rem] items-center justify-center rounded-full bg-cocoa px-2 text-base font-bold text-cream shadow-md"
        >
          <span aria-hidden="true">×</span>
          {inCart}
        </span>
      )}

      <ProductArt id={product.id} className="mb-2 aspect-square w-full max-w-[7.5rem]" />

      <span className="text-xl font-bold leading-tight">{product.name}</span>
      {PRODUCT_TAGLINES[product.id] && (
        <span className="text-sm leading-snug text-cocoa/70">
          {PRODUCT_TAGLINES[product.id]}
        </span>
      )}
      <span className="mt-auto pt-2 text-2xl font-extrabold text-caramel">
        {peso(product.price)}
      </span>
    </button>
  )
}

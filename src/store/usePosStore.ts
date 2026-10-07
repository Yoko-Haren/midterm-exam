import { create } from 'zustand'
import { PRODUCTS } from '../data/products'
import type { CartItem, PaymentMethod, Product, Screen, Txn } from '../types'
import { nextTxnId } from '../utils/transaction'

interface PosState {
  screen: Screen
  items: CartItem[]
  catalog: Product[]
  lastTransaction: Txn | null
  toast: string | null

  go: (screen: Screen) => void
  addItem: (product: Product) => void
  incQty: (id: string) => void
  decQty: (id: string) => void
  removeItem: (id: string) => void
  resetCart: () => void
  showToast: (msg: string) => void
  total: () => number
  completeTxn: (method: PaymentMethod, amountPaid: number) => void
}

const TOAST_MS = 2500
let toastTimer: ReturnType<typeof setTimeout> | undefined

// Work in centavos so money math never picks up floating point noise.
const toCents = (n: number) => Math.round(n * 100)

export const usePosStore = create<PosState>((set, get) => ({
  screen: 'items',
  items: [],
  catalog: PRODUCTS,
  lastTransaction: null,
  toast: null,

  go: (screen) => set({ screen }),

  addItem: (product) =>
    set((state) => {
      const exists = state.items.some((i) => i.id === product.id)
      return {
        items: exists
          ? state.items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
            )
          : [...state.items, { ...product, qty: 1 }],
      }
    }),

  incQty: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i,
      ),
    })),

  decQty: (id) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    })),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  resetCart: () => set({ items: [], lastTransaction: null }),

  showToast: (msg) => {
    clearTimeout(toastTimer)
    set({ toast: msg })
    toastTimer = setTimeout(() => set({ toast: null }), TOAST_MS)
  },

  total: () =>
    get().items.reduce((sum, i) => sum + toCents(i.price) * i.qty, 0) / 100,

  completeTxn: (method, amountPaid) => {
    const { items, total, showToast } = get()
    const due = total()
    const txn: Txn = {
      id: nextTxnId(),
      date: new Date().toISOString(),
      items: items.map((i) => ({ ...i })),
      total: due,
      method,
      amountPaid,
      change: (toCents(amountPaid) - toCents(due)) / 100,
    }
    set({ lastTransaction: txn, screen: 'success' })
    showToast('Transaction completed successfully')
  },
}))

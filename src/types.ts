export type Screen =
  | 'items'
  | 'summary'
  | 'method'
  | 'cash'
  | 'qr'
  | 'card'
  | 'success'
  | 'receipt'

export interface Product {
  id: string
  name: string
  price: number
}

export interface CartItem extends Product {
  qty: number
}

export type PaymentMethod = 'Cash' | 'QR Payment' | 'Credit/Debit Card'

export interface Txn {
  id: string
  date: string
  items: CartItem[]
  total: number
  method: PaymentMethod
  amountPaid: number
  change: number
}

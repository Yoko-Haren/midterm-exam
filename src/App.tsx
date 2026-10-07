import type { ReactElement } from 'react'
import Toast from './components/Toast'
import CardPayment from './screens/CardPayment'
import CashPayment from './screens/CashPayment'
import ItemSelection from './screens/ItemSelection'
import OrderSummary from './screens/OrderSummary'
import PaymentMethod from './screens/PaymentMethod'
import PaymentSuccess from './screens/PaymentSuccess'
import QrPayment from './screens/QrPayment'
import Receipt from './screens/Receipt'
import { usePosStore } from './store/usePosStore'
import type { Screen } from './types'

const SCREENS: Record<Screen, () => ReactElement | null> = {
  items: ItemSelection,
  summary: OrderSummary,
  method: PaymentMethod,
  cash: CashPayment,
  qr: QrPayment,
  card: CardPayment,
  success: PaymentSuccess,
  receipt: Receipt,
}

export default function App() {
  const screen = usePosStore((s) => s.screen)
  const Current = SCREENS[screen]

  return (
    <div className="flex h-full flex-col">
      <Toast />
      <header className="border-b border-slate-700 bg-slate-800 px-6 py-4">
        <span className="text-2xl font-bold">Campus Store POS</span>
      </header>
      <main className="flex flex-1 flex-col overflow-y-auto p-6">
        <Current />
      </main>
    </div>
  )
}

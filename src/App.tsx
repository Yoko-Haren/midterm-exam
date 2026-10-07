import type { ReactElement } from 'react'
import StepBar from './components/StepBar'
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
      <header className="glass-strong z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-x-0 border-t-0 px-6 py-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cocoa text-xl font-extrabold text-cream"
          >
            CS
          </span>
          <div>
            <div className="text-2xl font-extrabold leading-tight">
              Campus Store POS
            </div>
            <div className="text-sm text-cocoa/70">
              Self-service kiosk · Tap to order
            </div>
          </div>
        </div>
        <StepBar screen={screen} />
      </header>
      <main className="flex flex-1 flex-col overflow-y-auto p-6">
        <Current />
      </main>
    </div>
  )
}

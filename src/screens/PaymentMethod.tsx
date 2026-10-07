import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function PaymentMethod() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <h1 className="mb-2 text-3xl font-bold">Choose Payment Method</h1>
      <p className="mb-6 text-2xl">
        Amount due:{' '}
        <span data-testid="amount-due" className="font-bold text-emerald-400">
          {peso(total)}
        </span>
      </p>

      <div className="flex flex-col gap-4">
        <BigButton className="min-h-[88px]" onClick={() => go('cash')}>
          Cash
        </BigButton>
        <BigButton className="min-h-[88px]" onClick={() => go('qr')}>
          QR Payment
        </BigButton>
        <BigButton className="min-h-[88px]" onClick={() => go('card')}>
          Credit/Debit Card
        </BigButton>
        <BigButton variant="secondary" onClick={() => go('summary')}>
          Back
        </BigButton>
      </div>
    </div>
  )
}

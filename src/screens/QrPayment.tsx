import { QRCodeSVG } from 'qrcode.react'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

export default function QrPayment() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const completeTxn = usePosStore((s) => s.completeTxn)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center text-center">
      <h1 className="mb-2 text-3xl font-bold">QR Payment</h1>
      <p className="mb-6 text-2xl">
        Amount due:{' '}
        <span data-testid="amount-due" className="font-bold text-emerald-400">
          {peso(total)}
        </span>
      </p>

      <div data-testid="qr-code" className="rounded-2xl bg-white p-6">
        <QRCodeSVG value={`POS|AMOUNT=${total.toFixed(2)}`} size={240} />
      </div>

      <p className="mt-6 text-lg text-slate-300">
        Scan the QR code using your supported payment application.
      </p>

      <div className="mt-6 grid w-full grid-cols-2 gap-4">
        <BigButton variant="secondary" onClick={() => go('method')}>
          Back
        </BigButton>
        <BigButton onClick={() => completeTxn('QR Payment', total)}>
          Confirm Payment
        </BigButton>
      </div>
    </div>
  )
}

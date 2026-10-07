import { QRCodeSVG } from 'qrcode.react'
import AmountDue from '../components/AmountDue'
import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'

export default function QrPayment() {
  const total = usePosStore((s) => s.total())
  const go = usePosStore((s) => s.go)
  const completeTxn = usePosStore((s) => s.completeTxn)

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <p className="eyebrow">Payment · QR</p>
      <h1 className="text-3xl font-bold">QR Payment</h1>
      <p className="mb-4 mt-1 text-lg text-ink/60">
        Pay from your phone in a few seconds.
      </p>

      <AmountDue label="Amount due" amount={total} className="mb-6" />

      <div className="glass flex flex-col items-center rounded-2xl p-6 text-center">
        <div
          data-testid="qr-code"
          className="rounded-2xl bg-white p-5 shadow-lg shadow-cocoa/10"
        >
          <QRCodeSVG
            value={`POS|AMOUNT=${total.toFixed(2)}`}
            size={220}
            fgColor="#3B2A14"
          />
        </div>

        <p className="mt-5 text-lg font-semibold">
          Scan the QR code using your supported payment application.
        </p>
        <p className="mt-1 text-base text-ink/60">
          After paying in your app, tap Confirm Payment.
        </p>
      </div>

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

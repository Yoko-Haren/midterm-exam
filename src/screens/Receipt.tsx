import BigButton from '../components/BigButton'
import { usePosStore } from '../store/usePosStore'
import { peso } from '../utils/format'

const RULE = 'my-4 border-dashed border-black'

export default function Receipt() {
  const txn = usePosStore((s) => s.lastTransaction)
  const resetCart = usePosStore((s) => s.resetCart)
  const go = usePosStore((s) => s.go)

  const newTransaction = () => {
    resetCart()
    go('items')
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
      <p className="eyebrow">Receipt</p>
      <p className="mb-4 text-lg text-cocoa/70">
        Here is your digital receipt.
      </p>

      {txn && (
        <div
          data-testid="receipt"
          className="rounded-2xl bg-white p-6 font-mono text-lg text-black shadow-glass"
        >
          <h1 className="text-center text-2xl font-bold">CAMPUS STORE POS</h1>
          <p className="text-center text-base">
            Official digital receipt
          </p>
          <p className="mt-3 text-center font-bold" data-testid="receipt-txn-id">
            {txn.id}
          </p>
          <p className="text-center text-base">
            {new Date(txn.date).toLocaleString()}
          </p>

          <hr className={RULE} />

          <ul className="flex flex-col gap-3">
            {txn.items.map((i) => (
              <li key={i.id} data-testid={`receipt-line-${i.id}`}>
                <div className="flex justify-between gap-4">
                  <span>
                    {i.qty} × {i.name}
                  </span>
                  <span>{peso(i.price * i.qty)}</span>
                </div>
                <div className="text-base">
                  @ {peso(i.price)} each
                </div>
              </li>
            ))}
          </ul>

          <hr className={RULE} />

          <div className="flex justify-between text-xl font-bold">
            <span>TOTAL</span>
            <span data-testid="receipt-total">{peso(txn.total)}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span>Method</span>
            <span data-testid="receipt-method">{txn.method}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid</span>
            <span data-testid="receipt-paid">{peso(txn.amountPaid)}</span>
          </div>
          <div className="flex justify-between">
            <span>Change</span>
            <span data-testid="receipt-change">{peso(txn.change)}</span>
          </div>

          <hr className={RULE} />

          <p className="text-center font-bold">Payment Successful</p>
          <p className="mt-1 text-center text-base">
            Thank you. Please come again!
          </p>
        </div>
      )}

      <BigButton className="mt-6" onClick={newTransaction}>
        New Transaction
      </BigButton>
    </div>
  )
}

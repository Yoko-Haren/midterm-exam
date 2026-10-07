import { peso } from '../utils/format'

interface Props {
  label: string
  amount: number
  className?: string
}

/** Frosted banner showing the amount the customer has to pay. */
export default function AmountDue({ label, amount, className = '' }: Props) {
  return (
    <p
      className={`glass flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-xl ${className}`}
    >
      <span className="font-semibold">{label}:</span>
      <span
        data-testid="amount-due"
        className="text-3xl font-extrabold text-caramel"
      >
        {peso(amount)}
      </span>
    </p>
  )
}

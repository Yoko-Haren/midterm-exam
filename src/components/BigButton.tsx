import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-cocoa text-cream shadow-lg shadow-cocoa/25 active:bg-caramel disabled:shadow-none',
  secondary:
    'bg-white text-ink border border-ink/15 active:bg-linen',
  danger: 'bg-danger text-white shadow-lg shadow-danger/25 active:opacity-90',
}

export default function BigButton({
  variant = 'primary',
  className = '',
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={`min-h-[64px] rounded-2xl px-6 py-3 text-xl font-semibold transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100 ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  )
}

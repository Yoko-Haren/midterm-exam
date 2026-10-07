import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-emerald-500 text-slate-900 active:bg-emerald-400',
  secondary:
    'bg-slate-700 text-slate-100 border border-slate-600 active:bg-slate-600',
  danger: 'bg-rose-600 text-white active:bg-rose-500',
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
      className={`min-h-[64px] rounded-2xl px-6 py-3 text-xl font-bold transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100 ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  )
}

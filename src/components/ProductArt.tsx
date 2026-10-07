import type { ReactElement } from 'react'

const INK = '#624621'
const CARAMEL = '#9F6D2D'
const PAPER = '#FFFDF9'

const ART: Record<string, ReactElement> = {
  coffee: (
    <>
      <path
        d="M46 34c-5-6 5-9 0-16M60 32c-5-6 5-9 0-16M74 34c-5-6 5-9 0-16"
        fill="none"
        stroke={CARAMEL}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <ellipse cx="58" cy="100" rx="42" ry="8" fill={PAPER} />
      <ellipse cx="58" cy="99" rx="26" ry="4" fill="#D2D2D2" opacity="0.6" />
      <path
        d="M86 56h6a11 11 0 0 1 0 22h-9"
        fill="none"
        stroke={PAPER}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M28 48h60v16a30 30 0 0 1-60 0z" fill={PAPER} />
      <ellipse cx="58" cy="48" rx="30" ry="7" fill={PAPER} />
      <ellipse cx="58" cy="48" rx="25" ry="5" fill={INK} />
      <ellipse cx="50" cy="47" rx="8" ry="1.6" fill={CARAMEL} opacity="0.7" />
    </>
  ),
  sandwich: (
    <>
      <rect x="20" y="78" width="80" height="18" rx="9" fill="#E2A857" />
      <rect x="20" y="78" width="80" height="6" rx="3" fill="#F3CB8B" />
      <path d="M22 70h76l-12 10-14-6-12 8-12-8-12 6z" fill="#F4C542" />
      <rect x="24" y="62" width="72" height="9" rx="4.5" fill="#D9533B" />
      <path
        d="M18 60c6-8 10 2 16-4s10 4 16-2 10 4 16-2 10 4 16-2 10 2 20 2v8H18z"
        fill="#8DB255"
      />
      <path d="M20 54a18 22 0 0 1 18-22h44a18 22 0 0 1 18 22z" fill="#E2A857" />
      <path d="M26 46a14 12 0 0 1 14-10h40a14 12 0 0 1 14 10z" fill="#F3CB8B" />
      <g fill={PAPER}>
        <ellipse cx="46" cy="40" rx="3" ry="1.5" />
        <ellipse cx="62" cy="37" rx="3" ry="1.5" />
        <ellipse cx="76" cy="41" rx="3" ry="1.5" />
      </g>
    </>
  ),
  'soft-drink': (
    <>
      <path
        d="M70 12 62 42"
        stroke={INK}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M38 46h44l-5 56a5 5 0 0 1-5 4H48a5 5 0 0 1-5-4z" fill="#D9533B" />
      <path d="M40 64h40l-2 22H42z" fill={PAPER} opacity="0.92" />
      <path
        d="M47 79c5-8 9 2 13-4s8 2 13-4"
        fill="none"
        stroke="#D9533B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="33" y="38" width="54" height="10" rx="5" fill={PAPER} />
      <rect x="33" y="44" width="54" height="4" rx="2" fill="#D2D2D2" />
    </>
  ),
  cookies: (
    <>
      <circle cx="80" cy="46" r="24" fill="#C98E4A" />
      <circle cx="80" cy="46" r="24" fill="none" stroke={CARAMEL} strokeWidth="3" />
      <g fill={INK}>
        <circle cx="74" cy="36" r="4" />
        <circle cx="90" cy="42" r="3.5" />
        <circle cx="84" cy="58" r="3" />
      </g>
      <circle cx="48" cy="70" r="32" fill="#DDA661" />
      <circle cx="48" cy="70" r="32" fill="none" stroke={CARAMEL} strokeWidth="3" />
      <g fill={INK}>
        <circle cx="36" cy="58" r="5" />
        <circle cx="56" cy="54" r="4" />
        <circle cx="62" cy="74" r="5" />
        <circle cx="42" cy="82" r="4.5" />
        <circle cx="28" cy="74" r="3" />
        <circle cx="50" cy="68" r="3" />
      </g>
    </>
  ),
  'bottled-water': (
    <>
      <rect x="51" y="10" width="18" height="11" rx="3" fill="#4F8FB8" />
      <rect x="54" y="21" width="12" height="8" fill="#CFE8F3" />
      <path
        d="M44 44q0-15 10-15h12q10 0 10 15v56q0 10-10 10H54q-10 0-10-10z"
        fill="#CFE8F3"
        stroke="#8FC1DA"
        strokeWidth="2.5"
      />
      <rect x="44" y="56" width="32" height="26" fill="#4F8FB8" />
      <path
        d="M50 71c4-6 7 3 10-2s6 3 10-2"
        fill="none"
        stroke={PAPER}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M51 38v10M51 90v12"
        stroke={PAPER}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
    </>
  ),
  chocolate: (
    <g transform="rotate(-12 60 60)">
      <rect x="30" y="14" width="60" height="84" rx="6" fill={INK} />
      <g fill="#7A5830">
        <rect x="35" y="19" width="23" height="19" rx="3" />
        <rect x="62" y="19" width="23" height="19" rx="3" />
        <rect x="35" y="42" width="23" height="19" rx="3" />
        <rect x="62" y="42" width="23" height="19" rx="3" />
      </g>
      <path
        d="M26 68l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 2-2v10H26z"
        fill="#EEEBE4"
      />
      <rect x="26" y="72" width="68" height="34" rx="4" fill={CARAMEL} />
      <rect x="26" y="82" width="68" height="12" fill="#F8DAB2" />
      <rect x="40" y="86" width="40" height="4" rx="2" fill={INK} opacity="0.75" />
    </g>
  ),
}

const FALLBACK = (
  <>
    <path d="M34 46h52l6 54a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6z" fill={PAPER} />
    <path
      d="M46 54V40a14 14 0 0 1 28 0v14"
      fill="none"
      stroke={CARAMEL}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </>
)

interface Props {
  id: string
  className?: string
}

/** Illustrated product picture on a cream tile. Decorative: the name is always shown as text beside it. */
export default function ProductArt({ id, className = '' }: Props) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-linen ${className}`}
    >
      <svg viewBox="0 0 120 120" className="h-[86%] w-[86%]">
        {ART[id] ?? FALLBACK}
      </svg>
    </span>
  )
}

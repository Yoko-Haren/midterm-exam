import type { Screen } from '../types'

const STEPS = ['Order', 'Review', 'Pay', 'Done']

const STEP_OF: Record<Screen, number> = {
  items: 0,
  summary: 1,
  method: 2,
  cash: 2,
  qr: 2,
  card: 2,
  success: 3,
  receipt: 3,
}

export default function StepBar({ screen }: { screen: Screen }) {
  const current = STEP_OF[screen]

  return (
    <ol aria-label="Progress" className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo'
        return (
          <li
            key={label}
            aria-current={state === 'current' ? 'step' : undefined}
            className="flex items-center gap-2"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`h-0.5 w-4 rounded sm:w-8 ${i <= current ? 'bg-caramel' : 'bg-mist'}`}
              />
            )}
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-base font-bold ${
                state === 'current'
                  ? 'bg-ink text-white'
                  : state === 'done'
                    ? 'bg-caramel text-white'
                    : 'border border-mist bg-white text-ink/50'
              }`}
            >
              {state === 'done' ? '✓' : i + 1}
            </span>
            <span
              className={`hidden text-base md:inline ${state === 'current' ? 'font-bold' : 'text-ink/60'}`}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

# Midterm POS Kiosk — Campus Store

A touchscreen self-service point-of-sale kiosk for a small campus food and
merchandise outlet. Customers tap products to build an order, review it, pay by
Cash, QR, or Card (simulated), and get a digital receipt before the kiosk
resets for the next customer.

**Flow:** Item Selection → Order Summary → Payment Method → Payment Processing
→ Payment Successful → Receipt → New Transaction

## Features

- Six products with tap-to-add cards
- Quantity +/− and remove controls with live subtotals and total
- Order summary with Back navigation that preserves the cart
- Cash payment with validation and change calculation
- Simulated QR payment (generated QR code) and card payment (processing state)
- Unique, persistent transaction numbers (`TXN-YYYY-NNNNN`)
- Digital receipt and a full reset on New Transaction
- Toast feedback and large, high-contrast touch targets (≥ 64px)
- Category filter on the menu: All / Drinks / Food / Snacks
- Illustrated product pictures (inline SVG, no image files, works offline)
- Step indicator in the header: Order → Review → Pay → Done
- Responsive layout for desktop, tablet, and phone widths

## Design

A minimal light theme: plain off-white background, white cards, black text,
and brown used only as an accent.

| Token | Colour | Used for |
| --- | --- | --- |
| `ink` | `#141414` | Text, current step |
| `paper` | `#F6F5F2` | Page background |
| `cocoa` | `#624621` | Primary buttons, active filter |
| `caramel` | `#9F6D2D` | Prices, labels, card outlines |
| `cream` | `#F8DAB2` | Text on brown buttons |
| `linen` | `#EEEBE4` | Picture tiles, pills |
| `mist` | `#D2D2D2` | Dividers, inactive steps |
| `danger` | `#B3402E` | Remove button, errors |

The typeface is Inter, bundled with the app through
`@fontsource-variable/inter` so the kiosk needs no network. The receipt uses a
monospace font in black.

## Tech stack

- React + TypeScript (Vite)
- Zustand for state management
- Tailwind CSS v3 for styling, Inter typeface (@fontsource-variable/inter)
- qrcode.react for the QR code
- Vitest + React Testing Library (jsdom) for tests

## Setup

```bash
npm install
```

```bash
npm run dev
```

```bash
npm test
```

```bash
npm run build
```

## Project structure

```
src/
  types.ts               shared types
  data/products.ts       hard-coded product catalog, taglines, categories
  utils/format.ts        peso formatter
  utils/transaction.ts   transaction number generator
  store/usePosStore.ts   Zustand store (cart, screen, transaction, toast)
  components/            BigButton, Toast, ProductCard, CartLine, ProductArt,
                         StepBar, AmountDue
  screens/               one component per kiosk screen
  tests/pos.test.tsx     instructor verification cases
```

## Why hard-coded products and a localStorage counter?

A single kiosk at a small outlet sells a short, rarely changing menu, so the
product list lives in `src/data/products.ts` — there is no need for a database
or backend, and the kiosk keeps working with no network. The only thing that
must survive between customers and page reloads is the transaction counter, so
it is stored in `localStorage` under `pos_txn_counter`. That keeps every
transaction number unique on the device even after a refresh or restart, while
the cart and payment details stay in memory only and are wiped on New
Transaction so no customer data leaks into the next order.

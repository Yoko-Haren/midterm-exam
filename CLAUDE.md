# CLAUDE.md — Touchscreen POS Kiosk (Midterm Exam)

You are building a complete React POS Kiosk for a campus outlet.
Build the ENTIRE project end-to-end in one session. Do not ask
clarifying questions. Make reasonable decisions and proceed.

====================================================================
## 0. FIRST ACTIONS (do these in order)
====================================================================

1. Scaffold the project:
   npm create vite@latest . -- --template react-ts
   npm install
   npm install zustand qrcode.react
   npm install -D tailwindcss@3 postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
   npx tailwindcss init -p

2. Configure tailwind (content paths for ./index.html and ./src/**/*.{ts,tsx})

3. Create every file listed in section 3 below with COMPLETE WORKING CODE.

4. Run `npm run build`. Fix any errors.

5. Run `npm test`. Fix any errors.

6. Commit after each major milestone (git init first, then commit).
   Use Conventional Commits. Create feature branches per screen group.

====================================================================
## 1. PURPOSE
====================================================================

A small campus food/merch outlet needs a touchscreen self-service POS.
Customers tap products, review their order, choose Cash / QR / Card,
pay, see a success screen, view a receipt, then start a new transaction.

Required flow:
  Item Selection → Order Summary → Payment Method → Payment Processing
    → Payment Successful → Receipt → New Transaction (reset)

====================================================================
## 2. HARD REQUIREMENTS (must all pass)
====================================================================

1.  At least 6 products, each with visible name + price.
2.  Tap product card → adds to cart.
3.  Quantity +/- controls, never below 0, remove button.
4.  Auto-calculated item subtotals.
5.  Auto-calculated transaction total.
6.  Order Summary shows identical data to Item Selection.
7.  Back from Summary preserves cart.
8.  Three payment methods: Cash, QR Payment, Credit/Debit Card.
9.  Cash: input amount paid, calculate change.
10. Cash: reject if paid < total with message
    "Insufficient payment. Please enter at least ₱X".
11. Cash: exact payment is valid, change = ₱0.00.
12. QR: show amount, QR code, instructions, Confirm Payment button.
13. Card: show "Please tap, insert, or swipe your card.", Process Payment,
    and a "Processing payment..." state (~1.5s).
14. Payment Successful screen with transaction number and View Receipt.
15. Transaction number is unique per transaction.
    Format: TXN-YYYY-NNNNN (5-digit zero-padded, persistent counter).
16. Receipt shows: txn no, date, items (qty × name), unit price, subtotal,
    total, method, amount paid, change, "Payment Successful".
17. New Transaction clears cart, payment info, previous receipt, and total.
    Previous customer data MUST NOT leak into the new transaction.
18. Large touch targets (≥64px). Kiosk-style UI. High contrast.
    No typing required except cash amount.
19. Meaningful feedback via toast: "Product added", "Item removed",
    "Insufficient payment", "Transaction completed successfully".
20. For QR and Card simulations: amountPaid = total, change = ₱0.00.

====================================================================
## 3. FILES TO CREATE
====================================================================

### tailwind.config.js
content: ["./index.html", "./src/**/*.{ts,tsx}"]

### src/index.css
@tailwind base; @tailwind components; @tailwind utilities;
html, body, #root { height: 100%; }
body { @apply bg-slate-900 text-slate-100 font-sans; }

### src/types.ts
export type Screen =
  | 'items' | 'summary' | 'method'
  | 'cash' | 'qr' | 'card'
  | 'success' | 'receipt';

export interface Product { id: string; name: string; price: number; }
export interface CartItem extends Product { qty: number; }
export type PaymentMethod = 'Cash' | 'QR Payment' | 'Credit/Debit Card';

export interface Txn {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  method: PaymentMethod;
  amountPaid: number;
  change: number;
}

### src/data/products.ts
Six products (Coffee 45, Sandwich 50, Soft Drink 35,
Cookies 25, Bottled Water 20, Chocolate 25).

### src/utils/format.ts
export const peso = (n: number) => `₱${n.toFixed(2)}`;

### src/utils/transaction.ts
nextTxnId() uses localStorage key "pos_txn_counter", increments,
returns `TXN-${YEAR}-${String(n).padStart(5,'0')}`.

### src/store/usePosStore.ts  (Zustand)
State:
  screen: Screen = 'items'
  items: CartItem[] = []
  catalog: Product[] = PRODUCTS
  lastTransaction: Txn | null = null
  toast: string | null = null

Actions:
  go(screen)
  addItem(product)       // increments qty if exists, else push qty=1
  incQty(id)
  decQty(id)             // removes item when qty hits 0
  removeItem(id)
  resetCart()            // items=[], lastTransaction=null
  showToast(msg)         // auto-clears after 2500ms
  total()                // sum(price * qty)
  completeTxn(method, amountPaid)
    // builds Txn with nextTxnId(), sets lastTransaction, goes to 'success',
    // shows "Transaction completed successfully"

### src/components/BigButton.tsx
min-h-[64px], rounded-2xl, variants primary (emerald) / secondary (slate)
/ danger (rose). Disabled state opacity-40.

### src/components/Toast.tsx
Fixed top-center, reads store.toast, slate-800 with border, auto hides.

### src/components/ProductCard.tsx
min-h-[120px] button, name + emerald price, active:scale-95.
onClick → addItem(product).

### src/components/CartLine.tsx
Row: name + unit price | - qty + | subtotal | × remove button.
Buttons are ≥40px. decQty on −, incQty on +, removeItem on ×.

### src/screens/ItemSelection.tsx
Layout: 2-col grid on md+, products on left (2-3 cols), cart panel on right.
Cart shows CartLine list, total, and "Proceed to Payment" BigButton
(disabled when cart empty).

### src/screens/OrderSummary.tsx
Table: Item | Qty | Unit | Subtotal. Total row. Buttons: Back (→ items),
Continue to Payment (→ method).

### src/screens/PaymentMethod.tsx
Shows "Amount due: ₱X". Three BigButtons: Cash → 'cash', QR Payment → 'qr',
Credit/Debit Card → 'card'. Back → 'summary'.

### src/screens/CashPayment.tsx
Shows total due. Number input (inputMode="decimal", min=0). Live change
preview. "Pay Now" BigButton.
  - If paid < total or invalid/blank/negative → showToast
    "Insufficient payment. Please enter at least ₱X" and DO NOT complete.
  - Else → completeTxn('Cash', Number(paid)).
Back → 'method'.

### src/screens/QrPayment.tsx
Use QRCodeSVG from 'qrcode.react' with value `POS|AMOUNT=${total.toFixed(2)}`.
Show amount, white QR box, instruction text "Scan the QR code using your
supported payment application.", BigButton "Confirm Payment" →
completeTxn('QR Payment', total). Back → 'method'.

### src/screens/CardPayment.tsx
Shows amount due. Text "Please tap, insert, or swipe your card."
BigButton "Process Payment" → setProcessing(true), setTimeout 1500ms →
completeTxn('Credit/Debit Card', total). While processing, show
"Processing payment..." text and hide the button. Back disabled while
processing.

### src/screens/PaymentSuccess.tsx
✅ icon, "Payment Successful", transaction no, rows for Amount / Method /
Amount paid / Change. BigButton "View Receipt" → go('receipt').

### src/screens/Receipt.tsx
White receipt panel (font-mono, slate-900 text): header "CAMPUS STORE POS",
txn no, date via toLocaleString, dashed hr, item lines "qty × name   subtotal",
dashed hr, TOTAL, Method, Amount Paid, Change, "Payment Successful".
BigButton "New Transaction" → resetCart() then go('items').

### src/App.tsx
Renders <Toast /> and switches on screen to render the correct screen
component. Full-height flex column layout.

### src/main.tsx
Standard React 18 createRoot render of <App /> with StrictMode.

### src/tests/pos.test.tsx
Write Vitest + RTL tests covering ALL 15 instructor checks:
  1. renders 6 products with name + price
  2. Coffee×2 + Sandwich + Soft Drink → total ₱175
  3. inc Coffee to 3 → ₱220; dec back → ₱175
  4. remove Soft Drink → ₱140
  5. Order Summary shows same data
  6. Back from summary preserves cart
  7. Payment Method shows Cash, QR Payment, Credit/Debit Card
  8. Cash ₱100 on ₱140 → rejected, still on 'cash', lastTransaction null
  9. Cash ₱200 on ₱140 → change ₱60, screen 'success'
 10. Cash exact ₱140 → change ₱0
 11. QR confirm → success, change ₱0
 12. Card process → success, change ₱0
 13. Success screen shows txn id + "View Receipt"
 14. Receipt shows txn id, items, total, method, paid, change
 15. New Transaction clears cart, total 0; two txns have different ids

Use beforeEach to localStorage.clear() and reset store state.

### vitest.config.ts
environment: 'jsdom', globals: true, setupFiles with
'@testing-library/jest-dom' imported.

### README.md
Project title, description, tech stack, setup commands
(npm install, npm run dev, npm test, npm run build),
and a short paragraph explaining why hard-coded product data +
localStorage counter is appropriate (no DB needed for kiosk,
persists counter across reloads).

### AI_USAGE.md
Template with sections: Prompt used, What the AI produced,
What I changed manually, Which commit/branch it maps to.
Leave placeholders for the student to fill in.

====================================================================
## 4. GIT WORKFLOW (do this as you build)
====================================================================

git init
git commit -m "chore: scaffold vite + react + tailwind"

Then ONE branch + commit per milestone:

  feat/store             → "feat(store): add zustand pos store"
  feat/items             → "feat(items): product grid with tap-to-add"
  feat/cart              → "feat(cart): qty +/- and remove controls"
  feat/summary           → "feat(summary): order summary with back nav"
  feat/payment-method    → "feat(payment): three-method selection screen"
  feat/cash              → "feat(cash): validation and change calculation"
  feat/qr                → "feat(qr): simulated QR confirm"
  feat/card              → "feat(card): simulated card processing state"
  feat/success           → "feat(success): txn number + confirmation screen"
  feat/receipt           → "feat(receipt): digital receipt + new transaction"
  test/instructor-checks → "test: cover 15 instructor verification cases"
  docs/readme-ai         → "docs: README and AI usage log"

Commit after each milestone. Push to a GitHub repo named
`midterm-pos-kiosk` when done (user will handle remote).

====================================================================
## 5. UI STYLE GUIDE
====================================================================

Warm light theme with glassmorphism (supersedes the slate/emerald colours
mentioned in section 3). Colours are Tailwind tokens in tailwind.config.js:

- cocoa   #624621 — text, primary buttons
- caramel #9F6D2D — accents, prices, eyebrow labels
- cream   #F8DAB2 — highlights, text on cocoa
- linen   #EEEBE4 — page background
- mist    #D2D2D2 — dividers, inactive states
- danger  #B3402E — remove / error only
- Surfaces: `.glass` / `.glass-strong` (frosted white, backdrop blur) from src/index.css
- Muted text: text-cocoa/70
- Products show an illustration (src/components/ProductArt.tsx) plus name, tagline, price
- Rounded-2xl on cards/buttons
- Every tap target ≥ 64px height (buttons), ≥ 40px (icon controls)
- Font sizes: headings text-3xl, body text-lg minimum
- No tiny links. No hover-only interactions. Kiosk-friendly.

====================================================================
## 6. DEFINITION OF DONE
====================================================================

- npm run dev shows a working kiosk
- npm run build succeeds with no TS errors
- npm test passes all 15 cases
- Full transaction: 2×Coffee + 1×Sandwich + 1×SoftDrink = ₱175
  - Cash ₱200 → change ₱25 → success → receipt → new transaction
  - Cart cleared, total ₱0, screen 'items'
- All 20 hard requirements above verified
- README.md and AI_USAGE.md present
- Git history shows one commit per milestone with Conventional Commit msgs

Print a final summary listing every file created, build result,
test result, and the git log.
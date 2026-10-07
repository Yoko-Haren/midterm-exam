import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'
import { usePosStore } from '../store/usePosStore'

const store = () => usePosStore.getState()

const tap = (name: string | RegExp) =>
  fireEvent.click(screen.getByRole('button', { name }))

const addProduct = (id: string, times = 1) => {
  for (let i = 0; i < times; i++) {
    fireEvent.click(screen.getByTestId(`product-${id}`))
  }
}

/** Coffee×2 + Sandwich + Soft Drink = ₱175 */
const buildBaseCart = () => {
  addProduct('coffee', 2)
  addProduct('sandwich')
  addProduct('soft-drink')
}

/** Coffee×2 + Sandwich = ₱140 */
const buildCart140 = () => {
  addProduct('coffee', 2)
  addProduct('sandwich')
}

const goToMethod = () => {
  tap('Proceed to Payment')
  tap('Continue to Payment')
}

const payCash = (amount: string) => {
  tap('Cash')
  fireEvent.change(screen.getByLabelText('Amount paid'), {
    target: { value: amount },
  })
  tap('Pay Now')
}

beforeEach(() => {
  localStorage.clear()
  usePosStore.setState({
    screen: 'items',
    items: [],
    lastTransaction: null,
    toast: null,
  })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('POS kiosk — instructor checks', () => {
  it('1. renders 6 products with name + price', () => {
    render(<App />)
    const expected: [string, string, string][] = [
      ['coffee', 'Coffee', '₱45.00'],
      ['sandwich', 'Sandwich', '₱50.00'],
      ['soft-drink', 'Soft Drink', '₱35.00'],
      ['cookies', 'Cookies', '₱25.00'],
      ['bottled-water', 'Bottled Water', '₱20.00'],
      ['chocolate', 'Chocolate', '₱25.00'],
    ]
    expect(screen.getAllByTestId(/^product-/)).toHaveLength(6)
    for (const [id, name, price] of expected) {
      const card = screen.getByTestId(`product-${id}`)
      expect(within(card).getByText(name)).toBeInTheDocument()
      expect(within(card).getByText(price)).toBeInTheDocument()
    }
  })

  it('2. Coffee×2 + Sandwich + Soft Drink → total ₱175', () => {
    render(<App />)
    buildBaseCart()
    expect(screen.getByTestId('qty-coffee')).toHaveTextContent('2')
    expect(screen.getByTestId('subtotal-coffee')).toHaveTextContent('₱90.00')
    expect(screen.getByTestId('subtotal-sandwich')).toHaveTextContent('₱50.00')
    expect(screen.getByTestId('subtotal-soft-drink')).toHaveTextContent(
      '₱35.00',
    )
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱175.00')
    expect(screen.getByTestId('toast')).toHaveTextContent('Product added')
  })

  it('3. inc Coffee to 3 → ₱220; dec back → ₱175', () => {
    render(<App />)
    buildBaseCart()
    tap('Increase Coffee')
    expect(screen.getByTestId('qty-coffee')).toHaveTextContent('3')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱220.00')
    tap('Decrease Coffee')
    expect(screen.getByTestId('qty-coffee')).toHaveTextContent('2')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱175.00')
  })

  it('4. remove Soft Drink → ₱140', () => {
    render(<App />)
    buildBaseCart()
    tap('Remove Soft Drink')
    expect(screen.queryByTestId('cart-line-soft-drink')).not.toBeInTheDocument()
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱140.00')
    expect(screen.getByTestId('toast')).toHaveTextContent('Item removed')
  })

  it('4b. quantity never goes below 0 — decrementing at 1 removes the line', () => {
    render(<App />)
    addProduct('cookies')
    tap('Decrease Cookies')
    expect(screen.queryByTestId('cart-line-cookies')).not.toBeInTheDocument()
    expect(store().items).toEqual([])
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱0.00')
    expect(tapTarget('Proceed to Payment')).toBeDisabled()
  })

  it('5. Order Summary shows same data', () => {
    render(<App />)
    buildBaseCart()
    tap('Proceed to Payment')
    expect(store().screen).toBe('summary')

    const coffee = screen.getByTestId('summary-row-coffee')
    expect(coffee).toHaveTextContent('Coffee')
    expect(within(coffee).getByText('2')).toBeInTheDocument()
    expect(within(coffee).getByText('₱45.00')).toBeInTheDocument()
    expect(within(coffee).getByText('₱90.00')).toBeInTheDocument()

    const sandwich = screen.getByTestId('summary-row-sandwich')
    expect(sandwich).toHaveTextContent('Sandwich')
    expect(within(sandwich).getByText('1')).toBeInTheDocument()

    const drink = screen.getByTestId('summary-row-soft-drink')
    expect(drink).toHaveTextContent('Soft Drink')
    expect(within(drink).getByText('1')).toBeInTheDocument()

    expect(screen.getAllByTestId(/^summary-row-/)).toHaveLength(3)
    expect(screen.getByTestId('summary-total')).toHaveTextContent('₱175.00')
  })

  it('6. Back from summary preserves cart', () => {
    render(<App />)
    buildBaseCart()
    tap('Proceed to Payment')
    tap('Back')
    expect(store().screen).toBe('items')
    expect(screen.getByTestId('qty-coffee')).toHaveTextContent('2')
    expect(screen.getByTestId('qty-sandwich')).toHaveTextContent('1')
    expect(screen.getByTestId('qty-soft-drink')).toHaveTextContent('1')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱175.00')
  })

  it('7. Payment Method shows Cash, QR Payment, Credit/Debit Card', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    expect(store().screen).toBe('method')
    expect(screen.getByTestId('amount-due')).toHaveTextContent('₱140.00')
    expect(tapTarget('Cash')).toBeInTheDocument()
    expect(tapTarget('QR Payment')).toBeInTheDocument()
    expect(tapTarget('Credit/Debit Card')).toBeInTheDocument()
  })

  it('8. Cash ₱100 on ₱140 → rejected, still on cash, lastTransaction null', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    payCash('100')
    expect(store().screen).toBe('cash')
    expect(store().lastTransaction).toBeNull()
    expect(screen.getByTestId('toast')).toHaveTextContent(
      'Insufficient payment. Please enter at least ₱140.00',
    )
  })

  it('8b. Cash blank or negative → rejected', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    tap('Cash')
    tap('Pay Now')
    expect(store().screen).toBe('cash')
    fireEvent.change(screen.getByLabelText('Amount paid'), {
      target: { value: '-200' },
    })
    tap('Pay Now')
    expect(store().screen).toBe('cash')
    expect(store().lastTransaction).toBeNull()
  })

  it('9. Cash ₱200 on ₱140 → change ₱60, screen success', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    payCash('200')
    expect(store().screen).toBe('success')
    expect(store().lastTransaction).toMatchObject({
      method: 'Cash',
      total: 140,
      amountPaid: 200,
      change: 60,
    })
    expect(screen.getByTestId('success-change')).toHaveTextContent('₱60.00')
    expect(screen.getByTestId('toast')).toHaveTextContent(
      'Transaction completed successfully',
    )
  })

  it('10. Cash exact ₱140 → change ₱0', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    payCash('140')
    expect(store().screen).toBe('success')
    expect(store().lastTransaction?.change).toBe(0)
    expect(screen.getByTestId('success-change')).toHaveTextContent('₱0.00')
  })

  it('11. QR confirm → success, change ₱0', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    tap('QR Payment')
    expect(screen.getByTestId('amount-due')).toHaveTextContent('₱140.00')
    expect(screen.getByTestId('qr-code').querySelector('svg')).not.toBeNull()
    expect(
      screen.getByText(
        'Scan the QR code using your supported payment application.',
      ),
    ).toBeInTheDocument()
    tap('Confirm Payment')
    expect(store().screen).toBe('success')
    expect(store().lastTransaction).toMatchObject({
      method: 'QR Payment',
      amountPaid: 140,
      change: 0,
    })
  })

  it('12. Card process → success, change ₱0', () => {
    vi.useFakeTimers()
    render(<App />)
    buildCart140()
    goToMethod()
    tap('Credit/Debit Card')
    expect(
      screen.getByText('Please tap, insert, or swipe your card.'),
    ).toBeInTheDocument()
    tap('Process Payment')
    expect(screen.getByText('Processing payment...')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Process Payment' }),
    ).not.toBeInTheDocument()
    expect(tapTarget('Back')).toBeDisabled()
    expect(store().screen).toBe('card')

    act(() => {
      vi.advanceTimersByTime(1500)
    })
    expect(store().screen).toBe('success')
    expect(store().lastTransaction).toMatchObject({
      method: 'Credit/Debit Card',
      amountPaid: 140,
      change: 0,
    })
  })

  it('13. Success screen shows txn id + "View Receipt"', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    payCash('200')
    const year = new Date().getFullYear()
    expect(screen.getByText('Payment Successful')).toBeInTheDocument()
    expect(screen.getByTestId('txn-id')).toHaveTextContent(`TXN-${year}-00001`)
    expect(store().lastTransaction?.id).toMatch(/^TXN-\d{4}-\d{5}$/)
    expect(tapTarget('View Receipt')).toBeInTheDocument()
  })

  it('14. Receipt shows txn id, items, total, method, paid, change', () => {
    render(<App />)
    buildCart140()
    goToMethod()
    payCash('200')
    const id = store().lastTransaction!.id
    tap('View Receipt')
    expect(store().screen).toBe('receipt')

    const receipt = screen.getByTestId('receipt')
    expect(receipt).toHaveTextContent('CAMPUS STORE POS')
    expect(screen.getByTestId('receipt-txn-id')).toHaveTextContent(id)
    expect(
      within(receipt).getByText(
        new Date(store().lastTransaction!.date).toLocaleString(),
      ),
    ).toBeInTheDocument()

    const coffee = screen.getByTestId('receipt-line-coffee')
    expect(coffee).toHaveTextContent('2 × Coffee')
    expect(coffee).toHaveTextContent('₱45.00')
    expect(coffee).toHaveTextContent('₱90.00')
    expect(screen.getByTestId('receipt-line-sandwich')).toHaveTextContent(
      '1 × Sandwich',
    )

    expect(screen.getByTestId('receipt-total')).toHaveTextContent('₱140.00')
    expect(screen.getByTestId('receipt-method')).toHaveTextContent('Cash')
    expect(screen.getByTestId('receipt-paid')).toHaveTextContent('₱200.00')
    expect(screen.getByTestId('receipt-change')).toHaveTextContent('₱60.00')
    expect(receipt).toHaveTextContent('Payment Successful')
  })

  it('15. New Transaction clears cart, total 0; two txns have different ids', () => {
    render(<App />)
    buildBaseCart()
    goToMethod()
    payCash('200')
    expect(store().lastTransaction?.change).toBe(25)
    const firstId = store().lastTransaction!.id
    tap('View Receipt')
    tap('New Transaction')

    expect(store().screen).toBe('items')
    expect(store().items).toEqual([])
    expect(store().total()).toBe(0)
    expect(store().lastTransaction).toBeNull()
    expect(screen.queryByTestId(/^cart-line-/)).not.toBeInTheDocument()
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱0.00')

    // Second customer: nothing from the first transaction may leak through.
    addProduct('cookies')
    goToMethod()
    tap('Cash')
    expect(screen.getByLabelText('Amount paid')).toHaveValue(null)
    tap('Back')
    tap('QR Payment')
    tap('Confirm Payment')

    const second = store().lastTransaction!
    const year = new Date().getFullYear()
    expect(firstId).toBe(`TXN-${year}-00001`)
    expect(second.id).toBe(`TXN-${year}-00002`)
    expect(second.id).not.toBe(firstId)
    expect(second.items).toEqual([
      { id: 'cookies', name: 'Cookies', price: 25, qty: 1 },
    ])
    expect(second.total).toBe(25)
  })

  it('16. category filter shows All / Drinks / Food / Snacks and keeps the cart', () => {
    render(<App />)
    const shown = () =>
      screen.getAllByTestId(/^product-/).map((el) => el.dataset.testid)

    addProduct('coffee')
    tap('Drinks')
    expect(tapTarget('Drinks')).toHaveAttribute('aria-pressed', 'true')
    expect(shown()).toEqual([
      'product-coffee',
      'product-soft-drink',
      'product-bottled-water',
    ])
    tap('Food')
    expect(shown()).toEqual(['product-sandwich'])
    tap('Snacks')
    expect(shown()).toEqual(['product-cookies', 'product-chocolate'])
    addProduct('cookies')
    tap('All')
    expect(shown()).toHaveLength(6)
    expect(screen.getByTestId('cart-total')).toHaveTextContent('₱70.00')
  })
})

function tapTarget(name: string) {
  return screen.getByRole('button', { name })
}

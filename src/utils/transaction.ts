const COUNTER_KEY = 'pos_txn_counter'

export function nextTxnId(): string {
  const last = Number(localStorage.getItem(COUNTER_KEY))
  const n = (Number.isInteger(last) && last > 0 ? last : 0) + 1
  localStorage.setItem(COUNTER_KEY, String(n))
  return `TXN-${new Date().getFullYear()}-${String(n).padStart(5, '0')}`
}

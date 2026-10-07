import type { Product } from '../types'

export const PRODUCTS: Product[] = [
  { id: 'coffee', name: 'Coffee', price: 45 },
  { id: 'sandwich', name: 'Sandwich', price: 50 },
  { id: 'soft-drink', name: 'Soft Drink', price: 35 },
  { id: 'cookies', name: 'Cookies', price: 25 },
  { id: 'bottled-water', name: 'Bottled Water', price: 20 },
  { id: 'chocolate', name: 'Chocolate', price: 25 },
]

/** Short display blurbs, keyed by product id. Presentation only. */
export const PRODUCT_TAGLINES: Record<string, string> = {
  coffee: 'Freshly brewed, served hot',
  sandwich: 'Toasted bread, fresh filling',
  'soft-drink': 'Ice-cold and fizzy',
  cookies: 'Baked chocolate chip',
  'bottled-water': 'Chilled, 500 ml',
  chocolate: 'Smooth milk chocolate bar',
}

export type Category = 'Drinks' | 'Food' | 'Snacks'

export const CATEGORY_FILTERS: ('All' | Category)[] = [
  'All',
  'Drinks',
  'Food',
  'Snacks',
]

/** Menu category, keyed by product id. Used by the filter on Item Selection. */
export const PRODUCT_CATEGORIES: Record<string, Category> = {
  coffee: 'Drinks',
  'soft-drink': 'Drinks',
  'bottled-water': 'Drinks',
  sandwich: 'Food',
  cookies: 'Snacks',
  chocolate: 'Snacks',
}

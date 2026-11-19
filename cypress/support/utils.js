export const CART_STORAGE_KEY = 'shop-cart-data'

export const formatPrice = (amount) => `$${amount.toFixed(2)}`

export const productPath = (product) => `/detail/${product.category}/${product.name}`

export const cartTotal = (entries) =>
  entries.reduce((total, { item, quantity }) => total + item.price * quantity, 0)

// Mirrors the shop's own label, e.g. "Shopping cart: 1 item" / "Shopping cart: 3 items".
export const cartButtonLabel = (count) =>
  `Shopping cart: ${count} ${count === 1 ? 'item' : 'items'}`

export const cartEntry = (item, { size = 'M', quantity = 1 } = {}) => ({ item, size, quantity })

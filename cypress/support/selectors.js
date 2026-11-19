// The preference here would be to add data-cy attributes
// if data-cy attributes become available, only this file would change

export const app = 'shop-app'

// Each route renders inside its own custom element. Queries also descend into
// nested components so headings are matched together with their text

export const pages = {
  home: 'shop-home',
  list: 'shop-list',
  detail: 'shop-detail',
  cart: 'shop-cart',
  checkout: 'shop-checkout',
}

export const header = {
  homeLink: 'a[aria-label="SHOP Home"]',
  cartButton: 'paper-icon-button[aria-label^="Shopping cart"]',
  categoryTab: (category) => `shop-tab a[href="/list/${category}"]`,
}

export const home = {
  shopNowLink: (categoryTitle) => `a[aria-label="${categoryTitle} Shop Now"]`,
}

export const list = {
  heading: 'h1',
  item: 'shop-list-item',
  productLink: (path) => `a[href="${path}"]`,
}

export const detail = {
  heading: 'h1',
  price: '.price',
  sizeSelect: '#sizeSelect',
  quantitySelect: '#quantitySelect',
  addToCartButton: 'button[aria-label="Add this item to cart"]',
}

export const cartModal = {
  root: 'shop-cart-modal',
  viewCartLink: 'a[href="/cart"]',
  checkoutLink: 'a[href="/checkout"]',
}

export const cart = {
  item: 'shop-cart-item',
  quantitySelect: 'select[aria-label="Change quantity"]',
  deleteButton: (title) => `paper-icon-button[aria-label="Delete item ${title}"]`,
  total: '.subtotal',
  checkoutLink: 'a[href="/checkout"]',
}

export const checkout = {
  field: (name) => `[name="${name}"]`,
  placeOrderButton: 'input[value="Place Order"]',
}

import header from '../pages/Header'
import productDetailPage from '../pages/ProductDetailPage'
import cartPage from '../pages/CartPage'
import { techShell } from '../fixtures/products.json'
import { cartButtonLabel, formatPrice } from '../support/utils'

describe('Adding a product to the cart', () => {
  beforeEach(() => {
    productDetailPage.visit(techShell)
  })

  it('shows the product details', () => {
    productDetailPage.heading(techShell.title).should('be.visible')
    productDetailPage.price().should('have.text', formatPrice(techShell.price))
  })

  it('adds the chosen size and quantity to the cart', () => {
    productDetailPage.addToCart({ size: 'L', quantity: 2 })

    productDetailPage.cartModal().contains('Added to cart').should('be.visible')
    header.cartButton().should('have.attr', 'aria-label', cartButtonLabel(2))

    productDetailPage.viewCartFromModal()

    cy.location('pathname').should('eq', '/cart')
    cartPage.items().should('have.length', 1)
    cartPage.total().should('have.text', formatPrice(techShell.price * 2))
  })
})

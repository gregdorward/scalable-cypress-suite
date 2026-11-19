import { cartModal, detail, pages } from '../support/selectors'
import { productPath } from '../support/utils'

class ProductDetailPage {
  root() {
    return cy.get(pages.detail)
  }

  // The size/quantity selects reset when product data arrives, so wait for it before interacting.
  visit(product) {
    cy.visitShop(productPath(product))
    this.heading(product.title).should('be.visible')
  }

  heading(text) {
    return this.root().contains(detail.heading, text)
  }

  price() {
    return this.root().find(detail.price)
  }

  addToCart({ size, quantity } = {}) {
    if (size) this.root().find(detail.sizeSelect).select(size)
    if (quantity) this.root().find(detail.quantitySelect).select(String(quantity))
    this.root().find(detail.addToCartButton).click()
  }

  cartModal() {
    return cy.get(cartModal.root)
  }

  viewCartFromModal() {
    this.cartModal().find(cartModal.viewCartLink).click()
  }
}

export default new ProductDetailPage()

import { cart, pages } from '../support/selectors'

class CartPage {
  root() {
    return cy.get(pages.cart)
  }

  visit(entries = []) {
    cy.visitWithCart('/cart', entries)
    this.items().should('have.length', entries.length)
  }

  items() {
    return this.root().find(cart.item)
  }

  total() {
    return this.root().find(cart.total)
  }

  setQuantity(index, quantity) {
    this.items().eq(index).find(cart.quantitySelect).select(String(quantity))
  }

  removeItem(title) {
    this.root().find(cart.deleteButton(title)).click()
  }

  checkout() {
    this.root().find(cart.checkoutLink).click()
  }
}

export default new CartPage()

import { checkout, pages } from '../support/selectors'

class CheckoutPage {
  root() {
    return cy.get(pages.checkout)
  }

  // The form stays hidden until the seeded cart has been read from storage.
  visit(entries) {
    cy.visitWithCart('/checkout', entries)
    this.root().contains('h1', 'Checkout').should('be.visible')
  }

  field(name) {
    return this.root().find(checkout.field(name))
  }

  // `details` is keyed by the form's input `name` attributes (see fixtures/checkout.json).
  fillForm(details) {
    Object.entries(details).forEach(([name, value]) => {
      this.field(name).clear().type(value)
    })
  }

  placeOrder() {
    this.root().find(checkout.placeOrderButton).click()
  }
}

export default new CheckoutPage()

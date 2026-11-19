import checkoutPage from '../pages/CheckoutPage'
import checkoutDetails from '../fixtures/checkout.json'
import { techShell } from '../fixtures/products.json'
import { cartEntry } from '../support/utils'

describe('Checking out', () => {
  beforeEach(() => {
    checkoutPage.visit([cartEntry(techShell)])
  })

  it('places an order with valid details', () => {
    checkoutPage.fillForm(checkoutDetails)
    checkoutPage.placeOrder()

    cy.location('pathname').should('eq', '/checkout/success')
    checkoutPage.root().contains('h1', 'Thank you').should('be.visible')
  })
})

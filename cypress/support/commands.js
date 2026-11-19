import { app } from './selectors'
import { CART_STORAGE_KEY } from './utils'

// The shop lazy-loads the cart and other shared components after first render.
// Interacting before `loadComplete` flips can cause errors
Cypress.Commands.add('visitShop', (path, options) => {
  cy.visit(path, options)
  cy.get(app).should('have.prop', 'loadComplete', true)
})

// Seeds the cart through localStorage so specs that aren't about adding items
// don't have to click through the UI to get there
Cypress.Commands.add('visitWithCart', (path, entries) => {
  cy.visitShop(path, {
    onBeforeLoad(win) {
      win.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries))
    },
  })
})

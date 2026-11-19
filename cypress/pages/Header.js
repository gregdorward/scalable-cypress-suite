import { header } from '../support/selectors'

class Header {
  cartButton() {
    return cy.get(header.cartButton)
  }

  goHome() {
    cy.get(header.homeLink).click()
  }

  goToCart() {
    this.cartButton().click()
  }

  selectCategory(category) {
    cy.get(header.categoryTab(category)).click()
  }
}

export default new Header()

import { home, pages } from '../support/selectors'

class HomePage {
  root() {
    return cy.get(pages.home)
  }

  visit() {
    cy.visitShop('/')
  }

  shopNow(categoryTitle) {
    this.root().find(home.shopNowLink(categoryTitle)).click()
  }
}

export default new HomePage()

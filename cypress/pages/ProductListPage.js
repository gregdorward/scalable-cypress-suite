import { list, pages } from '../support/selectors'
import { productPath } from '../support/utils'

class ProductListPage {
  root() {
    return cy.get(pages.list)
  }

  visit(category) {
    cy.visitShop(`/list/${category}`)
  }

  heading(text) {
    return this.root().contains(list.heading, text)
  }

  items() {
    return this.root().find(list.item)
  }

  openProduct(product) {
    this.root().find(list.productLink(productPath(product))).click()
  }
}

export default new ProductListPage()

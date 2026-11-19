import header from '../pages/Header'
import homePage from '../pages/HomePage'
import productListPage from '../pages/ProductListPage'
import productDetailPage from '../pages/ProductDetailPage'
import { techShell } from '../fixtures/products.json'

describe('Browsing the shop', () => {
  it('opens a category from the home page', () => {
    homePage.visit()
    homePage.shopNow("Men's Outerwear")

    cy.location('pathname').should('eq', '/list/mens_outerwear')
    productListPage.heading("Men's Outerwear").should('be.visible')
    productListPage.items().should('have.length.greaterThan', 0)
  })

  it('switches category using the header tabs', () => {
    productListPage.visit('mens_outerwear')
    header.selectCategory('ladies_tshirts')

    cy.location('pathname').should('eq', '/list/ladies_tshirts')
    productListPage.heading('Ladies T-Shirts').should('be.visible')
  })

  it('opens a product from its category list', () => {
    productListPage.visit(techShell.category)
    productListPage.openProduct(techShell)

    productDetailPage.heading(techShell.title).should('be.visible')
  })

  it('returns home from the logo', () => {
    productListPage.visit('mens_outerwear')
    header.goHome()

    cy.location('pathname').should('eq', '/')
  })
})

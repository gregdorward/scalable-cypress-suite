import cartPage from '../pages/CartPage'
import { techShell, chromeTee } from '../fixtures/products.json'
import { cartEntry, cartTotal, formatPrice } from '../support/utils'

describe('Managing the cart', () => {
  const entries = [cartEntry(techShell), cartEntry(chromeTee, { quantity: 2 })]
  const [first, second] = entries

  beforeEach(() => {
    cartPage.visit(entries)
  })

  it('lists every item with the combined total', () => {
    cartPage.items().should('have.length', entries.length)
    cartPage.total().should('have.text', formatPrice(cartTotal(entries)))
  })

  it('updates the total when a quantity changes', () => {
    cartPage.setQuantity(0, 3)

    cartPage.total().should('have.text', formatPrice(cartTotal([{ ...first, quantity: 3 }, second])))
  })

  it('removes an item', () => {
    cartPage.removeItem(first.item.title)

    cartPage.items().should('have.length', 1)
    cartPage.total().should('have.text', formatPrice(cartTotal([second])))
  })
})

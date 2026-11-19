# Cypress suite for Polymer Shop

End-to-end tests for the [Polymer Shop demo](https://shop.polymer-project.org/), written with Cypress. It covers browsing categories, viewing a product, adding to the cart, editing the cart and placing an order.

This repo is intended to be a starting point to build on top of. It's primary use is to demonstrate a scalable approach to building out a Cypress suite.

## Requirements

- Node.js 20 or later
- Google Chrome (the npm scripts run the tests in Chrome)

## Getting started

```bash
npm install
npm test
```

`npm test` runs everything headless in Chrome. To open the Cypress app and watch the tests run:

```bash
npm run cy:open
```

## Project layout

```
cypress.config.js     base URL, shadow DOM support and viewport size
cypress/
  e2e/                the specs, one file per user journey
  pages/              page objects
  support/
    selectors.js      all selectors in one place
    utils.js          small helpers with no Cypress calls (prices, paths, cart totals)
    commands.js       custom commands: cy.visitShop and cy.visitWithCart
    e2e.js            loads the custom commands
  fixtures/           product and checkout test data
```

Specs are organised by what the user is doing rather than by page, following the [Cypress best practices guide](https://docs.cypress.io/app/core-concepts/best-practices).

Page objects are kept thin on purpose. They know how to find things and perform actions on a page, but the assertions live in the specs, so you can see what each test is checking without opening another file.

Fixtures are imported straight into the specs, for example:

```js
import { techShell } from '../fixtures/products.json'
```

Every test in a file shares that imported object, so don't modify it inside a test. Copy it with a spread if you need a variation.

## Things to know about this site

The shop is built from Polymer web components, which affects how the tests are written.

- Almost everything sits inside shadow DOM, so `includeShadowDom` is switched on in the config.
- The shop keeps every page in the DOM and hides the ones you aren't on. Each page object has a `root()` method that returns the page's own element, and all its queries start from there. Without it, a query like `h1` would match headings on hidden pages too.
- Parts of the app load after the first render. `cy.visitShop` waits until the app reports it has finished loading before the test carries on. Clicking too early can throw errors or reset the product options.
- The cart is stored in `localStorage`. `cy.visitWithCart` sets it before the page loads, so the cart and checkout tests don't need to add items through the UI first.
- The category tabs collapse into a menu on narrow screens, so the viewport is fixed at 1280 by 800.

There are no `data-cy` attributes to target because this isn't our app. The selectors use `aria-label`, `name` and `href` instead. If you're testing an app you control, add `data-cy` attributes and update `selectors.js`.

## Adding a test

1. Put the selector in `cypress/support/selectors.js`.
2. Add a method to the relevant page object in `cypress/pages/` if it's an action you'll reuse.
3. Write the test in the spec for that journey, or create a new spec in `cypress/e2e/` if it doesn't fit an existing one.

Each test should set up its own state in `beforeEach` and not rely on a previous test having run. Avoid `cy.wait()` with a fixed time; wait on an assertion instead.

## Known issues

These tests run against a public demo site I don't control. If it changes or goes offline, tests will fail for reasons unrelated to the suite. The best practice is to use customer data-cy selectors, which I wasn't able to do here.

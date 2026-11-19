const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://shop.polymer-project.org',
    // The shop is built from Polymer web components, so nearly everything lives in shadow DOM.
    includeShadowDom: true,
    // Below ~768px the category tabs collapse into a drawer.
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})

/* eslint-disable no-unused-vars */
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})

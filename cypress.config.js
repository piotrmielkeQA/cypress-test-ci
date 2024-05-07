const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    env: {
      isMobile: false
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on);
    },
  },
});

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotOnFailure: true,
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    code: false,
    overwrite: false,
    reportFilename: 'Test-Report',
    autoOpen: false,
    charts: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://partapi.qat-kong.aws2.ezshield.ws',
  },
});

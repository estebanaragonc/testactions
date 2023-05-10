const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  env: {
    apiUrl: 'https://jsonplaceholder.typicode.com/',
    mobileViewportWidthBreakpoint: 414,
    coverage: false,
  },
  e2e: {
    specPattern: 'cypress/tests/**/*.test.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // to log messages to the console in runnner.
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // to print table in terminal for accessibility
      on('task', {
        table(message) {
          console.table(message);
          return null;
        },
      });

      // to handle environments based in the ./cypress/config/ folder.
      const TEST_ENV = config.env.TEST_ENV || 'qa';
      const environmentFilename = `./cypress/config/${TEST_ENV}.json`;
      const settings = require(environmentFilename);
      if (settings.baseUrl) {
        config.baseUrl = settings.baseUrl;
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }
      console.log('🚀 loaded settings for environment [%s]', TEST_ENV);
      // IMPORTANT: return the updated config object
      // for Cypress to use it
      return config;
    },
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
  },
});

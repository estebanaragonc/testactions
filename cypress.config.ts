/* eslint-disable */
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
    coverage: false,
  },
  e2e: {
    // to handle junit xml reports, this is required for Xray integration
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/report/results-[hash].xml',
      toConsole: true,
    },
    specPattern: 'cypress/tests/**/*.test.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on: any, config: any) {
      // to handle grep to run specific test cases based in '@' example @smoke, @regression, @mobile
      require('@cypress/grep/src/plugin')(config);

      // to log messages to the console in runnner.
      on('task', {
        log(message: string) {
          console.log(message);
          return null;
        },
      });

      // to print table in terminal for accessibility
      on('task', {
        table(message: string) {
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
    experimentalRunAllSpecs: true, // to enable running all spects from the cypress test runner
    experimentalStudio: true, // to enable the recording of test cases from the cypress test runner
    experimentalWebKitSupport: true, // to enable webkit browser -> browserstack safari
  },
});

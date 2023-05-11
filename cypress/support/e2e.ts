// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// to handle accessibility with cypress
import 'cypress-axe';

// Import commands.js using ES2015 syntax:
import './commands';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      checkPageA11y(path: any): void;
    }
  }
}

/**
 * Command to validate accessibility rules
 */
Cypress.Commands.add('checkPageA11y', (path: any) => {
  cy.visit(path);
  cy.injectAxe();
  cy.checkA11y(null, null, callback);
});

/**
 * *****************************************************************
 * To handle accessibility integration
 */
const severityIndicators = {
  minor: '⚪',
  moderate: '🟡',
  serious: '🟠',
  critical: '🔴',
};
function callback(violations: any) {
  violations.forEach((violation) => {
    const nodes = Cypress.$(
      violation.nodes.map((node) => node.target).join(',')
    );

    Cypress.log({
      name: `${severityIndicators[violation.impact]}`,
      consoleProps: () => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`,
    });

    violation.nodes.forEach(({ target }) => {
      Cypress.log({
        name: '🔧 ',
        consoleProps: () => violation,
        $el: Cypress.$(target.join(',')),
        message: target,
      });
    });
  });

  // to print accessibility violations in console
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }) => ({
      impact,
      description: `${description} (${id})`,
      nodes: nodes.length,
    }))
  );
}
/**
 * *****************************************************************
 */

/**
 * To use grep and run only specific test marked with @ in their names.
 * Example: @regression, @smoke, @ui, @mobile or @accessibility.
 */
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

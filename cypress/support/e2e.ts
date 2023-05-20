/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

// globan declare to chain cypress methods.
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      checkPageA11y(path: any): void;
    }
  }
}

/**
 * Command to validate accessibility rules.
 */
Cypress.Commands.add('checkPageA11y', (path: any) => {
  cy.visit(path);
  cy.injectAxe();
  cy.checkA11y(undefined, undefined, callback);
});

/**
 * *****************************************************************
 * To handle accessibility integration.
 */
const severityIndicators: any = {
  minor: '⚪',
  moderate: '🟡',
  serious: '🟠',
  critical: '🔴',
};
function callback(violations: any) {
  violations.forEach((violation: any) => {
    const nodes = Cypress.$(
      violation.nodes.map((node: any) => node.target).join(',')
    );

    Cypress.log({
      name: `${severityIndicators[violation.impact]}`,
      consoleProps: (): any => violation,
      $el: nodes,
      message: `[${violation.help}](${violation.helpUrl})`,
    });

    violation.nodes.forEach(({ target }: any) => {
      Cypress.log({
        name: '🔧 ',
        consoleProps: () => violation,
        $el: Cypress.$(target.join(',')),
        message: target,
      });
    });
  });

  // to print accessibility violations in console.
  cy.task(
    'table',
    violations.map(({ id, impact, description, nodes }: any) => ({
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



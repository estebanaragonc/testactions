import { ExamplePage } from '../../pages/ExamplePage';

describe('@XYZ-123 - Example test', () => {
  beforeEach(() => {
    const examplePage = new ExamplePage();
    examplePage.visit();
  });

  it('@smoke - running smoke example', () => {
    cy.url().should('include', 'google');
  });

  it('@regression - running regression example', () => {
    cy.url().should('include', 'google');
  });

  it('@mobile - running mobile example', () => {
    cy.url().should('include', 'google');
  });

  it('@accessibility - running accessibility', () => {
    cy.url().should('include', 'google');
  });
});

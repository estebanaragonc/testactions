import { ExamplePage } from '../../pages/ExamplePage';

describe('@XYZ-123 - Example test', () => {
  beforeEach(() => {
    const examplePage = new ExamplePage();
    examplePage.visit();
  });

  it('(@ABC-123) @elvis - running elvis 1', () => {
    cy.url().should('include', 'google');
  });

  it('(@ABC-123) @elvis - running elvis 2', () => {
    cy.url().should('include', 'google');
  });
  
  it('(@ABC-123) @aragon - running aragon', () => {
    cy.url().should('include', 'google');
  });

  it('(@ABC-123) @regression - running regression example', () => {
    cy.url().should('include', 'google');
  });

  it('(@ABC-123) @mobile - running mobile example', () => {
    cy.url().should('include', 'google');
  });

  it('(@ABC-123) @accessibility - running accessibility example', () => {
    cy.url().should('include', 'google');
  });
});

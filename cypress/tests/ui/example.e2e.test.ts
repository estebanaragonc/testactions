import { ExamplePage } from '../../pages/ExamplePage';

describe('Example test', () => {
  beforeEach(() => {
    const examplePage = new ExamplePage();
    examplePage.visit();
  });

  it('check url', () => {
    cy.url().should('include', 'google');
  });

  it('Closing directly', function () {
    cy.get('#hplogo').click();
  });
});

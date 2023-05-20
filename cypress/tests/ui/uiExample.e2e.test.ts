import { mobileViewports } from '../../utils/mobileViewPorts';
//  import { ExamplePage } from '../../pages/ExamplePage';

describe('@VEC-11 -  Check Banner Homepage', () => {
  const viewports = [
    {
      preset: 'default',
      description: 'Default',
      width: 1920,
      height: 1080,
    },
    ...mobileViewports,
  ];

  beforeEach(() => {
    // const examplePage = new ExamplePage();
    // examplePage.visit();
    cy.visit('https://www.walmart.com/');
  });

  viewports.forEach((viewport) => {
    describe(`[${viewport.description}]`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
      });

      it('@VEC-107 - @smoke - [Homepage - UI - Verify if there is a promo banner at the top of the page layout]', () => {
        // cy.url().should('include', 'google');
      });

      it('@regression - should have another validation', () => {
        // cy.url().should('include', 'google');
      });

      it('should have a final validation', () => {
        // cy.url().should('include', 'google');
      });
    });
  });
});

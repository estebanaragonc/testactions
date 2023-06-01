import { mobileViewports } from '../../utils/mobileViewPorts';
import { ExamplePage } from '../../pages/ExamplePage';

describe('@XYZ-123 @smoke - [Check Banner Homepage]', () => {
  const viewports = [
    {
      preset: 'default',
      description: 'Default',
      width: 1366,
      height: 768,
    },
    ...mobileViewports,
  ];

  beforeEach(() => {
    const examplePage = new ExamplePage();
    examplePage.visit();
  });

  viewports.forEach((viewport) => {
    describe(`[${viewport.description}]`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
      });

      it('should have login issue', () => {
        cy.url().should('include', 'google');
      });

      it('should have another validation', () => {
        cy.url().should('include', 'google');
      });

      it('should have a final validation', () => {
        cy.url().should('include', 'google');
      });
    });
  });
});

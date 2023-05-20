describe('@XYZ-123 -Transactions API', () => {
  it('@api - @result This is my first api B', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('@api - @result This is my second api B', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}`).then((response) => {
      expect(response.status).to.eq(220);
    });
  });
});

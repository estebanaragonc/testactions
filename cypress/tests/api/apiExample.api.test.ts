describe('@XYZ-123 -Transactions API', () => {
  it('@api - gets a list of transactions for user (default)', () => {
    cy.request('GET', `${Cypress.env('apiUrl')}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

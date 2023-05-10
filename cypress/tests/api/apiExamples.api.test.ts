describe('Transactions API', function () {
  it('gets a list of transactions for user (default)', function () {
    cy.request('GET', `${Cypress.env('apiUrl')}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

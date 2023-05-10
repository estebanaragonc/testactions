describe('Cypress Studio Demo', function () {
  it('create new transaction', function () {
    // Extend test with Cypress Studio
  });
  it('create new bank account', function () {
    // Extend test with Cypress Studio
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('wikipedia', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('www.wikipedia.com');
    cy.get('#js-link-box-es > strong').click();
    cy.get('#main-cur > :nth-child(2) > :nth-child(1) > a').click();
    cy.get(':nth-child(4) > b > [href="/wiki/Rusia"]').click();
    /* ==== End Cypress Studio ==== */
  });
});

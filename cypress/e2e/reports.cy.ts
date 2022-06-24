describe('Reports', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct heading text', () => {
    cy.contains('h1', 'Reports').should('exist');
    cy.contains('p', 'Easily generate a report of your transactions').should('exist');
  });
});

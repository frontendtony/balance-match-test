describe('App', () => {
  it('starts successfully', () => {
    cy.visit('/');

    cy.contains('p', 'Hello Vite + React!').should('be.visible');
  });
});

describe('Mobile layout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(767, 750);
  });

  it('hides the navigation menu by default', () => {
    cy.get('[data-testid="nav-menu"]').should('not.have.class', 'visible');
    cy.get('[data-testid="nav-menu"]').should('have.css', 'position', 'fixed');
    cy.get('[data-testid="menu-overlay"]').should('not.exist');
  });

  it('opens and closes the navigation menu', () => {
    cy.contains('button', 'show navigation menu').click();
    cy.get('[data-testid="nav-menu"]').should('have.class', 'visible');
    cy.contains('button', 'hide navigation menu').click();
    cy.get('[data-testid="nav-menu"]').should('not.have.class', 'visible');
  });
});

describe('Desktop layout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(768, 750);
  });

  it('shows the navigation menu by default', () => {
    cy.get('[data-testid="nav-menu"]').should('have.css', 'position', 'sticky');
    cy.get('[data-testid="menu-overlay"]').should('not.exist');
  });

  it('does not show the hamburger menu button', () => {
    cy.contains('button', 'show navigation menu').should('not.exist');
  });
});

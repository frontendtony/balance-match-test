describe('Reports', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct heading text', () => {
    cy.contains('h1', 'Reports').should('exist');
    cy.contains('p', 'Easily generate a report of your transactions').should('exist');
  });

  it('should show an empty message if no report has been generated', () => {
    cy.contains('p', 'No reports').should('exist');
  });

  it('should show the form to generate reports', () => {
    cy.get('[data-testid="generate-report-form"]').should('exist');
  });

  it('should show a list of projects to choose from', () => {
    cy.intercept(
      'http://178.63.13.157:8090/mock-api/api/projects',
      JSON.stringify({
        data: [
          { projectId: '83ndhhs', name: 'Project 1' },
          { projectId: 'juue4874', name: 'Project 2' },
        ],
      })
    ).as('getProjects');

    cy.wait('@getProjects');

    cy.contains('button', 'Select project').click();

    cy.contains('li', 'Project 1').should('exist');
    cy.contains('li', 'Project 2').should('exist');
  });

  it('should show a list of gateways to choose from', () => {
    cy.intercept(
      'http://178.63.13.157:8090/mock-api/api/gateways',
      JSON.stringify({
        data: [
          { gatewayId: '83ndhhs', name: 'Gateway 1' },
          { gatewayId: 'juue4874', name: 'Gateway 2' },
        ],
      })
    ).as('getGateways');

    cy.wait('@getGateways');

    cy.contains('button', 'Select gateway').click();

    cy.contains('li', 'Gateway 1').should('exist');
    cy.contains('li', 'Gateway 2').should('exist');
  });
});

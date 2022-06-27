describe('Report page', () => {
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
});

describe('Generate report', () => {
  beforeEach(() => {
    cy.intercept(
      `${Cypress.env('apiBaseUrl')}/projects`,
      JSON.stringify({
        data: [
          { projectId: '83ndhhs', name: 'Project 1' },
          { projectId: 'juue4874', name: 'Project 2' },
        ],
      })
    ).as('projects');
    cy.intercept(
      `${Cypress.env('apiBaseUrl')}/gateways`,
      JSON.stringify({
        data: [
          { gatewayId: '83ndhhs', name: 'Gateway 1' },
          { gatewayId: 'juue4874', name: 'Gateway 2' },
        ],
      })
    ).as('gateways');
    cy.intercept(
      {
        url: `${Cypress.env('apiBaseUrl')}/report`,
        method: 'POST',
      },
      {
        statusCode: 200,
        body: JSON.stringify({
          data: [],
        }),
      }
    ).as('generateReport');
    cy.visit('/');
    cy.wait(['@gateways', '@projects']);
  });

  it('should show the form to generate reports', () => {
    cy.get('[data-testid="generate-report-form"]').should('exist');
  });

  it('allows selection of a project', () => {
    cy.contains('button', 'Select project').click();

    cy.contains('li', 'Project 1').click();
    cy.contains('button', 'Project 1');
  });

  it('allow selection of a gateway', () => {
    cy.contains('button', 'Select gateway').click();

    cy.contains('li', 'Gateway 1').click();
    cy.contains('button', 'Gateway 1');
  });

  it('should send an empty payload if nothing is selected', () => {
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@generateReport').then(({ request }) => {
      expect(request.body).to.be.empty;
    });
  });

  it('should send the selected start date', () => {
    cy.get('input[data-testId="startDate"]').type('2021-01-01');
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@generateReport').then(({ request }) => {
      expect(request.body).haveOwnProperty('from', '2021-01-01');
    });
  });

  it('should send the selected end date', () => {
    cy.get('input[data-testId="endDate"]').type('2021-12-31');
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@generateReport').then(({ request }) => {
      expect(request.body).haveOwnProperty('to', '2021-12-31');
    });
  });

  it('should send the selected gateway', () => {
    cy.contains('button', 'Select gateway').click();
    cy.contains('li', 'Gateway 1').click();
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@generateReport').then(({ request }) => {
      expect(request.body).haveOwnProperty('gatewayId', '83ndhhs');
    });
  });

  it('should send the selected project', () => {
    cy.contains('button', 'Select project').click();
    cy.contains('li', 'Project 2').click();
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@generateReport').then(({ request }) => {
      expect(request.body).haveOwnProperty('projectId', 'juue4874');
    });
  });
});

describe('Display report', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show an empty message if no report has been generated', () => {
    cy.contains('p', 'No reports').should('exist');
  });

  it('should show an empty message if no report was returned from the api', () => {
    cy.intercept(
      {
        url: `${Cypress.env('apiBaseUrl')}/report`,
        method: 'POST',
      },
      {
        statusCode: 200,
        body: JSON.stringify({
          data: [],
        }),
      }
    ).as('emptyReportResponse');
    cy.contains('button', /generate report/gi).click();
    cy.wait('@emptyReportResponse');
    cy.contains('p', 'No reports').should('exist');
  });

  it('should display an error if the api returns a status code outside 2xx', () => {
    cy.intercept(
      {
        url: `${Cypress.env('apiBaseUrl')}/report`,
        method: 'POST',
      },
      {
        statusCode: 400,
      }
    ).as('badApiResponse');
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@badApiResponse');
    cy.get('[data-testid="error"]')
      .should('be.visible')
      .should('contain.text', 'Something went wrong');
  });

  it('should display an error if the api returns an error in the body of the response', () => {
    cy.intercept(
      {
        url: `${Cypress.env('apiBaseUrl')}/report`,
        method: 'POST',
      },
      {
        statusCode: 200,
        body: JSON.stringify({
          error: 'some error',
        }),
      }
    ).as('apiErrorResponse');
    cy.contains('button', /Generate report/gi).click();
    cy.wait('@apiErrorResponse');
    cy.get('[data-testid="error"]')
      .should('be.visible')
      .should('contain.text', 'Something went wrong');
  });

  it('should show the report that was returned', () => {
    cy.contains('button', /Generate report/gi).click();

    cy.get('[data-testid="report"]').should('be.visible');
  });

  it('should show a chart when a report of all gateways for a project is generated', () => {
    cy.intercept(`${Cypress.env('apiBaseUrl')}/projects`).as('projects');

    cy.wait('@projects').then(({ response }) => {
      console.log(response.body.data[0]);
      cy.setCookie('selectedProject', JSON.stringify(response.body.data[0]));
    });

    cy.getCookie('selectedProject').then((cookie) => {
      cy.contains('button', 'Select project').click();
      cy.contains('li', JSON.parse(cookie.value).name).click();
      cy.contains('button', /Generate report/gi).click();
      cy.get('[data-testid="chart-wrapper"]').scrollIntoView().should('be.visible');
    });
  });

  it('should show a chart when a report of all projects for a gateway is generated', () => {
    cy.intercept(`${Cypress.env('apiBaseUrl')}/gateways`).as('gateways');

    cy.wait('@gateways').then(({ response }) => {
      cy.setCookie('selectedGateway', JSON.stringify(response.body.data[0]));
    });

    cy.getCookie('selectedGateway').then((cookie) => {
      cy.contains('button', 'Select gateway').click();
      cy.contains('li', JSON.parse(cookie.value).name).click();
      cy.contains('button', /Generate report/gi).click();
      cy.get('[data-testid="chart-wrapper"]').scrollIntoView().should('be.visible');
    });
  });
});

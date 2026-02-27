import { checkWithLogs } from '../support/checkWithLogs';

describe('POC Acessibilidade - Renner - youcom', () => {
  it('Home - não deve ter violações critical/serious', () => {
    cy.visit('/');
    checkWithLogs();
  });

  after(() => {
    cy.task('a11yReport');
  });
});
import { checkWithLogs } from '../support/checkWithLogs';

describe('POC Acessibilidade - Renner - youcom', () => {
  it('Home - não deve ter violações critical/serious', () => {
    cy.visit('/');
    checkWithLogs();
  });

  it('Busca - não deve ter violações critical/serious', () => {
    cy.visit('/');
    
    const produto = 'calça jeans';
    cy.buscaProduto(produto);    
    
    checkWithLogs();
  });

  after(() => {
    cy.task('a11yReport');
  });
});
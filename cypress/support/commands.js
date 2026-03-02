Cypress.Commands.add('buscaProduto', (produto) => {
    cy.get('button[aria-label="botão no header para abrir o menu de pesquisa"]')
        .should('be.visible')
        .click();

    cy.get('input[placeholder="pesquisar"]')
        .should('be.visible')
        .type(produto);

    cy.contains('a', produto)
        .should('be.visible')
        .click();
});
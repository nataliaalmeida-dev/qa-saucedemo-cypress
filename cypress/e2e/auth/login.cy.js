describe('Autenticação e Listagem de Produtos (RF-01, RF-02, RF-03)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('RF-01 e RF-03: Deve autenticar usuário com credenciais válidas e exibir a listagem de produtos', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Validação do redirecionamento e título da página (RF-01)
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('be.visible').and('have.text', 'Products');

    // Validação da apresentação do catálogo de produtos (RF-03)
    cy.get('[data-test="inventory-list"]').should('be.visible');
    cy.get('[data-test="inventory-item"]').should('have.length.greaterThan', 0);
  });

  it('RF-02: Deve exibir mensagem de erro ao tentar autenticar com credenciais inválidas', () => {
    cy.get('[data-test="username"]').type('usuario_invalido');
    cy.get('[data-test="password"]').type('senha_errada');
    cy.get('[data-test="login-button"]').click();

    // Validação do comportamento de erro e permanência na tela de login
    cy.url().should('not.include', '/inventory.html');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');
  });
});

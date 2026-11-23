describe('Gerenciamento do Carrinho de Compras (RF-04, RF-05, RF-06)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('RF-04 e RF-06: Deve adicionar produto ao carrinho, atualizar contador e manter consistência dos dados', () => {
    const produtoNome = 'Sauce Labs Backpack';
    const produtoPreco = '$29.99';

    // Adiciona o produto ao carrinho
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Valida atualização do botão e do contador do carrinho (RF-04)
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible').and('have.text', 'Remove');
    cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1');

    // Acessa o carrinho e valida consistência das informações (RF-06)
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should('have.text', produtoNome);
    cy.get('[data-test="inventory-item-price"]').should('have.text', produtoPreco);
    cy.get('[data-test="item-quantity"]').should('have.text', '1');
  });

  it('RF-05: Deve remover produto do carrinho e atualizar o estado da interface', () => {
    // Pré-condição: adicionar um item
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    // Acessa o carrinho e remove o item
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // Valida que o item foi removido e o contador desapareceu
    cy.get('[data-test="inventory-item"]').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });
});

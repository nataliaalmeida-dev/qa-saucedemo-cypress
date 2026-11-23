describe('Jornada E2E Completa de Compra (RF-01 a RF-08)', () => {
  it('Deve realizar o fluxo completo: Login -> Catálogo -> Carrinho -> Checkout -> Confirmação', () => {
    const produtoEsperado = 'Sauce Labs Onesie';
    const precoEsperado = '$7.99';

    // 1. Autenticação (RF-01)
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // 2. Listagem de produtos (RF-03)
    cy.url().should('include', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');

    // 3. Seleção de produto (RF-04)
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');

    // 4. Carrinho e consistência (RF-06)
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('[data-test="inventory-item-name"]').should('have.text', produtoEsperado);
    cy.get('[data-test="inventory-item-price"]').should('have.text', precoEsperado);

    // 5. Checkout - Preenchimento de dados (RF-07)
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');

    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').type('54750-000');
    cy.get('[data-test="continue"]').click();

    // Validação do resumo do pedido (Overview)
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('[data-test="inventory-item-name"]').should('have.text', produtoEsperado);
    cy.get('[data-test="subtotal-label"]').should('contain.text', precoEsperado);

    // 6. Finalização e Confirmação da compra (RF-08)
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('[data-test="complete-header"]')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    cy.get('[data-test="complete-text"]')
      .should('be.visible')
      .and('contain.text', 'Your order has been dispatched');
  });
});

# Automação de Testes UI e E2E — SauceDemo

Suíte inicial de testes automatizados desenvolvida com **Cypress** para mitigar riscos de regressão nos fluxos críticos da aplicação [SauceDemo](https://www.saucedemo.com/).

## Estrutura do Projeto

- `cypress/e2e/auth/login.cy.js`: Testes de autenticação e catálogo (RF-01, RF-02, RF-03)
- `cypress/e2e/cart/carrinho.cy.js`: Testes de inclusão, remoção e consistência no carrinho (RF-04, RF-05, RF-06)
- `cypress/e2e/checkout/compra_e2e.cy.js`: Jornada E2E completa de compra (RF-01 a RF-08)
- `cypress/screenshots/`: Evidências capturadas durante a execução
- `cypress/videos/`: Gravações completas das execuções em modo headless

## Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm**

## Instalação

Acesse a pasta do projeto pelo terminal e instale as dependências:

```bash
npm install
```

## Execução dos Testes

### Modo Headless (Terminal — sem intervenção manual)
```bash
npm run cy:run
```

### Modo Interativo (Interface Gráfica)
```bash
npm run cy:open
```

## Cobertura dos Requisitos Funcionais

| Código | Descrição | Arquivo de Teste |
| :--- | :--- | :--- |
| **RF-01** | Autenticação com credenciais válidas | `auth/login.cy.js` e `checkout/compra_e2e.cy.js` |
| **RF-02** | Comportamento diante de credenciais inválidas | `auth/login.cy.js` |
| **RF-03** | Apresentação da listagem de produtos pós-login | `auth/login.cy.js` e `checkout/compra_e2e.cy.js` |
| **RF-04** | Inclusão de produto no carrinho e atualização do contador | `cart/carrinho.cy.js` e `checkout/compra_e2e.cy.js` |
| **RF-05** | Remoção de produto do carrinho | `cart/carrinho.cy.js` |
| **RF-06** | Consistência das informações do produto no carrinho | `cart/carrinho.cy.js` e `checkout/compra_e2e.cy.js` |
| **RF-07** | Preenchimento dos dados obrigatórios no checkout | `checkout/compra_e2e.cy.js` |
| **RF-08** | Conclusão da compra e exibição da confirmação | `checkout/compra_e2e.cy.js` |

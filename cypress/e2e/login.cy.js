describe('Busca e Favoritar - Kasa Live', () => {

  it('Deve realizar busca e favoritar um time após login', () => {

    // ===== LOGIN =====
    cy.visit('https://www.kasa.live/')
    cy.get('[data-cy="btn-trigger-profile"]').click()
    cy.get('[data-cy="login-email"]', { timeout: 10000 })
      .should('be.visible')
      .type('testeQA12@gmail.com')
    cy.get('[data-cy="login-password"]')
      .should('be.visible')
      .type('123456')
    cy.get('[data-cy="login-submit"]').click()
    cy.url().should('not.include', 'login')

    // ===== FILTROS =====
    cy.intercept('GET', '**/championship/**').as('getChampionship')
    cy.get('#filter-championship')
      .should('be.visible')
      .click()
    cy.wait('@getChampionship')
    cy.contains('Brasileirão Série A')
      .should('be.visible')
      .click()
    cy.get('#filter-championship')
      .should('have.value', 'Brasileiro Serie A')

    cy.intercept('GET', '**/channel/**').as('getChannels')
    cy.get('#filter-streaming')
      .should('be.visible')
      .click()
    cy.wait('@getChannels')
    cy.get('#filter-streaming')
      .type('amazon')
    cy.contains('Amazon Prime Video').click({ force: true })
    cy.get('#filter-streaming', { timeout: 10000 })
      .should('have.value', 'Amazon Prime Video')

    // ===== FAVORITAR TIMES =====

    
// ===============================
// FAVORITOS DINÂMICO ATUALIZADO
// ===============================

cy.visit('https://www.kasa.live/favoritos')

// Editar
  cy.get('[data-cy="btn-edit-teams"]')
    .should('be.visible')
    .click()

  // Botão "+"
  cy.get('[data-cy="btn-favorite-team"]')
    .should('be.visible')
    .click()

  // Clica em um botão Add disponível
  cy.contains('button', /^Add$/)
    .should('exist')
    .first()
    .click({ force: true })

  // 🔥 Intercepta ANTES de concluir
  cy.intercept('POST', '**/team-favorite/bulk-set/**')
    .as('postFavorite')

  // Concluir
  cy.get('[data-cy="btn-submit-teams"]')
    .should('be.visible')
    .click()

  // Aguarda POST real
  cy.wait('@postFavorite')
    .its('response.statusCode')
    .should('eq', 204)

})

})






  



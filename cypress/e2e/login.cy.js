describe('Busca - Kasa Live', () => {

  it('Deve realizar busca após login', () => {

    cy.visit('https://www.kasa.live/')

    // ===== LOGIN =====
    cy.get('[data-cy="btn-trigger-profile"]').click()

    cy.get('[data-cy="login-email"]', { timeout: 10000 })
      .should('be.visible')
      .type('testeQA12@gmail.com')

    cy.get('[data-cy="login-password"]')
      .should('be.visible')
      .type('123456')

    cy.get('[data-cy="login-submit"]').click()

    // Garante que terminou login antes de continuar
    cy.url().should('not.include', 'login')

    // ===== FILTROS =====

    // -------- CAMPEONATO --------
    // -------- CAMPEONATO --------

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



    // -------- STREAMING --------
    // -------- STREAMING --------

// intercepta API de canais
cy.intercept('GET', '**/channel/**').as('getChannels')

// abre dropdown
cy.get('#filter-streaming')
  .should('be.visible')
  .click()

// espera lista carregar
cy.wait('@getChannels')

// digita amazon
cy.get('#filter-streaming')
  .type('amazon')

// clica na opção pelo texto
cy.contains('Amazon Prime Video')
  .click({ force: true })

// valida que preencheu
// espera a navegação terminar
cy.url().should('include', 'channel_name=Amazon+Prime+Video')

// agora pega o input já renderizado novamente
cy.get('#filter-streaming', { timeout: 10000 })
  .should('have.value', 'Amazon Prime Video')


  })

})

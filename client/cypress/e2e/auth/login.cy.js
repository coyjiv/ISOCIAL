describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('https://isocial.site/login')
    cy.get('input[name="email"]').type(Cypress.env('testUser'))
    cy.get('input[name="password"]').type(Cypress.env('testUserPassword'))
    cy.get('form').submit()
    cy.url().should('equals', 'https://isocial.site/')
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('userId')).to.not.be.null
      expect(localStorage.getItem('access')).to.not.be.null
      expect(localStorage.getItem('refresh')).to.not.be.null
    })
  })
  it('successfully logs out', () => {
    cy.visit('https://isocial.site/login')
    cy.get('input[name="email"]').type(Cypress.env('testUser'))
    cy.get('input[name="password"]').type(Cypress.env('testUserPassword'))
    cy.get('form').submit()
    cy.url().should('equals', 'https://isocial.site/')
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('userId')).to.not.be.null
      expect(localStorage.getItem('access')).to.not.be.null
      expect(localStorage.getItem('refresh')).to.not.be.null
    })
    cy.get('.css-1iwtrha').click()
    cy.contains('Logout').click()
    cy.url().should('equals', 'https://isocial.site/login')
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('userId')).to.be.null
      expect(localStorage.getItem('access')).to.be.null
      expect(localStorage.getItem('refresh')).to.be.null
    })
  })
})

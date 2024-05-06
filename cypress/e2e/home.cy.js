/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
    })

    it('display at least one user', () => {
        cy.get('ul li').should('have.length.at.least', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.get('h2').should('have.text', 'Login')
        cy.url().should('contain', '/login')
    })

    it('should open add more user page', () => {
        cy.get('#addmore').click()
        cy.get('h2').should('have.text', 'Register')
        cy.url().should('contain', 'add-user')
    })

})

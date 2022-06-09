/// <reference types="cypress" />
describe('login page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8081')
    })
  
    it('should successfully login', () => {
        cy.get('[name=username]').type('admin')
        cy.get('[name=password]').type('admin')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', 'Slawomir')
    })
  
  })
  
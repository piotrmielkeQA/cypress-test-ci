/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
        // 1. Request http na logowanie
        cy.request({
            method: 'POST',
            url: 'http://localhost:4001/users/signin',
            body: {
                username: 'admin',
                password: 'admin',
            },
        }).then((resp) => {
            // 2a. ustawiamy odpowiedź w localStorage
            localStorage.setItem('user', JSON.stringify(resp.body))
            // 2b. ustawiamy token z odpowiedzi w ciastku token
            cy.setCookie('token', resp.body.token)
        })
        cy.visit('http://localhost:8081')
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

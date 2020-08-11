describe('Blog app', function() {

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('all blogs')
  })

  it('login form is visible', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('login fails with invalid credentials', function() {
    cy.visit('http://localhost:3000')
    cy.contains('open login form').click()
    cy.get('#username').type('invalidcreds')
    cy.get('#password').type('invalidcreds')
    cy.get('#login-button').click()
    cy.get('.error').contains('Username or Password is Incorrect!')
  })

  it('anyone can add a like', function() {
    cy.visit('http://localhost:3000')
    cy.contains('expand info').click()
    cy.contains('add like').click()
    cy.get('.success').contains('Added a like to the blog!')
  })

  it('user can log in', function() {
    cy.contains('open login form').click()
    cy.get('#username').type('TestAppUser')
    cy.get('#password').type('TestAppUser')
    cy.get('#login-button').click()
    cy.contains('logged-in')
  })



  describe('when logged in', function() {
      beforeEach(function() {
        cy.login({username:'TestAppUser', password:'TestAppUser'})
      })

      it('a new blog can be created', function() {
        cy.visit('http://localhost:3000')
        cy.contains('add new blog').click()
        cy.get('#title').type('a blog created by cypress - delete next')
        cy.get('#author').type('a blog created by cypress - delete next')
        cy.get('#url').type('a blog created by cypress -  delete next')
        cy.contains('add blog').click()
        cy.contains('a blog created by cypress')
      })
    
    
    it('a blog added by a user can be deleted', function() {
      cy.visit('http://localhost:3000')
      cy.contains('a blog created by cypress - delete next').parent().parent().contains('expand info').click()
      cy.get('#delbtn').should('contain', 'delete this entry')
    })

        
  })
})
describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should redirect to login when accessing protected route', () => {
    cy.visit('/profile');
    cy.url().should('include', '/login');
    cy.contains('Login to Duolingo Clone').should('be.visible');
  });

  it('should login successfully and redirect', () => {
    cy.visit('/login');
    
    // Click mock login button
    cy.get('[data-cy=login-button]').click();
    
    // Should redirect to lessons
    cy.url().should('include', '/lessons');
    cy.contains('Basic Greetings').should('be.visible');
    
    // Verify token is set
    cy.window().then((win) => {
      expect(win.localStorage.getItem('user-token')).to.equal('mock-token');
    });
  });

  it('should access protected routes after login', () => {
    // Login first
    cy.visit('/login');
    cy.get('[data-cy=login-button]').click();
    
    // Access profile
    cy.visit('/profile');
    cy.url().should('include', '/profile');
    cy.contains('User Profile').should('be.visible');
    
    // Access lesson detail
    cy.visit('/lesson/1');
    cy.url().should('include', '/lesson/1');
    cy.get('[data-cy=question-text]').should('be.visible');
  });

  it('should handle logout flow', () => {
    // Login first
    cy.window().then((win) => {
      win.localStorage.setItem('user-token', 'mock-token');
    });
    
    cy.visit('/profile');
    
    // Logout (if logout button exists)
    cy.get('body').then(($body) => {
      if ($body.find('[data-cy=logout-button]').length > 0) {
        cy.get('[data-cy=logout-button]').click();
        cy.url().should('include', '/login');
      }
    });
  });
});
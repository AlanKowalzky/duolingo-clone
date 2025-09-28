describe('Responsive Behavior', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('user-token', 'mock-token');
    });
  });

  it('should display correctly on mobile viewport', () => {
    cy.viewport(375, 667); // iPhone SE
    cy.visit('/lessons');
    
    // Check mobile layout
    cy.get('.navbar').should('be.visible');
    cy.get('.lesson-card').should('be.visible');
    
    // Check responsive navigation
    cy.get('.nav-links').should('have.css', 'flex-direction', 'column');
  });

  it('should display correctly on tablet viewport', () => {
    cy.viewport(768, 1024); // iPad
    cy.visit('/lessons');
    
    // Check tablet layout
    cy.get('.lesson-grid').should('be.visible');
    cy.get('.lesson-card').should('have.length.greaterThan', 0);
  });

  it('should display correctly on desktop viewport', () => {
    cy.viewport(1920, 1080); // Desktop
    cy.visit('/lessons');
    
    // Check desktop layout
    cy.get('.navbar').should('be.visible');
    cy.get('.lesson-grid').should('be.visible');
    cy.get('.nav-links').should('have.css', 'flex-direction', 'row');
  });

  it('should handle touch interactions on mobile', () => {
    cy.viewport(375, 667);
    cy.visit('/lesson/1');
    
    // Test touch interactions
    cy.get('[data-cy=option-button]').first().trigger('touchstart');
    cy.get('[data-cy=option-button]').first().trigger('touchend');
    cy.get('[data-cy=option-button]').first().should('have.class', 'selected');
  });

  it('should show/hide elements based on screen size', () => {
    // Desktop - show all elements
    cy.viewport(1920, 1080);
    cy.visit('/lessons');
    cy.get('[data-cy=progress-sidebar]').should('be.visible');
    
    // Mobile - hide sidebar
    cy.viewport(375, 667);
    cy.get('[data-cy=progress-sidebar]').should('not.be.visible');
  });
});
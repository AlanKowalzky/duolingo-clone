describe('Lesson Complete Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    // Mock login
    cy.window().then((win) => {
      win.localStorage.setItem('user-token', 'mock-token');
    });
  });

  it('should complete a full lesson flow', () => {
    // Navigate to lessons
    cy.visit('/lessons');
    cy.contains('Basic Greetings').should('be.visible');
    
    // Start lesson
    cy.contains('Start').first().click();
    cy.url().should('include', '/lesson/');
    
    // Answer first question
    cy.get('[data-cy=question-text]').should('be.visible');
    cy.get('[data-cy=option-button]').first().click();
    cy.get('[data-cy=check-answer]').click();
    
    // Verify feedback
    cy.get('[data-cy=feedback]').should('be.visible');
    cy.get('[data-cy=continue-button]').click();
    
    // Complete lesson
    cy.get('[data-cy=lesson-complete]').should('be.visible');
    cy.contains('Lesson Complete!').should('be.visible');
  });

  it('should track progress correctly', () => {
    cy.visit('/lessons');
    
    // Check initial progress
    cy.get('[data-cy=progress-stats]').should('contain', 'Completed: 0');
    
    // Complete lesson (simplified)
    cy.visit('/lesson/1');
    cy.get('[data-cy=option-button]').first().click();
    cy.get('[data-cy=check-answer]').click();
    cy.get('[data-cy=continue-button]').click();
    
    // Verify progress updated
    cy.visit('/lessons');
    cy.get('[data-cy=progress-stats]').should('contain', 'Completed: 1');
  });

  it('should handle incorrect answers', () => {
    cy.visit('/lesson/1');
    
    // Select wrong answer
    cy.get('[data-cy=option-button]').last().click();
    cy.get('[data-cy=check-answer]').click();
    
    // Verify error feedback
    cy.get('[data-cy=feedback]').should('contain', 'Incorrect');
    cy.get('[data-cy=try-again]').should('be.visible');
  });
});
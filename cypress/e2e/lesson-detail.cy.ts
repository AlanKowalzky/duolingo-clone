describe('Lesson Detail Flow', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.setItem('user-token', 'mock-token');
    });
    cy.visit('/lesson/1');
  });

  it('should display lesson content', () => {
    cy.contains('Basic Greetings');
    cy.contains('How do you say');
    cy.get('.option-btn').should('have.length.at.least', 2);
    cy.get('.check-btn').should('be.visible');
  });

  it('should show progress bar', () => {
    cy.get('.progress-bar').should('be.visible');
    cy.get('.progress-fill').should('be.visible');
    cy.contains('1 / 2'); // Question counter
  });

  it('should show hearts and timer', () => {
    cy.get('.hearts-display').should('be.visible');
    cy.get('.timer-display').should('be.visible');
    cy.get('.audio-btn').should('be.visible');
  });

  it('should allow answering questions', () => {
    cy.get('.option-btn').first().click();
    cy.get('.option-btn.selected').should('exist');
    cy.get('.check-btn').should('not.be.disabled');
    cy.get('.check-btn').click();
  });

  it('should complete lesson flow', () => {
    // Answer first question
    cy.get('.option-btn').first().click();
    cy.get('.check-btn').click();
    
    // Wait for next question or completion
    cy.wait(2000);
    
    // If there's another question, answer it
    cy.get('body').then(($body) => {
      if ($body.find('.option-btn').length > 0) {
        cy.get('.option-btn').first().click();
        cy.get('.check-btn').click();
        cy.wait(2000);
      }
    });
  });
});
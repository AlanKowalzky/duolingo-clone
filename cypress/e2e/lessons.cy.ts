describe('Lessons Flow', () => {
  beforeEach(() => {
    // Mock login
    cy.window().then((win) => {
      win.localStorage.setItem('user-token', 'mock-token');
    });
    cy.visit('/lessons');
  });

  it('should display lessons list', () => {
    cy.contains('Your Lessons');
    cy.contains('Basic Greetings');
    cy.contains('Numbers 1-10');
  });

  it('should show progress stats', () => {
    cy.contains('Completed:');
    cy.contains('Total XP:');
    cy.contains('Streak:');
  });

  it('should allow starting first lesson', () => {
    cy.contains('Basic Greetings').parent().within(() => {
      cy.contains('Start').click();
    });
    cy.url().should('include', '/lesson/1');
  });

  it('should show locked lesson as disabled', () => {
    cy.contains('Numbers 1-10').parent().within(() => {
      cy.contains('Locked').should('be.visible');
    });
  });
});
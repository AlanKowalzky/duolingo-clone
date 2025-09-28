// Custom Cypress commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      completeLesson(lessonId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('[data-cy=email]').type('test@example.com');
  cy.get('[data-cy=password]').type('password123');
  cy.get('[data-cy=login-btn]').click();
  cy.url().should('include', '/lessons');
});

Cypress.Commands.add('completeLesson', (lessonId: string) => {
  cy.visit(`/lesson/${lessonId}`);
  cy.get('[data-cy=option-btn]').first().click();
  cy.get('[data-cy=check-btn]').click();
  cy.get('[data-cy=next-btn]').click();
});
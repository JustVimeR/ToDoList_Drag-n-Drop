describe('Todo List Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('adds a new todo item', () => {
    cy.get('input').type('New Todo');
    cy.get('button').contains('Додати').click();
    cy.get('.todo-container').should('contain', 'New Todo');
  });

  it('removes a todo item', () => {
    cy.get('input').type('New Todo');
    cy.get('button').contains('Додати').click();
    cy.contains('button', 'Видалити').first().click();
    cy.get('.todo-container').should('not.contain', 'Todo to Remove');
  });

  it('reorders a todo item', () => {
    
    cy.get('input').type('Todo 1');
    cy.get('button').contains('Додати').click();
    cy.get('input').type('Todo 2');
    cy.get('button').contains('Додати').click();

    cy.get('.todo-container div').eq(1).as('itemToDrag');
    cy.get('.todo-container div').eq(0).as('dropTarget');

    cy.get('.todo-container div').first().should('contain', 'Todo 2');
  });
});

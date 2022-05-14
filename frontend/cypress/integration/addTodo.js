describe('adding a new to-do item', () => {
  it('correctly allows user to login & add a new to-do item', () => {
    cy.visit('/');
    cy.findByLabelText('email').clear().type('x@x.x');
    cy.findByLabelText('password').clear().type('x');

    cy.intercept('GET', '/api/todos').as('fetchTodos');
    cy.get('.confirm').click();
    cy.wait('@fetchTodos');

    cy.findByLabelText('title').type('test to-do');
    cy.findByLabelText('notes').type('notes');
    cy.findByLabelText('due date').type('2022-06-30');
    cy.findByLabelText('list').select('list1');
    cy.get('.confirmNewTodo').click();

    cy.get('div').contains('test to-do');
    cy.get('.delete').last().click();
  });
});

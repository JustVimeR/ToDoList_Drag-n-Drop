declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to simulate dragging an element to another element.
       * @example cy.get('.draggable').dragAndDrop('.droppable')
       */
      dragAndDrop(target: string): Chainable<any>;
    }
  }
  
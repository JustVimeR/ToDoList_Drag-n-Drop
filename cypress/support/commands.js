Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
      name: 'dragAndDrop',
      message: `Drag element: ${subject} to ${target}`,
      consoleProps: () => {
        return {
          subject: subject,
          target: target
        };
      },
    });
  
    const dataTransfer = new DataTransfer();
  
    cy.get(subject).trigger('mousedown', {
      which: 1,
      dataTransfer
    });
    
    cy.get(target).trigger('mousemove', {
      which: 1,
      dataTransfer
    }).trigger('mouseup', { dataTransfer });
  });
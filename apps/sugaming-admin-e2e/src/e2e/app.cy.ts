import { getGreeting } from '../support/app.po';

describe('sugaming-admin', () => {
  beforeEach(() => cy.visit('/en'));

  it('should display a heading', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Test title');
  });
});

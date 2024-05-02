describe("template spec", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Check if logo is present", () => {
		cy.get("[data-cy=app-logo]").should("exist");
	});

	it("Check if get started button is present", () => {
		cy.get("[data-cy=get-started-button]").should("exist");
	});

	// check if the button is clickable
	it("Check if get started button is clickable", () => {
		cy.get("[data-cy=get-started-button]").click({ multiple: true, force: true });
	});

	// check if the dropdown is visible
	it("Check if get started dropdown is visible after click", () => {
		cy.get("[data-cy=get-started-button]").click({ multiple: true, force: true });
		cy.get("[data-cy=get-started-dropdown]").should("exist");
	});

  // check if the dropdown has the correct text
  it("Check if get started dropdown has correct text", () => {
    cy.get("[data-cy=get-started-button]").click({ multiple: true, force: true });
    cy.get("[data-cy=get-started-dropdown]").should("exist");
    cy.get("[data-cy=get-started-dropdown]").contains("Get Started");
  });

  // check if the dropdown has the correct number of items
  it("Check if get started dropdown has correct number of items", () => {
    cy.get("[data-cy=get-started-button]").click({ multiple: true, force: true });
    cy.get("[data-cy=get-started-dropdown]").should("exist");
    cy.get("[data-cy=get-started-dropdown]").find("[data-cy=get-started-dropdown-sign-in-with-google]").should("exist");
    cy.get("[data-cy=get-started-dropdown]").find("[data-cy=get-started-dropdown-sign-in-with-github]").should("exist");
  });
});

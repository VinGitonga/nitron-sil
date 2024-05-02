describe("template spec", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Check if access homepage dashboard works", () => {
		cy.loginByTestingEmail();
		// check for a button with Go to App
		cy.get("button").contains("Go to App").click({ multiple: true, force: true });
	});

	it("Check if logout works", () => {
		cy.loginByTestingEmail();
		// check for a button with Go to App
		cy.get("button").contains("Go to App").click({ multiple: true, force: true });
		// check for a button with logout
		cy.get("[data-cy=logout]").click({ multiple: true, force: true });
	});

  it("Check if its listing users", () => {
    cy.loginByTestingEmail()

		cy.get("button").contains("Go to App").click({ multiple: true, force: true });

    cy.get("[data-cy=homepage-user-items]").children().should("have.length.at.least", 1)
  })
});

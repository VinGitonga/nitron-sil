describe("template spec", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Check if login by testing email works", () => {
		cy.loginByTestingEmail();
	});
});

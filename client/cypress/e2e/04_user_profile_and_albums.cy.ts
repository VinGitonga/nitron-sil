describe("template spec", () => {
	beforeEach(() => {
		cy.visit("/");

		// login
		cy.loginByTestingEmail();

		// navigate to homepage
		cy.get("button").contains("Go to App").click({ multiple: true, force: true });

		// select the first user and navigate to user profile
		cy.get("[data-cy=homepage-user-items]").eq(0).get("[data-cy=homepage-user-item]").get("button").contains("View Profile").click();
	});

	it("Check if we've a text showing user profile", () => {
		cy.get("h3").contains("User Profile");
	});

	it("Check if the inputs have user details", () => {
		cy.get("input[name='name']").should("not.have.value", "");
		cy.get("input[name='username']").should("not.have.value", "");
		cy.get("input[name='email']").should("not.have.value", "");
		cy.get("input[name='createdAt']").should("not.have.value", "");
	});

	it("Check if it shows the Albums and Count", () => {
		cy.get("h3").contains("Albums");
		cy.get("h3")
			.get("span[data-cy='user-profile-album-count']")
			.invoke("text")
			.then((text) => {
				const numberText = text.match(/\((\d+)\)/)[1];
				expect(numberText).to.match(/^\d+$/); // This checks that the text is a number (integer)
			});
	});

  it("Check if albums are listed", () => {
    cy.get("[data-cy=album-card-item]")
  })
});

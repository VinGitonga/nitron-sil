/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare namespace Cypress {
	interface Chainable {
		loginByTestingEmail: () => void;
	}

	interface IApiSuccessResponse<T> {
		status: "success";
		msg: string;
		data?: T;
	}
	interface IApiErrorResponse {
		status: "error" | "failure" | "not-ready";
		msg: string;
	}

	export type IApiResponse<T = any> = IApiSuccessResponse<T> | IApiErrorResponse;

	interface UserDocument {
		_id: string;
		name: string;
		username: string;
		email: string;
		createdAt: string;
		updatedAt: string;
		albumCount?: number;
	}

	interface IUser extends UserDocument {
		photoURL?: string;
	}
}

Cypress.Commands.add("loginByTestingEmail", () => {
	// Since we're using google oauth, we need to get the user by email and we dont need to do this in production
	cy.request<Cypress.IApiSuccessResponse<Cypress.UserDocument> | Cypress.IApiErrorResponse>({
		method: "GET",
		url: `${Cypress.env("apiUrl")}/users/get/by-email`,
		qs: { email: Cypress.env("testingEmail") },
	}).then((response) => {
		const rawResponse = response.body;

		if (rawResponse.status !== "success") {
			throw new Error(rawResponse.msg);
		}

		const user = rawResponse.data;

		const newUser = {
			...user,
			photoURL: `https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`,
		};

		cy.window().its("authStore").invoke("setState", { user: newUser });
		cy.visit("/");
	});
});

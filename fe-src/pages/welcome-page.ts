import state from '../state';

class WelcomePage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		state.subscribe(() => this.render());
	}

	render() {
		const currentState = state.getState() as any;
		const isInterestsForm = currentState.interests;

		this.innerHTML = `
            <div class="welcome__logo-container"></div>
            <div class="welcome__form-container">
                ${
					isInterestsForm
						? '<interests-form></interests-form>'
						: '<welcome-form></welcome-form>'
				}
            </div>
        `;
	}
}

customElements.define('welcome-page', WelcomePage);

class InterestsPage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="interests__title">
				<h2>¿Qué te interesa?</h2>
				<h3>Podés seleccionar varios</h3>
			</div>
			<div class="interests__form-container">
				<interests-form></interests-form>
			</div>
        `;
	}
}

customElements.define('interests-page', InterestsPage);

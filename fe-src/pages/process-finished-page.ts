class ThanksPage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
            TEST
            TEST
            TEST
        `;
	}
}

customElements.define('thanks-page', ThanksPage);

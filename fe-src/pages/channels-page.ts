class ChannelsPage extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
			<div class="channels__title">
				<h2>¿Cómo nos conociste?</h2>
			</div>
			<div class="channels__form-container">
				<channels-form></channels-form>
			</div>
        `;
	}
}

customElements.define('channels-page', ChannelsPage);

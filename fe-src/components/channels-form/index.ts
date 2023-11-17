import state from '../../state';
import { sendDataToDatabase } from '../../utils';
import { Channels } from '../../state';
import { Router } from '@vaadin/router';

class ChannelsForm extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.addStyles();
		this.sendForm();

		state.subscribe(() => this.render());
		state.subscribe(() => this.addStyles());
		state.subscribe(() => this.sendForm());
	}

	addStyles() {
		const style = document.createElement('style');

		style.innerHTML = `
			@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;900&display=swap');
			@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');

			* {
				box-sizing: border-box;
				font-family: 'Poppins', sans-serif;
				border: none;
				outline: none;
			}

			.main-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
				height: 100%;
				width: 100%;
			}

            .channels {
                display: flex;
				flex-direction: column;
				width: 100%;
			}

            .channels div {
				margin: 6px;
				padding: 9px;
				font-family: 'Paytone One', sans-serif;
				font-size: 21.6px;
				font-weight: bold;
				color: #28e6d6;
				text-align: center;
				
				border-radius: 5.4px; 
				border: 3px dashed #28e6d6;
				background-color: rgb(255, 255, 255, 0.036);
				backdrop-filter: blur(2.07px);
			}

			#selected {
				border: 3px solid #4effcde3;
				background-color: rgba(255, 255, 255, 0.18);
			}

			form {
				width: 100%;
			}

			#hide-text {
				display: none;
			}

			#others-text {
				resize: none; 
				height: 72px;
				width: 100%;
				border-radius: 9px;
				text-align: center;
				padding: 18px;
				font-size: 1.44em;
				margin: 9px 0;
				color: rgb(255, 255, 255, 0.9);
				border: 0.9px solid white;
				background-color: rgb(255, 255, 255, 0.054);
				backdrop-filter: blur(2.07px);
			}

			.button {
				height: 54px;
				width: 100%;

				border-radius: 9px;
				color: white;
				font-weight: 700;
				font-size: 1.53em;
				margin: 54px 0 0 0;
				background-color: rgb(255, 255, 255, 0.108);
				backdrop-filter: blur(2.07px);
				border: 1px solid white;
			}

			.button:hover {
				background-color: rgb(255, 255, 255, 0.36);
				backdrop-filter: blur(3px);
			}

			.hide-thanks {
				display: none;
			}

			.show-thanks {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background-color: #1a5fde96;
				color: white;
				font-size: 54px;
				font-weight: bolder;
			}
        `;

		this.shadow.appendChild(style);
	}

	render() {
		const { isDataSent } = state.getState();
		const { channels } = state.getState() as any;

		const checkChannel = (channel: Channels) => {
			const isChannelPresent = channels.indexOf(channel);
			if (isChannelPresent != -1) return 'selected';
			return '';
		};

		const checkOthers = () => {
			if (channels.indexOf('Otros') != -1) return 'others-text';
			return 'hide-text';
		};

		this.shadow.innerHTML = `
			<div class="main-container">
				<div class="channels">
					<div id=${checkChannel('Facebook')}>Facebook</div>
					<div id=${checkChannel('Instagram')}>Instagram</div>
					<div id=${checkChannel('Email')}>Email</div>
					<div id=${checkChannel('Otros')}>Otros</div>
				</div>

				<form>
					<textarea name="text" autofocus id=${checkOthers()}></textarea>
					<button type="submit" class="button">ENVIAR</button>
				</form>
			</div>

			<div class=${isDataSent ? 'show-thanks' : 'hide-thanks'}> ¡Gracias! </div>
        `;
	}

	sendForm() {
		const currentState = state.getState() as any;
		const { channels } = currentState;

		const formEl = this.shadow.querySelector('form') as HTMLFormElement;
		const buttonEl = this.shadow.querySelector('.button') as HTMLFormElement;
		const channelsButtonElements =
			this.shadow.querySelectorAll('.channels div');

		channelsButtonElements.forEach((btn) =>
			btn.addEventListener('click', (e) => {
				const target = e.target as any;
				const newChannel = target.innerHTML;

				if (channels.includes(newChannel)) {
					const indexOfChannel = channels.indexOf(newChannel);
					channels.splice(indexOfChannel, 1);
					state.setState({
						...currentState,
					});
					return;
				}

				channels.push(newChannel);
				state.setState({
					...currentState,
				});

				return;
			})
		);

		formEl.addEventListener('submit', async (e) => {
			e.preventDefault();

			const otherChannel = formEl.text.value as string;
			channels.push(otherChannel);

			const response = await sendDataToDatabase({
				...currentState,
			});

			if (response.status === 201) {
				state.setState({
					...currentState,
					isDataSent: true,
				});
			} else {
				buttonEl.style.border = '2px solid white';
				buttonEl.style.backgroundColor = 'rgba(255, 255, 255, 0)';
				buttonEl.innerHTML = 'Algo salió mal...';
			}

			setTimeout(() => Router.go('/'), 5400);
		});
	}
}

customElements.define('channels-form', ChannelsForm);

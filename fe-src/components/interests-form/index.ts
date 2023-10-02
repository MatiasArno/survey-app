import state from '../../state';
import { Interests } from '../../state';
import { Router } from '@vaadin/router';

class InterestsForm extends HTMLElement {
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
				outline: none;
				border: none;
			}

			.main-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
				align-items: center;
				height: 100%;
			}

            .interests {
                display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
				width: 100%;
				margin: 0 0 27px 0;
			}

            .interests div {
				margin: 6px;
				padding: 9px;
				font-family: 'Paytone One', sans-serif;
				font-size: 4.86vmin;
				font-weight: bold;
				color: #4effcde3;
				cursor: pointer;
				
				border-radius: 5.4px; 
				border: 3px dashed #4effcde3;
				background-color: rgba(255, 255, 255, 0);
			}
			
			@media screen and (min-width: 720px) {
				.interests div {
					font-size: 36px;
				}
			}

			#selected {
				border: 3px solid #4effcde3;
				background-color: rgba(255, 255, 255, 0.18);
			}
			
			form {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
			}

			#hide-text {
				display: none;
			}

			#show-text {
				position: absolute;
				bottom: calc(50vh - 210px);
				margin: 0;
				resize: none; 
				height: 240px;
				width: 320px;
				border-radius: 9px;
				text-align: center;
				padding: 18px;
				font-size: 1.26em;
				background-color: rgba(255, 255, 255, 0.9); 
			}


			.button {
				display: flex;
				justify-content: center;
				align-items: center;
				
				border-radius: 9px;
				background-color: rgb(63, 63, 63);
				color: white;
				font-weight: 700;
				font-size: 1.53em;
				border: none;
				height: 54px;
				width: 100%;
			}

			.button:hover {
				background-color: rgb(81, 81, 81);
			}

			.arrow {
				display: flex;
				flex-direction: column;
				justify-content: center;
				transform: rotate(270deg);
			}
			
			.arrow span {
				width: 24.3px;
				height: 24.3px;
				border-bottom: 7.2px solid white;
				border-right: 7.2px solid white;
				transform: rotate(45deg);
				margin: -6px;
				animation: animate 2.7s infinite;
			}
			
			.arrow span:nth-child(2) {
				animation-delay: -0.6s;
			}
			
			.arrow span:nth-child(3) {
				animation-delay: -1.2s;
			}
			
			@keyframes animate {
				0% {
					opacity: 0;
					transform: rotate(45deg) translate(-20px, -20px);
				}
				50% {
					opacity: 1;
				}
				100% {
					opacity: 0;
					transform: rotate(45deg) translate(20px, 20px);
				}
			}
        `;

		this.shadow.appendChild(style);
	}

	render() {
		const interests = state.getState().interests;

		const checkInterest = (interest: Interests) => {
			const isInterestPresent = interests.indexOf(interest);
			if (isInterestPresent != -1) return 'selected';
			return '';
		};

		const checkMore = () => {
			if (interests.indexOf('Mas') != -1) return 'show-text';
			return 'hide-text';
		};

		this.shadow.innerHTML = `
			<div class="main-container">
				<div class="interests">
					<div id=${checkInterest('Robot Colaborativo')}>Robot Colaborativo</div>
					<div id=${checkInterest('QA')}>QA</div>
					<div id=${checkInterest('Paletizado')}>Paletizado</div>
					<div id=${checkInterest('Pick &amp; Place')}>Pick & Place</div>
					<div id=${checkInterest('Trazabilidad')}>Trazabilidad</div>
					<div id=${checkInterest('Grippers')}>Grippers</div>
					<div id=${checkInterest('Robot Movil')}>Robot Movil</div>
					<div id=${checkInterest('Lector de codigo')}>Lector de codigo</div>
					<div id=${checkInterest('Sistemas de vision')}>Sistemas de vision</div>
					<div id=${checkInterest('Integracion')}>Integracion</div>
					<div id=${checkInterest('Mas')}>Mas</div>
				</div>

				<form>
					<textarea name="text" autofocus id=${checkMore()}></textarea>
					
					<button type="submit" class="button">
						<div class="arrow">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>
				</form>
			</div>
        `;
	}

	sendForm() {
		const { name, email, cellphone, company, interests, channels, isDataSent } =
			state.getState() as any;

		const formEl = this.shadow.querySelector('form') as HTMLFormElement;
		const interestsButtonElements =
			this.shadow.querySelectorAll('.interests div');

		interestsButtonElements.forEach((btn) =>
			btn.addEventListener('click', (e) => {
				const target = e.target as any;
				const newInterest = target.innerHTML;

				if (interests.includes(newInterest)) {
					const indexOfInterest = interests.indexOf(newInterest);
					interests.splice(indexOfInterest, 1);
					state.setState({
						name,
						email,
						cellphone,
						company,
						interests,
						channels,
					});
					return;
				}

				interests.push(newInterest);
				state.setState({
					name,
					email,
					cellphone,
					company,
					interests,
					channels,
				});
				return;
			})
		);

		formEl.addEventListener('submit', (e) => {
			e.preventDefault();

			interests.push(`Mas: ${formEl.text.value}`);

			state.setState({
				name,
				email,
				cellphone,
				company,
				interests,
				channels,
				isDataSent,
			});

			Router.go('/channels');
			return;
		});
	}
}

customElements.define('interests-form', InterestsForm);

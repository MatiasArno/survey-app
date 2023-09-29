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
			}

			.main-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
				height: 100%;
			}

            .interests {
                display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
				width: 100%;
				margin: 0 0 10px 0;
			}

            .interests div {
				margin: 6px;
				padding: 9px;
				font-family: 'Paytone One', sans-serif;
				font-size: 21.6px;
				font-weight: bold;
				color: #4effcde3;
				cursor: pointer;
				
				border-radius: 5.4px; 
				border: 3px dashed #4effcde3;
				background-color: rgba(255, 255, 255, 0);
			}

			#selected {
				border: 3px solid #4effcde3;
				background-color: rgba(255, 255, 255, 0.18);
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
			if (isInterestPresent != -1) return "selected";
			return '';
		};

		this.shadow.innerHTML = `
			<div class="main-container">
				<div class="interests">
					<div id=${checkInterest('Paletizado')}>Paletizado</div>
					<div id=${checkInterest('Encajonado')}>Encajonado</div>
					<div id=${checkInterest('Pick &amp; Place')}>Pick & Place</div>
					<div id=${checkInterest('Transporte de cargas')}>Transporte de cargas</div>
					<div id=${checkInterest('QA')}>QA</div>
					<div id=${checkInterest('Trazabilidad')}>Trazabilidad</div>
					<div id=${checkInterest('Dashboard Cloud')}>Dashboard Cloud</div>
					<div id=${checkInterest('Asistencia remota')}>Asistencia remota</div>
					<div id=${checkInterest('Clasificación de productos')}>Clasificación de productos</div>
				</div>

				<button type="button" class="button">
					<div class="arrow">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
			</div>
        `;
	}

	sendForm() {
		const { name, email, cellphone, company, interests, channels } =
			state.getState() as any;

		const buttonEl = this.shadow.querySelector('.button') as HTMLElement;
		const interestsButtonElements =
			this.shadow.querySelectorAll('.interests div');

		interestsButtonElements.forEach((btn) =>
			btn.addEventListener('click', (e) => {
				const target = e.target as any;
				const newInterest = target.innerHTML;

				if(interests.includes(newInterest)) {
					const indexOfInterest = interests.indexOf(newInterest);
					interests.splice(indexOfInterest, 1);
					state.setState({ name, email, cellphone, company, interests, channels });
					return;
				}
					
				interests.push(newInterest);
				state.setState({ name, email, cellphone, company, interests, channels });
				return;
			})
		);

		buttonEl.addEventListener('click', async () => Router.go('/channels'));
	}
}

customElements.define('interests-form', InterestsForm);

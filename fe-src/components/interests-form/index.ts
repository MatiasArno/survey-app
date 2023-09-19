import state from '../../state';
import { sendDataToDatabase } from '../../utils';
import { Interests } from '../../state';

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
				height: 45dvh;
			}

            .interests {
                display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-content: flex-start;
				width: 100%;
				height: calc(100% - 54px);
			}

            .interests div {
				margin: 6px;
				padding: 9px 18px;
				height: fit-content;
				font-family: 'Paytone One', sans-serif;
				font-size: 33.3px;
				font-weight: bold;
				color: #4effcde3;
				cursor: pointer;
				
				border-radius: 6px; 
				border: 3px dashed #4effcde3;
				background-color: rgba(255, 255, 255, 0);
			}

			.button {
				margin: 54px 0 0 0;
				height: 54px;
				width: 100%;

				border-radius: 9px;
				background-color: rgb(63, 63, 63);
				color: white;
				font-weight: 700;
				font-size: 1.53em;
				border: none;
				cursor: pointer;
			}

			.button:hover {
				background-color: rgb(81, 81, 81);
			}

			#selected {
				border: 3px solid #4effcde3;
				background-color: rgba(255, 255, 255, 0.18);
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
					<div id=${checkInterest('MiR')}>MiR</div>
					<div id=${checkInterest('UR')}>UR</div>
					<div id=${checkInterest('EXOR')}>EXOR</div>
					<div id=${checkInterest('COGNEX')}>COGNEX</div>
					<div id=${checkInterest('INDUSTRIA 4.0')}>INDUSTRIA 4.0</div>
				</div>					
				<button type="button" class="button">ENVIAR</button>
			</div>
        `;
	}

	sendForm() {
		const { name, email, cellphone, company, interests } =
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
					state.setState({ name, email, cellphone, company, interests });
					return;
				}
					
				interests.push(newInterest);
				state.setState({ name, email, cellphone, company, interests });
				return;
			})
		);

		buttonEl.addEventListener('click', async () => {
			const response = await sendDataToDatabase({
				name,
				email,
				cellphone,
				company,
				interests,
			});

			if (response.status === 201) {
				buttonEl.style.backgroundColor = '#8BC34A';
				buttonEl.innerHTML = '¡PERFECTO!';
			} else {
				buttonEl.style.border = '2px solid white';
				buttonEl.style.backgroundColor = 'rgba(255, 255, 255, 0)';
				buttonEl.innerHTML = 'Algo salió mal...';
			}

			setTimeout(() => window.location.reload(), 2100);
		});
	}
}

customElements.define('interests-form', InterestsForm);

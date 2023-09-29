import state from '../../state';
import { Router } from '@vaadin/router';

class WelcomeForm extends HTMLElement {
	shadow = this.attachShadow({ mode: 'open' });

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.addStyles();
		this.askInterests();
	}

	addStyles() {
		const style = document.createElement('style');

		style.innerHTML = `
			@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;900&display=swap');

			* {
				box-sizing: border-box;
				font-family: 'Poppins', sans-serif;
			}

            .form {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

                .input-field {
					margin: 18px 0 0 0;
                    height: 54px;
                    border: 0.9px solid white;
					border-radius: 4.5px;
                    background-color: rgba(255, 255, 255, 0);
					color: white;
                    text-align: center;
					font-size: 21px;
                }

				::placeholder {
					color: rgba(255, 255, 255, 0.63);
				}

                .input-field:focus {
                    outline: none;
                    background-color: rgba(255, 255, 255, 0.108);
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
					
					margin: 54px 0 0 0;
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
		this.shadow.innerHTML = `
            <form class="form" autocomplete="off">
				<input type="name" name="username" class="input-field" placeholder="N O M B R E S" required>
                <input type="email" name="email" class="input-field" placeholder="E M A I L" required>
                <input type="text" name="cellphone" class="input-field" placeholder="C E L U L A R" required>
                <input type="text" name="company" class="input-field" placeholder="E M P R E S A" required>

                <button type="submit" class="button">
					<div class="arrow">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>
            </form>
        `;
	}

	askInterests() {
		const formEl = this.shadow.querySelector('.form') as HTMLFormElement;

		formEl.addEventListener('submit', (e) => {
			e.preventDefault();
			
			const name = formEl.username.value;
			const email = formEl.email.value;
			const cellphone = formEl.cellphone.value;
			const company = formEl.company.value;

			state.setState({ name, email, cellphone, company, interests: [], channels: [] });
			Router.go('/interests');
		});
	}
}

customElements.define('welcome-form', WelcomeForm);

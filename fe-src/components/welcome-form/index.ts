import state from '../../state';

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
					text-transform: uppercase;
					font-size: 24px;
                }

				::placeholder {
					color: rgba(255, 255, 255, 0.63);
				}

                .input-field:focus {
                    outline: none;
                    background-color: rgba(255, 255, 255, 0.108);
                }

				.button {
					margin: 54px 0 0 0;
					height: 54px;

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
        `;

		this.shadow.appendChild(style);
	}

	render() {
		this.shadow.innerHTML = `
            <form class="form" autocomplete="off">
				<input type="name" name="username" class="input-field" placeholder="NOMBRE COMPLETO" required>
                <input type="email" name="email" class="input-field" placeholder="EMAIL" required>
                <input type="text" name="cellphone" class="input-field" placeholder="CELULAR" required>
                <input type="text" name="company" class="input-field" placeholder="EMPRESA" required>

                <button type="submit" name="button" class="button">INTERESES</button>
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
			const interests = [true];

			// Esto ejecuta el callback de welcome-page y renderiza nuevamente la pagina con interests-form
			state.setState({ name, email, cellphone, company, interests });
		});
	}
}

customElements.define('welcome-form', WelcomeForm);

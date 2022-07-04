import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RememberMe, loginHandler } from 'modules/components'

export const LoginComponent = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [remember, setRemember] = useState(false)

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await loginHandler(remember, 'login', email, password)
	}

	return (
		<div className="login">
			<div className="f-column">
				<label className="login__label col-dark-gray fs-60">Login Page</label>
				<div className="login__inputBox__wrapper g">
					<div className="login__test bg-col-dark-gray fs-28 f-column f-justify-center">
						<div>
							<img alt="car login" className="login__img" src={require('images/loginImg.png')}></img>
						</div>
						Car configurator
					</div>
					<form
						onSubmit={(e) => {
							onSubmit(e)
						}}
					>
						<div className="login__inputBox f-column f-align-items-center">
							<input
								className="login__email fs-25"
								type={'text'}
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							></input>
							<input
								className="login__password fs-25"
								type={'password'}
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							></input>
							<RememberMe remember={remember} setRemember={setRemember} />
							<div className="login__buttons f fs-25">
								<button className="login__buttons__loginButton fs-18" type="submit">
									Login
								</button>

								<button
									className="login__buttons__googleButton fs-18"
									onClick={async () => {
										await loginHandler(remember, 'google')
									}}
								>
									Login with Google
								</button>
							</div>
							<div className="login__menu f-column">
								<div className="login__menu__register">
									Dont have account yet? Create one{' '}
									<Link className="col-blue" to="/register">
										here
									</Link>
								</div>
								<div className="login__menu__passwordReset">
									I forgot my{' '}
									<Link className="col-blue" to="/password-reset">
										password
									</Link>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

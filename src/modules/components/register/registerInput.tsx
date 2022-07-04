import { useState } from 'react'
import { Link } from 'react-router-dom'

import { onClick, RememberMe } from 'modules/components'

export const RegisterInput = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [remember, setRemember] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await onClick(name, email, password, confirmPassword, remember)
	}

	return (
		<div className="login bg-col-pure-white">
			<div className="f-column">
				<label className="register__label col-dark-gray fs-60">Register Page</label>
				<div className="login__inputBox__wrapper g">
					<div className="login__test bg-col-dark-gray fs-28 f-column f-justify-center">
						<div>
							<img alt="login car" className="login__img" src={require('images/loginImg.png')}></img>
						</div>
						Car configurator
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="login__inputBox f-column f-align-items-center">
							<input
								className="register__name fs-25"
								type={'text'}
								placeholder={'Name'}
								onChange={(e) => setName(e.target.value)}
							></input>
							<input
								className="register__email fs-25"
								type={'text'}
								placeholder={'E-mail'}
								onChange={(e) => setEmail(e.target.value)}
							></input>
							<input
								className="register__password fs-25"
								type={'password'}
								placeholder={'Password'}
								onChange={(e) => setPassword(e.target.value)}
							></input>
							<input
								className="register__confirmPassword fs-25"
								type={'password'}
								placeholder={'Confirm Password'}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></input>
							<RememberMe remember={remember} setRemember={setRemember} />
							<div className="login__buttons f">
								<button className="login__buttons__loginButton fs-18" type="submit">
									Register
								</button>
							</div>
							<div className="login__menu f-column">
								<div className="login__menu__register">
									Already have account? Login{' '}
									<Link className="col-blue" to="/login">
										here
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

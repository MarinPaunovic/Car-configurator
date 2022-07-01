import { useState } from 'react'
import { Link } from 'react-router-dom'
import RememberMe from '../rememeberMe/rememberMe'
import { onClick } from './registerFunctions'

const RegisterInput = () => {
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
		<div className="login">
			<div className="login__wrapper">
				<label className="register__label">Register Page</label>
				<div className="login__inputBox__wrapper">
					<div className="login__test">
						<div>
							<img alt="login car" className="login__img" src={require('../../../images/loginImg.png')}></img>
						</div>
						Car configurator
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="login__inputBox">
							<input
								className="register__name"
								type={'text'}
								placeholder={'Name'}
								onChange={(e) => setName(e.target.value)}
							></input>
							<input
								className="register__email"
								type={'text'}
								placeholder={'E-mail'}
								onChange={(e) => setEmail(e.target.value)}
							></input>
							<input
								className="register__password"
								type={'password'}
								placeholder={'Password'}
								onChange={(e) => setPassword(e.target.value)}
							></input>
							<input
								className="register__confirmPassword"
								type={'password'}
								placeholder={'Confirm Password'}
								onChange={(e) => setConfirmPassword(e.target.value)}
							></input>
							<RememberMe remember={remember} setRemember={setRemember} />
							<div className="login__buttons">
								<button className="login__buttons__loginButton" type="submit">
									Register
								</button>
							</div>
							<div className="login__menu">
								<div className="login__menu__register">
									Already have account? Login <Link to="/login">here</Link>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default RegisterInput

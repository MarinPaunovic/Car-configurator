import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from 'modules/auth'

export const PasswordResetComponent = () => {
	const [email, setEmail] = useState('')
	let navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		sendPasswordResetEmail(auth, email).then(() => {
			alert('Password reset sent!')
			setEmail('')
			navigate('/login')
		})
	}

	return (
		<div className="login bg-col-light-gray">
			<div className="f-column">
				<label className="login__label col-dark-gray fs-60">Password Reset</label>
				<div className="login__inputBox__wrapper g">
					<div className="passwordReset__test bg-col-dark-gray fs-28 f-column">
						<div className="passwordReset__inputBox">
							<img alt="login car" className="login__img" src={require('images/loginImg.png')}></img>
						</div>
						Car configurator
					</div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<div className="passwordReset__input f-column f-jc-aic">
							<input
								className="passwordReset__input__email fs-16"
								type={'text'}
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></input>
							<button className="login__buttons__loginButton fs-18" type="submit">
								Send
							</button>
							<p className="login__menu__register">
								Head back to <Link to="/login">login</Link> page
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

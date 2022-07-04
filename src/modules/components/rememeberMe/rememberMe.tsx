interface IRememberMe {
	remember: boolean
	setRemember: (remember: boolean) => void
}

export const RememberMe = (props: IRememberMe) => {
	const { remember, setRemember } = props
	return (
		<div className="login__rememberMe fs-18 f f-align-items-center">
			Remember me
			<div
				className="login__rememberMe__checkbox pos-re f f-align-items-center"
				onClick={() => setRemember(!remember)}
				style={remember ? { background: 'lightgreen' } : { backgroundColor: 'lightgray' }}
			>
				<div
					className="login__rememberMe_checkbox__slider pos-ab"
					style={remember ? { backgroundColor: 'darkgreen', left: '20px' } : { backgroundColor: '#2e2e38', left: '3px' }}
				></div>
			</div>
		</div>
	)
}

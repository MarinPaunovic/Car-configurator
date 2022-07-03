import { useNavigate } from 'react-router-dom'

export const ConfigureACarButton = () => {
	const navigate = useNavigate()
	return (
		<button className="homepage__configureACarButton" onClick={() => navigate('/configure')}>
			Configure a car
		</button>
	)
}

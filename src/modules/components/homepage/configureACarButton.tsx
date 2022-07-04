import { useNavigate } from 'react-router-dom'

export const ConfigureACarButton = () => {
	const navigate = useNavigate()
	return (
		<button className="homepage__configureACarButton col-white bg-col-blue fs-14" onClick={() => navigate('/configure')}>
			Configure a car
		</button>
	)
}

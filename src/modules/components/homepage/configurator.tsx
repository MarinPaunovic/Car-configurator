import { Link } from 'react-router-dom'

export const Configurator = () => {
	return (
		<div className="homepage__configurator">
			<img
				alt="car"
				className="homepage__configurator__carImage"
				src={require('images/front-left2.png')}
				style={{ blockSize: '450px' }}
			/>
			<div className="homepage__configurator__emptyMessage">
				You haven't configured any cars yet. You may choose to <Link to="/configure">configure some now.</Link>
			</div>
		</div>
	)
}

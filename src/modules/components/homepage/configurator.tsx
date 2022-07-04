import { Link } from 'react-router-dom'

export const Configurator = () => {
	return (
		<div className="homepage__configurator f-column f-align-items-center">
			<img alt="car" className="homepage__configurator__carImage w-full" src={require('images/front-left2.png')} />
			<div className="homepage__configurator__emptyMessage fs-20 col-light-gray col-blue">
				You haven't configured any cars yet. You may choose to <Link to="/configure">configure some now.</Link>
			</div>
		</div>
	)
}

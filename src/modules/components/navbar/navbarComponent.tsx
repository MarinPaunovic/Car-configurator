import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from 'modules/components'
import { savedConfigAtom } from 'modules/storage'
import { useRecoilValue } from 'recoil'

export const NavbarComponent = () => {
	const [toggle, setToggle] = useState(false)
	const savedConfigs = useRecoilValue(savedConfigAtom)
	const navigate = useNavigate()
	return (
		<div className="navbar bg-col-dark-gray f-jb-aic w-full pos-re">
			<div className="navbar__logo" onClick={() => navigate('/')}>
				<img alt="prototyp logo" src={require('images/prototypLogo.png')}></img>
			</div>
			<div className="navbar__rightSide f f-align-items-center">
				{Object.keys(savedConfigs).length !== 0 && (
					<Link className="navbar__configure col-white bg-col-dark-gray" to="/configure">
						Configure a car
					</Link>
				)}
				<button className="navbar__dropdown col-white bg-col-dark-gray" onClick={() => setToggle(!toggle)}>
					<div className="navbar__dropdownRectangle bg-col-pure-white"></div>
					<div className="navbar__dropdownRectangleCopy bg-col-pure-white"></div>
				</button>
			</div>
			<div
				className="navbar__slideMenu bg-col-pure-white f-column pos-ab"
				style={!toggle ? { right: '-206.05px' } : { right: '0%' }}
			>
				<button
					className="fs-14 bg-col-pure-white col-light-blue"
					onClick={() => {
						navigate('/')
						setToggle(!toggle)
					}}
				>
					My saved configurations
				</button>
				<span className="navbar__slideMenu__separator bg-col-light-gray"></span>
				<Logout />
			</div>
		</div>
	)
}

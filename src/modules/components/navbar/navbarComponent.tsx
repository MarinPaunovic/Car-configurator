import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from 'modules/components'
import { savedConfigAtom } from 'modules/storage'
import { useRecoilValue } from 'recoil'

export const NavbarComponent = () => {
	const [toggle, setToggle] = useState(false)
	const savedConfigs = useRecoilValue(savedConfigAtom)
	console.log(savedConfigs)
	const navigate = useNavigate()
	return (
		<div className="navbar">
			<div className="navbar__logo" onClick={() => navigate('/')}>
				<img alt="prototyp logo" src={require('images/prototypLogo.png')}></img>
			</div>
			<div className="navbar__rightSide">
				{Object.keys(savedConfigs).length !== 0 && (
					<Link className="navbar__configure" to="/configure">
						Configure a car
					</Link>
				)}
				<button className="navbar__dropdown" onClick={() => setToggle(!toggle)}>
					<div className="navbar__dropdownRectangle"></div>
					<div className="navbar__dropdownRectangleCopy"></div>
				</button>
			</div>
			<div className="navbar__slideMenu" style={!toggle ? { right: '-206.05px' } : { right: '0%' }}>
				<button
					onClick={() => {
						navigate('/')
						setToggle(!toggle)
					}}
				>
					My saved configurations
				</button>
				<span className="navbar__slideMenu__separator"></span>
				<Logout />
			</div>
		</div>
	)
}

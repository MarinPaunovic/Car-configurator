import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from '../../auth/db'
import {
	carCustomConfiguratorAtom,
	carDefaultConfiguratorSelector,
	configuratorAtom,
	selectedCarAtom
} from '../../storage/carAtoms'
import { getTitleAtom, localEditAtom, savedConfigEditAtom } from '../../storage/editAtoms'
import { optionsCurrentConfigAtom } from '../../storage/optionsAtom'

const Options = () => {
	const { year, carModel, productionYear } = useRecoilValue(selectedCarAtom)
	const [currentConfig, setCurrentConfig] = useRecoilState(configuratorAtom)
	const optionsCurrentConfig = useRecoilValue(optionsCurrentConfigAtom)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)
	const title = useRecoilValue(getTitleAtom)
	const setLocalEdit = useSetRecoilState(localEditAtom)
	const savedConfigEdit = useRecoilValue(savedConfigEditAtom)
	const customConfig = useSetRecoilState(carCustomConfiguratorAtom)
	const defaultConfig = useRecoilValue(carDefaultConfiguratorSelector)
	const currentPage = window.location.pathname

	const navigate = useNavigate()

	useEffect(() => {
		return () => {
			setCurrentConfig(1)
			setLocalEdit({ edit: '', value: '' })
		}
	}, [setCurrentConfig, setLocalEdit])

	const handleDelete = () => {
		deleteDoc(doc(db, 'SavedConfigurations', savedConfigEdit))
		navigate('/')
	}
	return (
		<div className={optionsCurrentConfig ? 'options__short' : 'options'}>
			<div className={optionsCurrentConfig ? 'options__left__second' : 'options__left'}>
				<Link to="/configure">
					<img alt="navigate back" src={require('../../../images/navigateBack.png')} style={{ blockSize: '22px' }} />
				</Link>
				<div className="options__left__year">{year || productionYear}</div>
				<div className="options__left__carModel">{carModel}</div>
			</div>

			{currentPage === '/configuration-edit' ? (
				optionsCurrentConfig ? (
					<div className="options__edit__right__second">
						<div className="options__edit__right__second__title">{title}</div>
						<span
							className="material-symbols-outlined options__edit__right__second__title__x"
							onClick={() => {
								setCurrentConfigChoice('')
								setLocalEdit({ value: '', edit: '' })
							}}
						>
							x
						</span>
					</div>
				) : (
					<div className="options__edit__right__wrapper">
						{currentConfig > 1 && (
							<button onClick={() => setCurrentConfig(currentConfig - 1)} className="options__edit__right__arrowLeft">
								<span className="material-symbols-outlined">keyboard_arrow_left</span>
							</button>
						)}
						<div className="options__edit__right">
							<div
								className="options__edit__right__block"
								style={currentConfig === 1 ? { fontWeight: '700' } : { fontWeight: '400' }}
							>
								<p style={{ fontWeight: '400', color: '#9D9DAF' }}>01</p> Exterior
							</div>
							<div
								className="options__edit__right__block"
								style={currentConfig === 2 ? { fontWeight: '700' } : { fontWeight: '400' }}
							>
								<p style={{ fontWeight: '400', color: '#9D9DAF' }}>02</p> Interior
							</div>{' '}
							<div
								className="options__edit__right__block"
								style={currentConfig === 3 ? { fontWeight: '700' } : { fontWeight: '400' }}
							>
								<p style={{ fontWeight: '400', color: '#9D9DAF' }}>03</p> Summary
							</div>
						</div>
					</div>
				)
			) : (
				<div className="options__right">
					<Link
						className="options__right__edit"
						to="/configuration-edit"
						onClick={() => {
							if (!savedConfigEdit) {
								customConfig(defaultConfig)
							}
						}}
					>
						Edit configuration
					</Link>
					{savedConfigEdit && (
						<button className="options__right__delete" onClick={() => handleDelete()}>
							Delete
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Options

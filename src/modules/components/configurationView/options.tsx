import { deleteDoc, doc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from 'modules/auth'
import {
	configuratorAtom,
	selectedCarAtom,
	getTitleAtom,
	localEditAtom,
	savedConfigEditAtom,
	optionsCurrentConfigAtom
} from 'modules/storage'

export const Options = () => {
	const { year, carModel, productionYear } = useRecoilValue(selectedCarAtom)
	const [currentConfig, setCurrentConfig] = useRecoilState(configuratorAtom)
	const optionsCurrentConfig = useRecoilValue(optionsCurrentConfigAtom)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)
	const title = useRecoilValue(getTitleAtom)
	const setLocalEdit = useSetRecoilState(localEditAtom)
	const savedConfigEdit = useRecoilValue(savedConfigEditAtom)
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
				<img
					onClick={() => navigate(-1)}
					className="options__headBack"
					alt="navigate back"
					src={require('images/navigateBack.png')}
				/>
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
								<p
									style={
										currentConfig === 1 ? { fontWeight: '700', color: '#9D9DAF' } : { fontWeight: '400', color: '#9D9DAF' }
									}
								>
									01
								</p>{' '}
								Exterior
							</div>
							<div
								className="options__edit__right__block"
								style={currentConfig === 2 ? { fontWeight: '700' } : { fontWeight: '400' }}
							>
								<p
									style={
										currentConfig === 2 ? { fontWeight: '700', color: '#9D9DAF' } : { fontWeight: '400', color: '#9D9DAF' }
									}
								>
									02
								</p>{' '}
								Interior
							</div>{' '}
							<div
								className="options__edit__right__block"
								style={currentConfig === 3 ? { fontWeight: '700' } : { fontWeight: '400' }}
							>
								<p
									style={
										currentConfig === 3 ? { fontWeight: '700', color: '#9D9DAF' } : { fontWeight: '400', color: '#9D9DAF' }
									}
								>
									03
								</p>{' '}
								Summary
							</div>
						</div>
					</div>
				)
			) : (
				<div className="options__right">
					<Link className="options__right__edit" to="/configuration-edit">
						Edit configuration
					</Link>
					<button className="options__right__delete" onClick={() => handleDelete()}>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}

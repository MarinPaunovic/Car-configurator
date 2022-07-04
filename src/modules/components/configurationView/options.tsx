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
		<div className={optionsCurrentConfig ? 'options__short g bg-col-white' : 'options bg-col-white w-full f-jb-aic'}>
			<div
				className={
					optionsCurrentConfig ? 'options__left__second f f-align-items-center' : 'options__left f f-align-items-center'
				}
			>
				<div className="options__navigateBack__wrapper">
					<div className="options__navigateBack bg-col-dark-gray"></div>
				</div>

				<div className="options__left__year fs-28 col-9d9daf">{year || productionYear}</div>
				<div className="options__left__carModel fs-28 col-dark-gray">{carModel}</div>
			</div>

			{currentPage === '/configuration-edit' ? (
				optionsCurrentConfig ? (
					<div className="f-jb-aic bg-col-white" style={{ borderLeft: '1px solid #C7C7D1' }}>
						<div className="options__edit__right__second__title col-dark-gray">{title}</div>
						<span
							className="material-symbols-outlined options__edit__right__second__title__x fs-16"
							onClick={() => {
								setCurrentConfigChoice('')
								setLocalEdit({ value: '', edit: '' })
							}}
						>
							x
						</span>
					</div>
				) : (
					<div className="options__edit__right__wrapper f f-align-items-center">
						{currentConfig > 1 && (
							<button
								onClick={() => setCurrentConfig(currentConfig - 1)}
								className="options__edit__right__arrowLeft bg-col-white"
							>
								<span className="material-symbols-outlined">keyboard_arrow_left</span>
							</button>
						)}
						<div className="options__edit__right f f-align-items-center">
							<div
								className="options__edit__right__block f col-dark-gray"
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
								className="options__edit__right__block f col-dark-gray"
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
								className="options__edit__right__block f col-dark-gray"
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
				<div className="options__right f f-align-items-center">
					<Link className="options__right__edit fs-16 col-blue" to="/configuration-edit">
						Edit configuration
					</Link>
					<button className="options__right__delete fs-16 col-red" onClick={() => handleDelete()}>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}

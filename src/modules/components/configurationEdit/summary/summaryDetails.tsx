import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, db } from 'modules/auth'
import { CarConfig, carCustomConfiguratorAtom, selectedCarAtom, savedConfigEditAtom } from 'modules/storage'
import { CarPhotoSlider, ConfigurationDetails, PopupInfo } from 'modules/components'

export const SummaryDetails = () => {
	const { year, productionYear, carModel } = useRecoilValue(selectedCarAtom)
	const carConfig = useRecoilValue<CarConfig>(carCustomConfiguratorAtom)
	const savedConfigEdit = useRecoilValue(savedConfigEditAtom)
	const setSavedConfig = useSetRecoilState(savedConfigEditAtom)
	const navigate = useNavigate()

	const saveConfig = () => {
		if (auth.currentUser) {
			addDoc(collection(db, 'SavedConfigurations'), {
				uid: auth.currentUser.uid,
				productionYear: year,
				carModel: carConfig.carModel,
				exterior: { color: carConfig.exterior.color, wheels: carConfig.exterior.wheels },
				interior: { seats: carConfig.interior.seats, dash: carConfig.interior.dash },
				createdAt: serverTimestamp()
			}).then(() => navigate('/'))
		}
	}

	const updateConfig = () => {
		if (auth.currentUser && savedConfigEdit) {
			updateDoc(doc(db, 'SavedConfigurations', savedConfigEdit), {
				uid: auth.currentUser.uid,
				productionYear: productionYear,
				carModel: carConfig.carModel,
				exterior: { color: carConfig.exterior.color, wheels: carConfig.exterior.wheels },
				interior: { seats: carConfig.interior.seats, dash: carConfig.interior.dash }
			}).then(() => {
				setSavedConfig({})
				navigate('/')
			})
		}
	}

	return (
		<div className="configurationView">
			<div className="summary__title">
				<p>Almost done!</p>
				<p>Review your configuration and save your car.</p>
			</div>
			<CarPhotoSlider />
			<ConfigurationDetails />
			<div className="summary__wrapper">
				<div className="summary__left">
					<div className="options__left__summary">
						<p className="options__left__year">{year || productionYear}</p>
						<p className="options__left__carModel">{carModel}</p>
					</div>
					<div className="summary__left__infos">
						<PopupInfo text={'Summary popup info'} className={'summary__popup'} />
						<p className="configurationDetails__header__amount">120,000.12€</p>
					</div>
				</div>
				<button
					className="summary__button"
					onClick={() => {
						if (savedConfigEdit.length > 0) {
							updateConfig()
						} else saveConfig()
					}}
				>
					Save your configuration
				</button>
			</div>
		</div>
	)
}

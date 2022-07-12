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
		<div className="configurationView bg-col-light-gray">
			<div className="summary__title col-dark-gray">
				<p>Almost done!</p>
				<p>Review your configuration and save your car.</p>
			</div>
			<CarPhotoSlider />
			<ConfigurationDetails />
			<div className="summary__wrapper g bg-col-white">
				<div className="summary__left f-jb-aic">
					<div className="options__left__summary f f-align-items-center">
						<p className="options__left__year fs-28 col-9d9daf">{year || productionYear}</p>
						<p className="options__left__carModel fs-28 col-dark-gray">{carModel}</p>
					</div>
					<div className="summary__left__infos f f-align-items-center">
						<PopupInfo text={'Summary popup info'} className={'summary__popup f fs-14 col-9d9daf'} />
						<p className="configurationDetails__header__amount col-dark-gray fs-24">120,000.12€</p>
					</div>
				</div>
				<button
					className="summary__button fs-16 bg-col-blue col-pure-white"
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

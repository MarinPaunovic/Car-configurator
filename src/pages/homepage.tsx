import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, query, Unsubscribe, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { auth, db } from 'modules/auth'
import { Configurator, SavedConfigs, NavbarComponent, ConfigureACarButton } from 'modules/components'
import { savedConfigAtom, SavedConfigFetch, deleteMessageAtom, popupMenuAtom } from 'modules/storage'

export const Homepage = () => {
	const [savedConfigs, setSavedConfig] = useRecoilState(savedConfigAtom)
	const deleteMessage = useRecoilValue(deleteMessageAtom)
	const setPopupMenu = useSetRecoilState(popupMenuAtom)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let unsub: Unsubscribe = () => {}
		onAuthStateChanged(auth, () => {
			if (auth.currentUser) {
				unsub = onSnapshot(
					query(collection(db, 'SavedConfigurations'), where('uid', '==', auth.currentUser.uid)),
					(snap) => {
						const savedConfig = snap.docs.map((item) => {
							let dataFetch: SavedConfigFetch = {
								id: item.id,
								carModel: item.data().carModel,
								wheels: item.data().exterior.wheels,
								seats: item.data().interior.seats,
								dash: item.data().interior.dash,
								color: item.data().exterior.color,
								productionYear: item.data().productionYear,
								createdAt: new Date(item.data().createdAt.seconds * 1000)
									.toLocaleDateString('en', {
										month: 'short',
										day: '2-digit',
										year: 'numeric'
									})
									.replace(',', '')
									.split(' ')
							}
							return dataFetch
						})
						setSavedConfig(savedConfig)
						setLoading(false)
					}
				)
			}
		})
		return () => {
			setPopupMenu('')
			unsub()
		}
	}, [setPopupMenu, setSavedConfig])

	return (
		<div className="homepage pos-re bg-col-light-gray">
			<NavbarComponent />

			{loading ? (
				<div>Loading...</div>
			) : Object.keys(savedConfigs).length ? (
				<div className="homepage__savedConfigs">
					<div
						className="homepage__deleteMessage bg-col-lightcoral pos-ab f"
						style={deleteMessage ? { right: '0%' } : { right: '-200px' }}
					>
						<p className="col-light-red" style={{ textAlign: 'center' }}>
							Your configuration is successfully deleted!
						</p>
					</div>
					<div className="homepage__savedConfigs__title col-dark-gray pos-re fs-24 f-jb-aic">
						View saved configurations
						<ConfigureACarButton />
					</div>

					<SavedConfigs />
				</div>
			) : (
				<>
					<div
						className="homepage__deleteMessage bg-col-lightcoral pos-ab f"
						style={deleteMessage ? { right: '0%', top: '15%' } : { right: '-200px', top: '15%' }}
					>
						<p className="col-light-red" style={{ textAlign: 'center' }}>
							Your configuration is successfully deleted!
						</p>
					</div>
					<div className="homepage__savedConfigs__title col-dark-gray pos-re fs-24 f-jb-aic">
						View saved configurations <ConfigureACarButton />
					</div>

					<Configurator />
				</>
			)}
		</div>
	)
}

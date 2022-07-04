import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { db } from 'modules/auth'
import {
	CarConfig,
	carCustomConfiguratorAtom,
	savedConfigAtom,
	SavedConfigFetch,
	selectedCarAtom,
	popupMenuAtom,
	savedConfigEditAtom,
	deleteMessageAtom
} from 'modules/storage'

export const SavedConfigs = () => {
	const setDeleteMessage = useSetRecoilState(deleteMessageAtom)
	const savedConfigs = useRecoilValue<Array<SavedConfigFetch>>(savedConfigAtom)
	const [popupMenu, setPopupMenu] = useRecoilState(popupMenuAtom)
	const setSavedConfig = useSetRecoilState(savedConfigEditAtom)
	const carCustomEdit = useSetRecoilState(carCustomConfiguratorAtom)
	const selectedCar = useSetRecoilState(selectedCarAtom)
	const navigate = useNavigate()

	const handleEdit = async (id: string) => {
		await getDoc(doc(db, 'SavedConfigurations', id)).then(async (snap) => {
			if (snap.exists()) {
				let array: CarConfig = {
					carModel: snap.data().carModel,
					exterior: { color: snap.data().exterior.color, wheels: snap.data().exterior.wheels },
					interior: { dash: snap.data().interior.dash, seats: snap.data().interior.seats }
				}
				await getDocs(query(collection(db, 'Cars'), where('carModel', '==', snap.data().carModel))).then((snap) => {
					selectedCar(snap.docs[0].data())
				})
				setSavedConfig(id)
				carCustomEdit(array)
			}
		})
		navigate('/configuration-view')
	}

	const handleDelete = (id: string) => {
		deleteDoc(doc(db, 'SavedConfigurations', id)).then(() => toggleDeleteMessage())
	}
	const toggleDeleteMessage = () => {
		setDeleteMessage(true)
		setTimeout(() => {
			setDeleteMessage(false)
		}, 4200)
	}
	return (
		<>
			{Object.keys(savedConfigs).length &&
				savedConfigs.map((item, i: number) => (
					<div className="savedConfigs__wrapper bg-col-white pos-re g f-align-items-center" key={i}>
						<div>
							<img
								alt="car"
								src={require(`images/${item.carModel}/exterior/${item.color}/${item.wheels}/3.png`)}
								style={{ blockSize: '150px', width: '84%', objectFit: 'contain', marginLeft: '8%' }}
							/>
						</div>
						<div className="savedConfigs__splitter bg-col-gray"></div>
						<div>
							<div>
								<div className="savedConfigs__info">
									<div className="savedConfigs__info__wrapper">
										<p>{item.productionYear}</p>
										<p>{item.carModel}</p>
										<p>{item.color}</p>
									</div>
									<div className="savedConfigs__createdAt col-9d9daf fs-12 f">
										<p>Created</p>
										<p>{item.createdAt && item.createdAt[0]}</p>
										<p>{item.createdAt && item.createdAt[1]}nd</p>
										<p>{item.createdAt && item.createdAt[2]}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="savedConfigs__button col-dim-purple pos-ab">
							<button
								className="material-symbols-outlined savedConfigs__button__vert bg-col-white"
								onClick={() => {
									if (popupMenu && popupMenu === item.id) {
										setPopupMenu('')
									} else setPopupMenu(item.id)
								}}
							>
								more_vert
							</button>
							<div
								className="savedConfigs__popupMenu pos-ab bg-col-pure-white"
								style={popupMenu === item.id ? { display: 'flex' } : { display: 'none' }}
							>
								<button
									className="savedConfigs__editButton bg-col-pure-white col-blue fs-14"
									onClick={() => handleEdit(item.id)}
								>
									Edit configuration
								</button>
								<span className="savedConfigs__button__splitter"></span>
								<button
									className="savedConfigs__deleteButton col-red bg-col-pure-white fs-14"
									onClick={() => {
										setPopupMenu('')
										window.confirm('Do you really want to delete configuration?') && handleDelete(item.id)
									}}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
		</>
	)
}

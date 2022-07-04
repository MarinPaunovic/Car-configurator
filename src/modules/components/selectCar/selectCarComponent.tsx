import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { db } from 'modules/auth'
import {
	localEditAtom,
	savedConfigEditAtom,
	carCustomConfiguratorAtom,
	carsAtom,
	ICar,
	selectedCarAtom
} from 'modules/storage'

export const SelectCarComponent = () => {
	const setSelectedCar = useSetRecoilState(selectedCarAtom)
	const setSavedConfigEdit = useSetRecoilState(savedConfigEditAtom)
	const [cars, setCars] = useRecoilState<ICar[]>(carsAtom)
	const editSelector = useSetRecoilState(localEditAtom)
	const setCustomCarConfig = useSetRecoilState(carCustomConfiguratorAtom)

	useEffect(() => {
		setSelectedCar({})
		setCustomCarConfig({})
		editSelector({ value: '', edit: '' })
		getDocs(collection(db, 'Cars')).then((data) => {
			const carArray = data.docs.map((item) => {
				let myTypeCarArray: ICar = {
					carModel: item.data().carModel,
					wheels: item.data().wheels,
					seats: item.data().seats,
					dash: item.data().dash,
					color: item.data().color,
					productionYear: item.data().productionYear
				}
				return myTypeCarArray
			})
			setCars(carArray)
		})
		setSavedConfigEdit('')
	}, [setCars, setSavedConfigEdit, setSelectedCar, editSelector, setCustomCarConfig])

	return (
		<>
			<div className="selectCar__label f-column">
				<p className="selectCar__label__one col-dark-gray fs-24">Configure a car</p>
				<p className="selectCar__label__two col-light-gray">Pick your favorite model and start configuring.</p>
			</div>
			<div className="selectCar f">
				{Object.keys(cars).length !== 0 &&
					cars.map((item, i) => {
						return (
							<div className="selectCar__car bg-col-white" key={i}>
								<img
									alt="car"
									src={require(`images/${item.carModel}/exterior/${item.color[0]}/${item.wheels[1]}/1.png`)}
									className="selectCar__car__img"
								></img>
								<div className="selectCar__car__textWrapper f-column">
									<div className="selectCar__car__productionYear col-light-gray fs-28">{item.productionYear}</div>
									<div className="selelctCar__car__carModel fs-48">{item.carModel}</div>
									<Link
										className="selectCar__car__button bg-col-blue col-white"
										onClick={() => {
											setSelectedCar({
												carModel: item.carModel,
												color: item.color,
												year: item.productionYear,
												seats: item.seats,
												wheels: item.wheels,
												dash: item.dash
											})
										}}
										to="/configuration-edit"
									>
										Configure Now
									</Link>
								</div>
							</div>
						)
					})}
			</div>
		</>
	)
}

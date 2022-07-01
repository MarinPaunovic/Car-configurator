import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { db } from '../../auth/db'
import { carsAtom, ICar, selectedCarAtom } from '../../storage/carAtoms'
import { savedConfigEditAtom } from '../../storage/editAtoms'

const SelectCarComponent = () => {
	const setSelectedCar = useSetRecoilState(selectedCarAtom)
	const setSavedConfigEdit = useSetRecoilState(savedConfigEditAtom)
	const [cars, setCars] = useRecoilState<ICar[]>(carsAtom)

	useEffect(() => {
		setSelectedCar({})
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
	}, [setCars, setSavedConfigEdit, setSelectedCar])

	return (
		<>
			<div className="selectCar__label">
				<p className="selectCar__label__one">Configure a car</p>
				<p className="selectCar__label__two">Pick your favorite model and start configuring.</p>
			</div>
			<div className="selectCar">
				{Object.keys(cars).length !== 0 &&
					cars.map((item, i) => {
						return (
							<div className="selectCar__car" key={i}>
								<img
									alt="car"
									src={require(`../../../images/${item.carModel}/exterior/${item.color[0]}/${item.wheels[1]}/1.png`)}
									className="selectCar__car__img"
								></img>
								<div className="selectCar__car__textWrapper">
									<div className="selectCar__car__productionYear">{item.productionYear}</div>
									<div className="selelctCar__car__carModel">{item.carModel}</div>
									<Link
										className="selectCar__car__button"
										onClick={() =>
											setSelectedCar({
												carModel: item.carModel,
												color: item.color,
												year: item.productionYear,
												seats: item.seats,
												wheels: item.wheels,
												dash: item.dash
											})
										}
										to="/configuration-view"
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

export default SelectCarComponent
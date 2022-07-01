import { useRecoilState, useRecoilValue } from 'recoil'
import { carCustomConfiguratorAtom, selectedCarAtom } from '../../../../storage/carAtoms'
import { localEditAtom } from '../../../../storage/editAtoms'
import CheckMarkComponent from '../../checkMarkComponent'

const EditChoiceSecondWheelsComponent = () => {
	const { wheels } = useRecoilValue(selectedCarAtom)
	const [localEdit, setLocalEdit] = useRecoilState(localEditAtom)
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)

	if (!wheels) {
		return
	}

	return (
		<>
			{wheels &&
				wheels.map((item: string, i: number) => (
					<div
						className="editDetails__choice__second__wrapper__each"
						key={i}
						onClick={() => {
							setLocalEdit({
								value: item,
								edit: 'wheels'
							})
						}}
					>
						<div className="editDetails__choice__second__wrapper__color">
							<div className="editDetails__choice__second__wrapper__color__mark">
								{carConfig && (
									<img
										alt="car wheel"
										src={require(`../../../../../images/${carConfig.carModel}/exterior/wheels/${item}.png`)}
										style={{
											blockSize: '60px'
										}}
									/>
								)}
								{localEdit.value
									? item === localEdit.value && <CheckMarkComponent />
									: carConfig && item === carConfig.exterior.wheels && <CheckMarkComponent />}
							</div>

							<div className="editDetails__choice__second__wrapper__color__title_wrapper">
								{item === 'one' ? <div>22” Magnesium 5-spoke</div> : <div>22” Alloy 10-spoke</div>}
								<>
									{!localEdit.edit
										? carConfig &&
										  item === carConfig.exterior.wheels && (
												<div className="editDetails__choice__second__wrapper__color__title__wrapper__price">2,500€</div>
										  )
										: item === localEdit.value && (
												<div className="editDetails__choice__second__wrapper__color__title__wrapper__price">2,500€</div>
										  )}
								</>
							</div>
						</div>
					</div>
				))}
		</>
	)
}

export default EditChoiceSecondWheelsComponent

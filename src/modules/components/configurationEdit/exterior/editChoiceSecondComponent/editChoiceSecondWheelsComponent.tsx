import { useRecoilState, useRecoilValue } from 'recoil'
import { carCustomConfiguratorAtom, selectedCarAtom, localEditAtom } from 'modules/storage'
import { CheckMarkComponent } from 'modules/components'

export const EditChoiceSecondWheelsComponent = () => {
	const { wheels } = useRecoilValue(selectedCarAtom)
	const [localEdit, setLocalEdit] = useRecoilState(localEditAtom)
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)

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
						<div className="editDetails__choice__second__wrapper__color f f-align-items-center col-dark-gray">
							<div className="pos-re">
								{carConfig && (
									<img
										alt="car wheel"
										src={require(`images/${carConfig.carModel}/exterior/wheels/${item}.png`)}
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
												<div className="editDetails__choice__second__wrapper__color__title__wrapper__price col-light-gray">
													2,500€
												</div>
										  )
										: item === localEdit.value && (
												<div className="editDetails__choice__second__wrapper__color__title__wrapper__price col-light-gray">
													2,500€
												</div>
										  )}
								</>
							</div>
						</div>
					</div>
				))}
		</>
	)
}

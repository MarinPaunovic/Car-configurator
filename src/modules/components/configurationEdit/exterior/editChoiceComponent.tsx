import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { carCustomConfiguratorAtom, configuratorAtom, optionsCurrentConfigAtom } from 'modules/storage'
import { PopupInfo } from 'modules/components'

export const EditChoiceComponent = () => {
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)
	const [currentConfigPage, setCurrentConfigPage] = useRecoilState(configuratorAtom)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)

	return (
		<div className="editDetails__choice">
			<div className="editDetails__choice__items">
				<div
					className="editDetails__choice__wrapper"
					title="color"
					onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
				>
					{carConfig && (
						<>
							<img
								alt="car"
								src={require(`images/colors/${carConfig.exterior.color}.png`)}
								style={{
									blockSize: '60px',
									borderRadius: '100%'
								}}
							/>
							<span>
								<p className="editDetails__choice__wrapper__title">{carConfig.exterior.color}</p>
								<p className="editDetails__choice__wrapper__sub">PAINT COLOR</p>
							</span>
						</>
					)}
				</div>
				<div
					title="wheels"
					className="editDetails__choice__wrapper"
					onClick={(e) => setCurrentConfigChoice(e.currentTarget.title)}
				>
					{carConfig && (
						<>
							<img
								alt="car"
								src={require(`images/${carConfig.carModel}/exterior/wheels/${carConfig.exterior.wheels}.png`)}
								style={{ blockSize: '60px' }}
							/>
							<span>
								<p className="editDetails__choice__wrapper__title">
									{carConfig.exterior.wheels === 'one' ? '22˝ Magnesium 5-spoke' : '22˝ Alloy 10-spoke'}
								</p>
								<p className="editDetails__choice__wrapper__sub">wheels</p>
							</span>
						</>
					)}
				</div>
			</div>
			<div>
				<div className="editDetails__choice__popup__wrapper">
					<PopupInfo text={'text info unutar edita'} className="editDetails__choice__popup" />
					<span className="editDetails__choice__popup__price">120000€</span>
				</div>
				<button className="editDetails__choice__button" onClick={() => setCurrentConfigPage(currentConfigPage + 1)}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						Interior
						<span className="material-symbols-outlined" style={{ color: '#FCFCFD', fontSize: '16px' }}>
							keyboard_arrow_right
						</span>
					</div>
				</button>
			</div>
		</div>
	)
}

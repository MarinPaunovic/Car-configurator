import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
	carCustomConfiguratorAtom,
	configuratorAtom,
	optionsCurrentConfigAtom,
	previewCurrentPageAtom
} from 'modules/storage'
import { PopupInfo } from 'modules/components'

export const EditChoiceComponent = () => {
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)
	const [currentConfigPage, setCurrentConfigPage] = useRecoilState(configuratorAtom)
	const currentPage = useSetRecoilState(previewCurrentPageAtom)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)

	return (
		<div className="editDetails__choice f-column f-justify-between bg-col-white">
			<div className="editDetails__choice__items f-column">
				<div
					className="editDetails__choice__wrapper f f-align-items-center"
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
								<p className="editDetails__choice__wrapper__title col-dark-gray">{carConfig.exterior.color}</p>
								<p className="editDetails__choice__wrapper__sub col-light-gray">PAINT COLOR</p>
							</span>
						</>
					)}
				</div>
				<div
					title="wheels"
					className="editDetails__choice__wrapper f f-align-items-center"
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
								<p className="editDetails__choice__wrapper__title col-dark-gray">
									{carConfig.exterior.wheels === 'one' ? '22˝ Magnesium 5-spoke' : '22˝ Alloy 10-spoke'}
								</p>
								<p className="editDetails__choice__wrapper__sub col-light-gray">wheels</p>
							</span>
						</>
					)}
				</div>
			</div>
			<div>
				<div className="editDetails__choice__popup__wrapper f f-align-items-center f-justify-between">
					<PopupInfo
						text={'text info unutar edita'}
						className="editDetails__choice__popup fs-14 f f-align-items-center col-9d9daf"
					/>
					<span className="editDetails__choice__popup__price col-dark-gray">120000€</span>
				</div>
				<button
					className="editDetails__choice__button bg-col-blue col-pure-white"
					onClick={() => {
						setCurrentConfigPage(currentConfigPage + 1)
						currentPage(1)
					}}
				>
					<div className="f-jc-aic">
						Interior
						<img alt="forward" src={require('images/forward.png')} style={{ marginLeft: '8px' }} />
					</div>
				</button>
			</div>
		</div>
	)
}

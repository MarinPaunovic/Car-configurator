import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
	getTitleAtom,
	localEditAtom,
	optionsCurrentConfigAtom,
	carCustomConfiguratorAtom,
	selectedCarAtom
} from 'modules/storage'

export const EditChoiceSecondColorComponent = () => {
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)
	const [localEdit, setLocalEdit] = useRecoilState(localEditAtom)
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)
	const { color } = useRecoilValue(selectedCarAtom)
	const title = useRecoilValue(getTitleAtom)
	return (
		<>
			<div className="editDetails__choice__smallScreen__title col-dark-gray">
				{title}
				<span
					className="material-symbols-outlined editDetails__choice__smallScreen__title__x"
					onClick={() => {
						setCurrentConfigChoice('')
						setLocalEdit({ value: '', edit: '' })
					}}
				>
					x
				</span>
			</div>
			{color.map((item: string, i: number) => (
				<div
					className="editDetails__choice__second__wrapper__each"
					key={i}
					onClick={() => {
						setLocalEdit({ value: item, edit: 'color' })
					}}
				>
					<div className="editDetails__choice__second__wrapper__color f f-align-items-center col-dark-gray">
						<div className="pos-re">
							<img
								alt="car color"
								src={require(`images/colors/${item}.png`)}
								style={{
									blockSize: '60px',
									borderRadius: '100%'
								}}
							/>
							{localEdit.value
								? item === localEdit.value && (
										<div className="editDetails__choice__second__wrapper__chosen pos-ab bg-col-light-green">
											<span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
												done
											</span>
										</div>
								  )
								: carConfig &&
								  item === carConfig.exterior.color && (
										<div className="editDetails__choice__second__wrapper__chosen pos-ab bg-col-light-green">
											<span className="material-symbols-outlined editDetails__choice__second__wrapper__chosen__done">
												done
											</span>
										</div>
								  )}
						</div>
						<div className="editDetails__choice__second__wrapper__color__title_wrapper f-column">
							<span>{item}</span>
							<>
								{!localEdit.edit
									? carConfig &&
									  item === carConfig.exterior.color && (
											<div className="editDetails__choice__second__wrapper__color__title__wrapper__price col-light-gray">
												2,500???
											</div>
									  )
									: item === localEdit.value && (
											<div className="editDetails__choice__second__wrapper__color__title__wrapper__price col-light-gray">
												2,500???
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

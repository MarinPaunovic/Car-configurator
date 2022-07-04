import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
	localEditAtom,
	localEditSelector,
	CarConfig,
	carCustomConfiguratorAtom,
	optionsCurrentConfigAtom
} from 'modules/storage'

export const DoneButton = () => {
	const setCarConfig = useSetRecoilState(carCustomConfiguratorAtom)
	const editSelector = useRecoilValue(localEditSelector)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)
	const setLocalEdit = useSetRecoilState(localEditAtom)

	const handleConfigChange = () => {
		setCarConfig((prevState: CarConfig) => {
			if (!prevState) {
				return undefined
			}
			if (editSelector) {
				switch (editSelector.edit) {
					case 'color':
						return {
							...prevState,
							exterior: { wheels: prevState.exterior.wheels, color: editSelector.value }
						}
					case 'wheels':
						return {
							...prevState,
							exterior: { color: prevState.exterior.color, wheels: editSelector.value }
						}
					case 'dash':
						return {
							...prevState,
							interior: { seats: prevState.interior.seats, dash: editSelector.value }
						}
					case 'seats':
						return {
							...prevState,
							interior: { dash: prevState.interior.dash, seats: editSelector.value }
						}
					default:
						return
				}
			}
		})
		setCurrentConfigChoice('')
		setLocalEdit({ value: '', edit: '' })
	}

	return (
		<div className="doneButton pos-ab">
			<button
				className="editDetails__choice__button bg-col-blue col-pure-white"
				onClick={() => {
					if (editSelector && editSelector.value) {
						handleConfigChange()
					}
				}}
			>
				Done
			</button>
		</div>
	)
}

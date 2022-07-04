import { useRecoilValue } from 'recoil'
import { optionsCurrentConfigAtom } from 'modules/storage'
import { EditChoiceSecondColorComponent, EditChoiceSecondWheelsComponent, DoneButton } from 'modules/components'

export const EditChoiceSecondComponent = () => {
	const currentConfigChoice = useRecoilValue(optionsCurrentConfigAtom)
	return (
		<div className="editDetails__choice__second pos-re bg-col-white">
			<div className="editDetails__choice__second__wrapper f-column">
				{currentConfigChoice && currentConfigChoice === 'wheels' ? (
					<EditChoiceSecondWheelsComponent />
				) : (
					<EditChoiceSecondColorComponent />
				)}
				<DoneButton />
			</div>
		</div>
	)
}

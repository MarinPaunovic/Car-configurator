import { useRecoilValue } from 'recoil'
import { optionsCurrentConfigAtom } from 'modules/storage/optionsAtom'
import DoneButton from 'modules/components/configurationEdit/doneButton'
import EditChoiceSecondColorComponent from 'modules/components/configurationEdit/exterior/editChoiceSecondComponent/editChoiceSecondColorComponent'
import EditChoiceSecondWheelsComponent from 'modules/components/configurationEdit/exterior/editChoiceSecondComponent/editChoiceSecondWheelsComponent'

const EditChoiceSecondComponent = () => {
	const currentConfigChoice = useRecoilValue(optionsCurrentConfigAtom)
	return (
		<div className="editDetails__choice__second">
			<div className="editDetails__choice__second__wrapper">
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

export default EditChoiceSecondComponent

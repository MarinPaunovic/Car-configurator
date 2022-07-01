import { useRecoilValue } from 'recoil'
import { optionsCurrentConfigAtom } from '../../../../storage/optionsAtom'
import DoneButton from '../../doneButton'
import EditChoiceSecondColorComponent from './editChoiceSecondColorComponent'
import EditChoiceSecondWheelsComponent from './editChoiceSecondWheelsComponent'

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

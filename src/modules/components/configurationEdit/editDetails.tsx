import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { carCustomConfiguratorAtom, configuratorAtom } from '../../storage/carAtoms'
import { optionsCurrentConfigAtom } from '../../storage/optionsAtom'
import { previewCurrentPageAtom } from '../../storage/pageAtoms'

import ExteriorDetails from './exterior/exteriorDetails'
import InteriorDetails from './Interior/interiorDetails'
import SummaryDetails from './summary/summaryDetails'

const EditDetails = () => {
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)
	const setCurrentPage = useSetRecoilState(previewCurrentPageAtom)
	const currentConfigPage = useRecoilValue(configuratorAtom)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)

	useEffect(() => {
		return () => {
			setCurrentPage(1)
			setCurrentConfigChoice('')
		}
	}, [setCurrentPage, setCurrentConfigChoice])

	return (
		<div className="editDetails">
			{currentConfigPage === 3 ? (
				<SummaryDetails />
			) : (
				carConfig && (
					<div className="editDetails__new">
						<InteriorDetails />
						<ExteriorDetails />
					</div>
				)
			)}
		</div>
	)
}

export default EditDetails

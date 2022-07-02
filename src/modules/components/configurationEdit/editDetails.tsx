import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { carCustomConfiguratorAtom, carDefaultConfiguratorSelector, configuratorAtom } from '../../storage/carAtoms'
import { savedConfigEditAtom } from '../../storage/editAtoms'
import { optionsCurrentConfigAtom } from '../../storage/optionsAtom'
import { previewCurrentPageAtom } from '../../storage/pageAtoms'
import ExteriorDetails from './exterior/exteriorDetails'
import InteriorDetails from './Interior/interiorDetails'
import SummaryDetails from './summary/summaryDetails'

const EditDetails = () => {
	const [carConfig, setCarConfig] = useRecoilState(carCustomConfiguratorAtom)
	const setCurrentPage = useSetRecoilState(previewCurrentPageAtom)
	const currentConfigPage = useRecoilValue(configuratorAtom)
	const defaultConfigurator = useRecoilValue(carDefaultConfiguratorSelector)
	const setCurrentConfigChoice = useSetRecoilState(optionsCurrentConfigAtom)
	const setSavedConfig = useRecoilValue(savedConfigEditAtom)

	useEffect(() => {
		if (!setSavedConfig) {
			setCarConfig(defaultConfigurator)
		}
		return () => {
			setCurrentPage(1)
			setCurrentConfigChoice('')
		}
	}, [setCurrentPage, setCurrentConfigChoice, defaultConfigurator, setCarConfig, setSavedConfig])

	return (
		<div className="editDetails">
			{currentConfigPage === 3 ? (
				<SummaryDetails />
			) : (
				Object.keys(carConfig).length && (
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

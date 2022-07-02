import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
	savedConfigEditAtom,
	previewCurrentPageAtom,
	optionsCurrentConfigAtom,
	carCustomConfiguratorAtom,
	carDefaultConfiguratorSelector,
	configuratorAtom
} from 'modules/storage'
import { ExteriorDetails, InteriorDetails, SummaryDetails } from 'modules/components'

export const EditDetails = () => {
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

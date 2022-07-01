import Options from '../modules/components/configurationView/options'
import NavbarComponent from '../modules/components/navbar/navbarComponent'
import CarPhotoSlider from '../modules/components/configurationView/carPhotoSlider'
import ConfigurationDetails from '../modules/components/configurationView/configurationDetails'
import { useEffect } from 'react'
import { summaryAtom } from '../modules/storage/editAtoms'
import { useSetRecoilState } from 'recoil'

const ConfigurationView = () => {
	const setSummary = useSetRecoilState(summaryAtom)

	useEffect(() => {
		setSummary(false)
	}, [setSummary])
	return (
		<div className="configurationView">
			<NavbarComponent />
			<Options />
			<CarPhotoSlider />
			<ConfigurationDetails />
		</div>
	)
}

export default ConfigurationView

import { CarPhotoSlider, ConfigurationDetails, NavbarComponent, Options } from 'modules/components'
import { useEffect } from 'react'
import { summaryAtom } from 'modules/storage'
import { useSetRecoilState } from 'recoil'

export const ConfigurationView = () => {
	const setSummary = useSetRecoilState(summaryAtom)

	useEffect(() => {
		setSummary(false)
	}, [setSummary])
	return (
		<div className="configurationView bg-col-light-gray">
			<NavbarComponent />
			<Options />
			<CarPhotoSlider />
			<ConfigurationDetails />
		</div>
	)
}

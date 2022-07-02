import { EditDetails, Options, NavbarComponent } from 'modules/components'

export const ConfigurationEdit = () => {
	return (
		<div className="configurationEdit">
			<NavbarComponent />
			<Options />
			<EditDetails />
		</div>
	)
}

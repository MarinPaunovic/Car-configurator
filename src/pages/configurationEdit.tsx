import { EditDetails, Options, NavbarComponent } from 'modules/components'

export const ConfigurationEdit = () => {
	return (
		<div className="configurationEdit bg-col-light-gray">
			<NavbarComponent />
			<Options />
			<EditDetails />
		</div>
	)
}

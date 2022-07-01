import EditDetails from '../modules/components/configurationEdit/editDetails'
import Options from '../modules/components/configurationView/options'
import NavbarComponent from '../modules/components/navbar/navbarComponent'

const ConfigurationEdit = () => {
	return (
		<div className="configurationEdit">
			<NavbarComponent />
			<Options />
			<EditDetails />
		</div>
	)
}

export default ConfigurationEdit

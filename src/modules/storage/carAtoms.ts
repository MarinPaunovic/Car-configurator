import { atom, selector } from 'recoil'
import { persistAtom } from './userAtoms'

export interface CarConfig {
	carModel: string
	interior: { seats: string; dash: string }
	exterior: { wheels: string; color: string }
}
export interface ICar {
	carModel: string
	wheels: Array<string>
	seats: Array<string>
	dash: Array<string>
	color: Array<string>
	productionYear: number
	createdAt?: Array<string>
}
export interface SavedConfigFetch extends ICar {
	createdAt: Array<string>
	id: string
}
//all cars
export const carsAtom = atom({
	key: 'cars',
	default: {} as ICar,
	effects_UNSTABLE: [persistAtom]
})

export const selectedCarAtom = atom({
	key: 'selectedCar',
	default: {},
	effects_UNSTABLE: [persistAtom]
})
//slider for options menu
export const configuratorAtom = atom({
	key: 'currentConfigurator',
	default: 1,
	effects_UNSTABLE: [persistAtom]
})
//default config for each chosen car
export const carDefaultConfiguratorSelector = selector({
	key: 'defaultCarConfigurator',

	get: ({ get }) => {
		const { carModel } = get(selectedCarAtom)
		switch (carModel) {
			case 'Audi RS6':
				return {
					carModel: 'Audi RS6',
					exterior: { color: 'ultra-blue', wheels: 'one' },
					interior: { seats: 'brown', dash: 'brown' }
				}
			case 'Audi e-Tron GT':
				return {
					carModel: 'Audi e-Tron GT',
					exterior: { color: 'tactical-green', wheels: 'one' },
					interior: { seats: 'black', dash: 'black' }
				}
			case 'Audi RS5':
				return {
					carModel: 'Audi RS5',
					exterior: { color: 'nardo-gray', wheels: 'one' },
					interior: { seats: 'black-gray', dash: 'lunar-silver' }
				}
			default:
				return undefined
		}
	}
})
//change config based on default config(for new config)
export const carCustomConfiguratorAtom = atom({
	key: 'customCarConfigurator',
	default: carDefaultConfiguratorSelector,
	effects_UNSTABLE: [persistAtom]
})

export const savedConfigAtom = atom({
	key: 'savedConfiguration',
	default: {} as ICar,
	effects_UNSTABLE: [persistAtom]
})

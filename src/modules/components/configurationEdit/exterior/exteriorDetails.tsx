import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
	optionsCurrentConfigAtom,
	previewCurrentPageAtom,
	getTitleAtom,
	localEditAtom,
	localEditSelector,
	carCustomConfiguratorAtom,
	configuratorAtom,
	selectedCarAtom
} from 'modules/storage'
import { EditChoiceComponent, EditChoiceSecondComponent, Pagination } from 'modules/components'

export const ExteriorDetails = () => {
	const carConfig = useRecoilValue(carCustomConfiguratorAtom)
	const { carModel } = useRecoilValue(selectedCarAtom)
	const currentPage = useRecoilValue(previewCurrentPageAtom)
	const currentConfigPage = useRecoilValue(configuratorAtom)
	const currentConfigChoice = useRecoilValue(optionsCurrentConfigAtom)
	const setChoiceTitle = useSetRecoilState(getTitleAtom)
	const localEdit = useRecoilValue(localEditAtom)
	const editSelector = useRecoilValue(localEditSelector)

	useEffect(() => {
		const getTitle = () => {
			switch (currentConfigChoice) {
				case 'color':
					setChoiceTitle('Paint color')
					return
				case 'wheels':
					setChoiceTitle('Wheels')
					return
				case 'dash':
					setChoiceTitle('Dash color')
					return
				case 'seats':
					setChoiceTitle('Seats color')
					return
				default:
					return
			}
		}
		if (currentConfigChoice) {
			getTitle()
		}
	}, [currentConfigChoice, setChoiceTitle])

	return (
		<>
			{currentConfigPage && currentConfigPage === 1 && carConfig && (
				<>
					<div className="editDetails__wrapper">
						{localEdit.edit && localEdit.edit.length !== 0 ? (
							localEdit.edit === 'color' ? (
								<>
									{editSelector && (
										<img
											alt="car"
											className="editDetails__img"
											src={require(`images/${carModel}/exterior/${editSelector.value}/${carConfig.exterior.wheels}/${currentPage}.png`)}
										/>
									)}
								</>
							) : (
								<>
									{editSelector && (
										<img
											alt="car"
											className="editDetails__img"
											src={require(`images/${carModel}/exterior/${carConfig.exterior.color}/${editSelector.value}/${currentPage}.png`)}
										/>
									)}
								</>
							)
						) : (
							<img
								alt="car"
								className="editDetails__img"
								src={require(`images/${carModel}/exterior/${carConfig.exterior.color}/${carConfig.exterior.wheels}/${currentPage}.png`)}
							/>
						)}
						<Pagination pagesNumber={5} />
					</div>
					{currentConfigChoice ? <EditChoiceSecondComponent /> : <EditChoiceComponent />}
				</>
			)}
		</>
	)
}

import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
	CarConfig,
	carCustomConfiguratorAtom,
	selectedCarAtom,
	savedConfigEditAtom,
	summaryAtom,
	previewCurrentPageAtom
} from 'modules/storage'
import { Pagination } from 'modules/components'

export const CarPhotoSlider = () => {
	const { carModel, color, wheels } = useRecoilValue(selectedCarAtom)
	const savedConfigEdit = useRecoilValue(savedConfigEditAtom)
	const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom)
	const summary = useRecoilValue(summaryAtom)
	const carCustomConfig = useRecoilValue<CarConfig>(carCustomConfiguratorAtom)
	let pages: number = 5
	useEffect(() => {
		return () => {
			setCurrentPage(1)
		}
	}, [setCurrentPage])
	return (
		<>
			{color && (
				<>
					{summary || savedConfigEdit ? (
						<img
							alt="car"
							className="configurationView__img"
							src={require(`images/${carCustomConfig.carModel}/exterior/${carCustomConfig.exterior.color}/${carCustomConfig.exterior.wheels}/${currentPage}.png`)}
							style={{ blockSize: '300px' }}
						/>
					) : (
						<img
							alt="car"
							className="configurationView__img"
							src={require(`images/${carModel}/exterior/${color[0]}/${wheels[0]}/${currentPage}.png`)}
							style={{ blockSize: '300px' }}
						/>
					)}
					<Pagination pagesNumber={pages} />
				</>
			)}
		</>
	)
}

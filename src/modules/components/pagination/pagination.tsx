import { useRecoilState } from 'recoil'
import { previewCurrentPageAtom } from 'modules/storage'

interface Pages {
	pagesNumber: number
}

export const Pagination = (props: Pages) => {
	const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom)
	const { pagesNumber } = props

	return (
		<div className="pagination f-jc-aic">
			<button
				className="pagination__button col-dark-gray bg-col-light-gray fs-30 material-symbols-outlined"
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				keyboard_arrow_left
			</button>
			<div className="pagination__currentPage col-dark-gray fs-20">{currentPage}</div>
			<div className="pagination__separator col-c7c7d1 fs-20">/</div>
			<div className="pagination__pagesNumber col-c7c7d1 fs-20">{pagesNumber}</div>
			<button
				className="pagination__button col-dark-gray bg-col-light-gray fs-30 material-symbols-outlined"
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage === pagesNumber}
			>
				keyboard_arrow_right
			</button>
		</div>
	)
}

import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { previewCurrentPageAtom } from "../../storage/pageAtoms";

type Pages = {
  pagesNumber: number;
};

const Pagination = (props: Pages) => {
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const { pagesNumber } = props;

  return (
    <div className="pagination">
      <button
        className="pagination__button material-symbols-outlined"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        keyboard_arrow_left
      </button>
      <div className="pagination__currentPage">{currentPage}</div>
      <div className="pagination__separator">/</div>
      <div className="pagination__pagesNumber">{pagesNumber}</div>
      <button
        className="pagination__button material-symbols-outlined"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === 5}
      >
        keyboard_arrow_right
      </button>
    </div>
  );
};

export default Pagination;

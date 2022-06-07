import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { previewCurrentPageAtom } from "../../storage/carAtoms";

type Pages = {
  pagesNumber: number;
};

const Pagination = (props: Pages) => {
  const [currentPage, setCurrentPage] = useRecoilState(previewCurrentPageAtom);
  const { pagesNumber } = props;

  return (
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        -
      </button>
      {currentPage}/{pagesNumber}
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === 5}>
        +
      </button>
    </div>
  );
};

export default Pagination;

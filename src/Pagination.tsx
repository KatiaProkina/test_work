import React from "react";

const Pagination = ({ page, handlePageChange, totalItems, perPage }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="btn-arrow"
      >
        <img src="../public/left-arrow.png" alt="" />
      </button>
      <span>
        {Array.from(
          { length: Math.ceil(totalItems / perPage) },
          (_, i) => i + 1
        )
          .filter(
            (pageNumber) =>
              pageNumber >= page - 2 &&
              pageNumber <= page + 2 &&
              pageNumber <= Math.ceil(totalItems / perPage)
          )
          .map((pageNumber, index, array) => (
            <>
              {index > 0 && pageNumber - array[index - 1] > 1 && (
                <span key={`ellipsis-${pageNumber - 1}`}>...</span>
              )}
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === page ? "active" : ""}
              >
                {pageNumber}
              </button>
            </>
          ))}
        {Math.ceil(totalItems / perPage) > 4 &&
          page + 2 < Math.ceil(totalItems / perPage) && (
            <>
              <span>........</span>
              <button
                onClick={() =>
                  handlePageChange(Math.ceil(totalItems / perPage))
                }
              >
                {Math.ceil(totalItems / perPage)}
              </button>
            </>
          )}
      </span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="btn-arrow"
      >
        <img src="../public/right-arrow.png" alt="" />
      </button>
    </div>
  );
};

export default Pagination;

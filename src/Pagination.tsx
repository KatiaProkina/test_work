const Pagination = ({ page, handlePageChange, totalItems, perPage }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const isValidPageNumber = (pageNumber) =>
    pageNumber >= page - 2 &&
    pageNumber <= page + 2 &&
    pageNumber <= Math.ceil(totalItems / perPage);

  const renderPaginationItem = (pageNumber, index, array) => {
    index > 0 && pageNumber - array[index - 1] > 1;
  };

  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(isValidPageNumber)
    .map((pageNumber, index, array) => (
      <>
        {renderPaginationItem(pageNumber, index, array) && (
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
    ));

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
        {paginationButtons}
        {totalPages > 4 && page + 2 < totalPages && (
          <>
            <span>........</span>
            <button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
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

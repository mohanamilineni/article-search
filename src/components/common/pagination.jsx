import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ nbPages, page, onPageChange }) => {
  if (nbPages === 1) return null;

  return (
    <div className="d-flex justify-content-between bd-highlight mb-3">
      <div className="p-2 bd-highlight">
        <input
          type="button"
          className="btn btn-outline-primary"
          value="Previous"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 && "disabled"}
        />
      </div>
      <div className="p-2 bd-highlight" style={{ marginTop: "5px" }}>
        Showing page <strong>{page}</strong> of <strong>{nbPages}</strong>
      </div>
      <div className="p-2 bd-highlight">
        <input
          type="button"
          className="btn btn-outline-primary"
          value="Next"
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  nbPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;

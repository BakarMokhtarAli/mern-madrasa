// components/Pagination.js
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"flex justify-center my-4"}
      pageClassName={"mx-1"}
      pageLinkClassName={
        "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-400"
      }
      previousClassName={
        "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
      }
      nextClassName={
        "px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
      }
      activeClassName={
        "bg-blue-500 rounded-lg py-2 border border-blue-300 text-white"
      }
    />
  );
};

export default Pagination;

// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10; // Tusaale ahaan, waxaad soo bandhigaysaa 10 user per page

  useEffect(() => {
    const fetchstudents = async () => {
      const res = await axios.get(
        `/api/v1/students?page=${
          currentPage + 1
        }&limit=${limit}&search=${searchTerm}`
      );
      setStudents(res.data.data);

      setPageCount(Math.ceil(res.data.total / limit));
    };
    fetchstudents();
  }, [currentPage, searchTerm]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset page to 0 when search term changes
  };

  return (
    <div className="max-w-4xl sm:mx-auto sm:ml-64 mt-5 px-4">
      <input
        type="text"
        placeholder="Search students"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
      />
      <Table>
        <TableCaption>Students List.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Full_Name</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.StdID}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.parent_name}</TableCell>
              <TableCell className="text-right">{user.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!searchTerm && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
};

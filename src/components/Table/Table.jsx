import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/api";
import "./Table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        setError(error.message);
        alert("failed to fetch data");
      }
    };
    getData();
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="table-container">
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Table;

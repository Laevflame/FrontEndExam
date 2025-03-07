"use client";
//This is important
import { useState, useEffect } from "react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5021/api/v1/get-available-ticket") 
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setTotalTickets(data.totalTickets);
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(totalTickets / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTickets = tickets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>

      {/* Items per page selection */}
      <label className="block mb-2">
        Show per page:{" "}
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1); // Reset to first page
          }}
          className="border rounded p-1"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      {/* Ticket List */}
      <ul className="space-y-2">
        {displayedTickets.map((ticket: any) => (
          <li key={ticket.ticketCode} className="border p-3 rounded shadow">
            <h2 className="text-lg font-semibold">{ticket.ticketName}</h2>
            <p>Category: {ticket.categoryName}</p>
            <p>Remaining: {ticket.ticketRemainingQuota}</p>
            <p>Price: {ticket.ticketPrice.toLocaleString()} IDR</p>
            <p>Event Date: {new Date(ticket.eventDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tickets;

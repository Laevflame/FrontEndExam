"use client";

import { useState } from "react";
import { editBookedTicket } from "@/app/actions/editBookedTickets";

export default function EditTicketPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ticketData, setTicketData] = useState<{
    ticketCode: string;
    ticketName: string;
    bookedTicketDetailsQuantity: number;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const bookedTicketId = formData.get("bookedTicketId") as string;
    const ticketCode = formData.get("ticketCode") as string;
    const bookedTicketDetailsQuantity = Number(
      formData.get("bookedTicketDetailsQuantity"),
    );

    setError("");
    setSuccess("");

    const result = await editBookedTicket(
      bookedTicketId,
      ticketCode,
      bookedTicketDetailsQuantity,
    );

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.success);
      setTicketData(result.data); // Store ticket data for display
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-md w-full mx-4 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Edit Booked Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booked Ticket ID:
            </label>
            <input
              type="text"
              name="bookedTicketId"
              placeholder="Enter booked ticket ID"
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Code:
            </label>
            <input
              type="text"
              name="ticketCode"
              placeholder="Enter ticket code"
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity:
            </label>
            <input
              type="number"
              name="bookedTicketDetailsQuantity"
              placeholder="Enter quantity"
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
          >
            Update Ticket
          </button>
        </form>

        {(error || success) && (
          <div
            className={`mt-6 p-4 rounded-lg text-center ${
              error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}
          >
            {error || success}
          </div>
        )}

        {ticketData && (
          <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
            <h3 className="text-xl font-bold text-gray-800">
              Updated Ticket Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Ticket Code:</strong> {ticketData.ticketCode}
              </p>
              <p>
                <strong>Ticket Name:</strong> {ticketData.ticketName}
              </p>
              <p>
                <strong>Quantity:</strong> {ticketData.bookedTicketDetailsQuantity}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
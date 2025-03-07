"use client";

import { useState } from "react";
import { bookTicket } from "../actions/bookTickets";

export default function BookTicketPage() {
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = event.currentTarget; // Store form reference before await
    const formData = new FormData(form);

    const result = await bookTicket(formData);

    if (result.error) {
      setMessage(result.error);
    } else if (result.success) {
      setMessage(result.success);
      form.reset(); // Clear form after success
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-md w-full mx-4 p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Book a Ticket
        </h2>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              message.includes("error")
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Code:
            </label>
            <input
              type="text"
              name="ticketCode"
              required
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter ticket code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity:
            </label>
            <input
              type="number"
              name="ticketQuantityToBook"
              min="1"
              required
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter quantity"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md"
          >
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  );
}